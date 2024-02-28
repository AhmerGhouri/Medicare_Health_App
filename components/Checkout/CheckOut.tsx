import { Alert, Button, FlatList, ScrollView, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Pressable, Linking, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { s } from 'react-native-wind'
import Modal from 'react-native-modal'
import Logo from '../../src/assets/MEDICARE.png'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import axios from 'axios'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { opatValuesType, postDatatype } from '../../constants'
import LottieView from 'lottie-react-native'

// interface CheckOutProps {
//     values: opatValuesType;
// }


const CheckOut = ({ handleClick }) => {
    // const CheckOut = (opatValues: CheckOutProps) => {

    const BILL_POST_API = 'https://local.jmc.edu.pk:82/api/WebReqServices/PostSelectServiceDataInBill'
    const MAX_TRANS_API = ' https://local.jmc.edu.pk:82/api/LabTest/GetMaxTransId'
    const PAYMENT_POST_API = 'https://local.sohailuniversity.edu.pk:90/Handlers/PaymnetAPICall.ashx'
    // variables
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['100%'], []);
    const [totalAmount, setTotalAmount] = useState<number>()
    const [isLoading, setIsLoading] = useState<boolean>()
    const [isModalVisible, setModalVisible] = useState(false);
    const [loader, setLoader] = useState<boolean>(true)
    const { cartItem } = useAppSelector(state => state.cart);
    const { ...patient } = useAppSelector(state => state.patient);
    const { ...user } = useAppSelector(state => state.user);
    const [delLoading, setDelLoading] = useState(false)

    console.log("cart ITEM", cartItem);

    const amount = cartItem.map((item) => {
        let billAmount = +item.amt!
        return billAmount
    })

    function addArrayValues(arr: number[]): number {
        let totalAmount = 0;
        for (const num of arr) {
            totalAmount += num;
        }
        return totalAmount;
    }

    useEffect(() => {

        const totalAmount = addArrayValues(amount)
        setTotalAmount(totalAmount);
        setTimeout(() => {

            setLoader(false)

        }, 5000)

    }, [amount])

    async function GetMaxTransId() {

        try {

            const trans_response = await axios.get(MAX_TRANS_API)

            if (trans_response.status === 200) {

                const result = trans_response.data
                const transId = result[0].ltesT_ID
                const transIdToNum = +transId

                // setTransId(transIdToNum + 1)

                return transIdToNum

            } else {

                Alert.alert("Network Error", "Check Your Internet Connection")

            }

        } catch (error) {

            switch (error.response.status) {
                case 400:
                    // handle 400 Bad Request case
                    Alert.alert('Bad Request', 'Something went wrong with the request.');
                    break;
                case 401:
                    // handle 401 Unauthorized case
                    Alert.alert('Unauthorized', 'Access is denied due to invalid credentials.');
                    break;
                case 404:
                    // handle 404 Not Found case
                    Alert.alert('Not Found', 'The requested resource could not be found.');
                    break;
                case 500:
                    // handle 500 Internal Server Error case
                    Alert.alert('Internal Server Error', 'Something went wrong on the server.');
                    break;
                default:
                    // handle any other error cases
                    Alert.alert('Error', 'Something went wrong.');
                    break;
            }
        }
    }

    const billPosting = async (updatedObject) => {
        try {
            const response = await axios.post(BILL_POST_API, updatedObject)
            if (response.status === 200) {
                console.log("Bill Posted Successfully");
                // navigation.navigate("HomeScreen")
            } else {
                Alert.alert("Error", "Bill has not been generated, Something went wrong!")
            }
            return response
        } catch (error) {
            switch (error.response.status) {
                case 400:
                    // handle 400 Bad Request case
                    Alert.alert('Bad Request', 'Something went wrong with the request.');
                    break;
                case 401:
                    // handle 401 Unauthorized case
                    Alert.alert('Unauthorized', 'Access is denied due to invalid credentials.');
                    break;
                case 404:
                    // handle 404 Not Found case
                    Alert.alert('Not Found', 'The requested resource could not be found.');
                    break;
                case 500:
                    // handle 500 Internal Server Error case
                    Alert.alert('Internal Server Error', 'Something went wrong on the server.');
                    break;
                default:
                    // handle any other error cases
                    Alert.alert('Error', 'Something went wrong.');
                    break;
            }
        }
    }

    const toggleModal = async () => {
        setIsLoading(true)
        setTimeout(async () => {
            setModalVisible(true)
            setIsLoading(false)
        }, 2000)
    };

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        bottomSheetRef.current?.expand()
    }, [])

    const closeInvoiceModal = () => {
        setModalVisible(!isModalVisible)
    }

    const handleSubmit = async () => {


        axios.post((PAYMENT_POST_API), {

            "app_id": "0000",
            "Query": "select m.vc_mst_tran_id,w.entryid as app_id,w.patientlname as name,w.email,'0'||w.contactno as mobile,m.voucherid,d.VC_DTL_DTL_VOUCHER_AMT as adm_fees,TO_CHAR(SYSDATE,'YYYY-MON-DD') as coursevalid,c.api_app_id,c.api_app_key  from CONSL_APP_T_WEB w inner join stdc_jmdc_vc_mst_t m on m.vc_mst_rollno = w.entryid and m.vc_mst_catg_id = 'Consultation Fee'  inner join stdc_jmdc_vc_dtl_t d on d.voucherid = m.voucherid left join aass.GL_COMBINE_COMPANY c on c.mastercode = 'MED' where m.voucherid =  0000003424 order by 1 desc ",
            "FeeTYPECode": "CONSULTATIONFEE",
            "FeeDesc": "CONSULTATIONFEE",
            "AfterPaymentURL": "http://localhost:53744/frmOnlinePaymentStatusMCGH.aspx",
            "Email": "YES",
            "SMS": "YES",
            "SMSReqType": "MyMedicareHealth",
            "SMSMask": "MEDICARE"



        }).then((res) => {

            const Status = res.status
            const data = res.data
            const paymentURL = data.redirect_url

            if (Status === 200) {


                Linking.openURL(paymentURL)

            } else {

                Alert.alert("Connection Error", "Somthing went wrong, Check Your Internet Connection!")

            }


        }).catch((err) => {


            Alert.alert("Error", err);



        })
    }

    const handleModal = async (value) => {

        setIsLoading(true)
        const trans = await GetMaxTransId()
        const transID = trans! + 1
        const updatedObject = [...cartItem].map((item) => {
            // Create a new object with updated `tranS_ID`
            return {
                ...item,
                tranS_ID: transID.toString()
            };
        });

        if (value == 'COD') {

            const billing = await billPosting(updatedObject)

            if (billing?.status === 200) {

                setIsLoading(false)
                handleClick(true)
                setModalVisible(false)

            } else {

                setIsLoading(false)
                Alert.alert('Error', 'Something went wrong while processing your order')

            }

        }else{
            
            const billing = await billPosting(updatedObject)

            if (billing?.status === 200) {

                handleSubmit()
                setIsLoading(false)
                handleClick(true)
                setModalVisible(false)

            } else {

                setIsLoading(false)
                Alert.alert('Error', 'Something went wrong while processing your order')

            }


        }
    }

    // const handleCashOnDelivery = () => {

    //     setModalVisible(false)
    //     setDelLoading(true)
    //     setTimeout(() => {

    //         setDelLoading(false)
    //     }, 6000)


    // }


    // const opatValues = {
    //     opaT_ID: checkedData.opaT_ID!.toString(),
    //     tranS_ID: transId?.toString(),
    //     currentaddress: "KARACHI",
    //     samplE_COL_DATE: formattedDate,
    //     samplE_COL_TIME: formattedDate,
    //   };

    //   const postData: postDatatype[] = selectedTests.map((tests) => ({

    //     amt: tests.amt,
    //     currentaddress: opatValues.currentaddress,
    //     ltesT_DESC: tests.ltesT_DESC,
    //     ltesT_ID: tests.ltesT_ID,
    //     opaT_ID: opatValues.opaT_ID,
    //     samplE_COL_DATE: opatValues.samplE_COL_DATE,
    //     samplE_COL_TIME: opatValues.samplE_COL_TIME,
    //     tesT_DESCRIPTION: tests.ltesT_DESC,
    //     tranS_ID: opatValues.tranS_ID,

    //   }))

    // useEffect(() => {


    //   const updatedPostData = selectedTests.map((tests) => ({
    //     amt: tests.amt,
    //     currentaddress: opatValues.currentaddress,
    //     ltesT_DESC: tests.ltesT_DESC,
    //     ltesT_ID: tests.ltesT_ID,
    //     opaT_ID: opatValues.opaT_ID,
    //     samplE_COL_DATE: opatValues.samplE_COL_DATE,
    //     samplE_COL_TIME: opatValues.samplE_COL_TIME,
    //     tesT_DESCRIPTION: tests.ltesT_DESC,
    //     tranS_ID: opatValues.tranS_ID,

    //   }))

    //   setPostData(updatedPostData)


    // }, [selectedTests])

    return (
        <>
            <BottomSheet
                ref={bottomSheetRef}
                // topInset={50}
                detached={true}
                animateOnMount={true}
                bottomInset={2}
                handleStyle={{ display: 'none' }}
                style={[s`z-999 flex-1 grow-0`]}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose={false}
                backgroundStyle={{
                    backgroundColor: 'white',
                    marginHorizontal: 16,
                    marginVertical: 12,
                    shadowRadius: 85,
                    borderRadius: 10,
                    shadowOffset: {
                        width: 4, height: 6
                    },
                    elevation: 8,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >


                <View style={s`m-8 justify-center `}>

                    <View style={s`flex-row mt-2 mb-2 justify-between items-center gap-x-3`}>

                        {loader ? (

                            <SkeletonPlaceholder borderRadius={4}>
                                <SkeletonPlaceholder.Item flexDirection="row" justifyContent='space-around'
                                    gap={50} alignItems="center">
                                    <SkeletonPlaceholder.Item width={'70%'} height={30} />
                                    <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>


                        ) : <>
                            <Text style={s`font-bold text-lg text-black italic`}>
                                Home Collection Charges
                            </Text>

                            <Text style={s`font-bold text-lg text-red-600 italic`}>
                                Rs. {totalAmount?.toFixed(2)}
                            </Text>
                        </>
                        }

                    </View>

                    <View style={s`flex-row mt-2 mb-2 justify-between items-center gap-x-3`}>

                        {loader ? (

                            <SkeletonPlaceholder borderRadius={4}>
                                <SkeletonPlaceholder.Item flexDirection="row" justifyContent='space-around'
                                    gap={50} alignItems="center">
                                    <SkeletonPlaceholder.Item width={'70%'} height={30} />
                                    <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>


                        ) : <>
                            <Text style={s`font-bold text-lg text-black italic`}>
                                Total Amount
                            </Text>

                            <Text style={s`font-bold text-lg text-red-600 italic`}>
                                Rs. {totalAmount?.toFixed(2)}
                            </Text>
                        </>
                        }




                    </View>
                </View>


                <View style={[s`flex absolute bottom-6 left-16 border-black-500 `, { width: '70%' }]}>



                    <TouchableOpacity onPress={toggleModal}
                        style={s`  p-4 items-center rounded-full bg-blue-600`}>

                        <View>
                            {isLoading ?
                                (
                                    <ActivityIndicator style={s`p-0`} size="small" color="#fff" />
                                )
                                :
                                <Text style={s` text-white text-medium italic font-semibold`}>

                                    Checkout

                                </Text>

                            }

                        </View>


                    </TouchableOpacity>

                </View>

                {/* </>
                } */}




            </BottomSheet>


            {/* Invoice MODAL */}
            <Modal
                isVisible={isModalVisible}
                animationInTiming={300}
                animationIn={'zoomIn'}
                animationOut={'zoomOut'}
                coverScreen={true}

            >


                <View
                    style={{ height: '100%', backgroundColor: 'white', borderTopWidth: 8, borderTopColor: 'blue' }}
                >

                    <View style={[s`flex shrink-0 w-full items-center`, styles.lottieContainer]}>

                        <LottieView
                            style={[styles.lottie]}
                            source={require('../../src/animations/Bill.json')}
                            autoPlay

                        />

                    </View>

                    <View style={s`flex-row justify-between items-center px-8 -pt-12 pb-12`}>

                        <View style={s`items-center`}><Text style={s`font-bold text-lg italic text-blue-800`}>Invoice</Text></View>
                        <View>
                            <Image source={Logo} style={{ width: 100, height: 50 }} width={100} height={100} />
                        </View>

                    </View>

                    <View style={s`px-8 pt-0 pb-4`}>

                        <View style={[s`flex-row py-1 justify-between`, { width: "100%" }]}>
                            <Text style={s`text-black font-bold`}>Name    : </Text>
                            <Text style={s`text-black`}>{user.pname}</Text>
                        </View>
                        <View style={[s`flex-row py-1 justify-between`, { width: "100%" }]}>
                            <Text style={s`text-black font-bold`}>Phone #: </Text>
                            <Text style={s`text-black`}>{user.mob}</Text>
                        </View>
                        <View style={[s`flex-row py-1 justify-between`, { width: "100%" }]}>
                            <Text style={s`text-black font-bold`}>Email     : </Text>
                            <Text style={s`text-black`}>{user.email}</Text>
                        </View>

                    </View>

                    <View style={s`flex-row justify-between px-6 py-2 bg-blue-700`}>

                        <View>
                            <Text style={s`text-white`}>Opat ID</Text>
                        </View>
                        <Text style={s`text-white`}>Service</Text>
                        <Text style={s`text-white`}>Price</Text>

                    </View>

                    <FlatList
                        numColumns={1}
                        data={cartItem}
                        scrollEnabled={true}
                        removeClippedSubviews={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.ltesT_ID!}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={{ borderWidth: 1, borderColor: 'lightgray' }}></View>
                            )
                        }}
                        renderItem={({ item }) => (

                            <ScrollView scrollEnabled={true} >

                                <View style={s`flex-row justify-between px-4 py-6`}>

                                    <Text style={s`text-black`}>{item.opaT_ID}</Text>
                                    <Text style={s`text-blue-900 font-bold `}>{item.ltesT_DESC?.slice(0, 35)}{item.ltesT_DESC?.length && item.ltesT_DESC?.length > 24 ? <Text>...</Text> : null}</Text>
                                    <Text style={s`text-red-900 font-bold `}>{item.amt}</Text>

                                </View>

                            </ScrollView>
                        )}
                    />

                    <View style={s`flex-row justify-between px-6 py-2 bg-blue-700`}>

                        <Text style={s`text-white`}>Total Amount</Text>
                        <Text style={s`text-white`}>Rs. {totalAmount}</Text>

                    </View>
                    <View style={s`flex-row p-4 w-full justify-between`}>

                        <View>

                            <Button title="Close" color={'red'} onPress={closeInvoiceModal} />

                        </View>

                        <View>

                            {isLoading ? <ActivityIndicator style={s`p-0 items-center justify-center`} size="small" color="black" />

                                :

                                <Button
                                    onPress={() => handleModal('COD')} title='CASH ON DELIVERY' />

                            }


                        </View>

                        <View>

                            <Button onPress={() => handleModal('PO')} title='PAY ONLINE' />

                        </View>

                    </View>

                </View>

            </Modal>

        </>
    )
}

export default CheckOut

const styles = StyleSheet.create({

    lottieContainer: {

        zIndex: 0,

    },
    lottie: {

        width: 200,
        height: 150,
        // width: Dimensions.get('window').height <= 592 ? 300 : 400 && Dimensions.get('screen').width >= 800 && Dimensions.get('screen').width <= 1080 ? 700 : 400 && Dimensions.get('screen').width >= 1080 ? 400 : 400,
        // height: Dimensions.get('window').height <= 592 ? 300 : 400 && Dimensions.get('screen').width >= 800 && Dimensions.get('screen').width <= 1080 ? 700 : 400 && Dimensions.get('screen').width >= 1080 ? 400 : 400,

    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 999,
    },

})
