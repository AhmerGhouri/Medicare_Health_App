import { Labtests, timeSlotData } from '../DummyData/LabTests';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, FlatList, Pressable, BackHandler, Image, Linking, Alert, AppState, EmitterSubscription, NativeEventSubscription } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { s } from 'react-native-wind'
import { TextInput } from 'react-native'
// import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import Modal from 'react-native-modal'
import { selectedTest } from '../constants';
import { testData, timeSlots } from '../constants';
import Logo from '../src/assets/MEDICARE.png'
// import filter  from 'lodash.filter'
// import includes from 'lodash.includes';
import _ from 'lodash'
import LottieView from 'lottie-react-native';






const LabScreen = ({ navigation, route }) => {


  const { checkedData } = route.params


  console.log("Lab Screen Checked Data", checkedData);



  // All State Which Manages

  const [date, setDate] = useState(new Date());
  const date_to_string = date.toDateString()
  const [testsData, setTestData] = useState<any>([])
  const [filterData, setFilterData] = useState(testsData);
  const [open, setOpen] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [value, setValue] = useState(null);
  const [isButtonVisible, setButtonVisible] = useState(false)
  const [paymentAmount, setPaymentamount] = useState()
  const [totalAmount, setTotalAmount] = useState(0)
  const [selectedTests, setSelectedTests] = useState<selectedTest[]>([])
  const [timeSlot, setTimeSlot] = useState<timeSlots[]>(timeSlotData);
  const [testID, setTestId] = useState<testData>()
  const [externalLinkOpened , setExternalLinkOpened] = useState(false)
  const appStateSubscriptionRef = useRef<NativeEventSubscription | null>(null);
  const [appClosed , setAppClosed] = useState(false)
  const [isLoading , setIsLoading] = useState(false)
  const [transId , setTransId] = useState<number>()
  const [errorMsg , setErrorMsg] = useState<boolean>(false)
  let formattedDate = date.getDate() + '-' + date.toLocaleString("en-US", { month: 'short' }) + '-' + date.getFullYear();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // Modal States
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false)
  const BILL_POST_API = 'https://local.jmc.edu.pk:82/api/LabTest/PostLabTestsInBill'
  const MAX_TRANS_API = ' https://local.jmc.edu.pk:82/api/LabTest/GetMaxTransId'
  // const PAYMENT_POST_API = 'https://local.jmc.edu.pk:90/Handlers/PaymnetAPICall.ashx'
  const PAYMENT_POST_API = 'https://local.sohailuniversity.edu.pk:90/Handlers/PaymnetAPICall.ashx'
  
  const opatValues = {
    opaT_ID: checkedData.opaT_ID.toString(),
    tranS_ID: transId?.toString(),
    currentaddress: "KARACHI",
    samplE_COL_DATE: formattedDate,
    samplE_COL_TIME: formattedDate,
  };


  const postData = selectedTests.map((tests) => ({

    ltesT_ID : tests.ltesT_ID,
    ltesT_DESC : tests.ltesT_DESC,
    tesT_DESCRIPTION : tests.ltesT_DESC,
    amt : tests.amt,
    ...opatValues

  }))
  
  // const postData = {

  //   ltesT_ID : selectedTests[0].ltesT_ID,
  //   ltesT_DESC : selectedTests[0].ltesT_DESC,
  //   tesT_DESCRIPTION : selectedTests[0].ltesT_DESC,
  //   amt : selectedTests[0].amt,
  //   ...opatValues

  // }


  console.log("Post Data" ,  postData);
  console.log("transId" ,  transId);
  console.log("Type Of transId" , typeof transId);
  console.log("timeslot" ,  value);
  console.log("date" ,  formattedDate);
  console.log("errr" ,  errorMsg);
  



  // Fetch Data from API
  const fetchData = async () => {

    const API = 'https://local.jmc.edu.pk:82/api/LabTest/GetAllLabTests'

    const result = await axios.get(API)

    const data = await result.data
    //  const data = await Labtests

    // console.log("data", data);

    setTestData(data)
    setFilterData(data)

  }

  const GetMaxTransId = async () => {

    try {

      const trans_response = await axios.get(MAX_TRANS_API)

      if (trans_response.status === 200) {
        
        const result = trans_response.data
  
        const transId = result[0].ltesT_ID

        const transIdToNum = +transId
  
        setTransId(transIdToNum + 1)


      }else{

        Alert.alert("Network Error" , "Check Your Internet Connection")

      }



      
    } catch (error) {
      
      switch (error.response.status) {
        case 400:
            // handle 400 Bad Request case
            console.log('Bad Request', error.response.data);
            Alert.alert('Bad Request', 'Something went wrong with the request.');
            break;
        case 401:
            // handle 401 Unauthorized case
            console.log('Unauthorized', error.response.data);
            Alert.alert('Unauthorized', 'Access is denied due to invalid credentials.');
            break;
        case 404:
            // handle 404 Not Found case
            console.log('Not Found', error.response.data);
            Alert.alert('Not Found', 'The requested resource could not be found.');
            break;
        case 500:
            // handle 500 Internal Server Error case
            console.log('Internal Server Error', error.response.data);
            Alert.alert('Internal Server Error', 'Something went wrong on the server.');
            break;
        default:
            // handle any other error cases
            console.log('Error', error.response.data);
            Alert.alert('Error', 'Something went wrong.');
            break;
      }

      console.log("data", error.response.data);

      console.log("status", error.response.status);


    }

  }

  const billPosting = async () => {
    

    try {

     
      
      const response = await axios.post(BILL_POST_API , postData)

      if (response.status === 200) {
          
          setIsLoading(true)
          
          setTimeout(() => {
            setIsLoading(false)
            setModalVisible(true);
          }, 3000)
          
        
      }else{
        
        Alert.alert("Error" , "Bill has not been generated, Something went wrong!")

      }
      
    } catch (error) {


      switch (error.response.status) {
        case 400:
            // handle 400 Bad Request case
            console.log('Bad Request', error.response.data);
            Alert.alert('Bad Request', 'Something went wrong with the request.');
            break;
        case 401:
            // handle 401 Unauthorized case
            console.log('Unauthorized', error.response.data);
            Alert.alert('Unauthorized', 'Access is denied due to invalid credentials.');
            break;
        case 404:
            // handle 404 Not Found case
            console.log('Not Found', error.response.data);
            Alert.alert('Not Found', 'The requested resource could not be found.');
            break;
        case 500:
            // handle 500 Internal Server Error case
            console.log('Internal Server Error', error.response.data);
            Alert.alert('Internal Server Error', 'Something went wrong on the server.');
            break;
        default:
            // handle any other error cases
            console.log('Error', error.response.data);
            Alert.alert('Error', 'Something went wrong.');
            break;
      }

      console.log("data", error.response.data);

      console.log("status", error.response.status);

      
      
    }




  }


  const closeBottom = () => {
   bottomSheetRef.current?.forceClose() 
  }



  // useEffect(() => {

  //   if (value === null) {

  //     setErrorMsg(true)
      
  //   }

  // } , [billPosting ])


  useEffect(() => {

    closeBottom()
    fetchData()
    GetMaxTransId()

  }, [])


  const toggleModal = () => {
    if (value === null) {
        
      setErrorMsg(true)

    }else{

    
    billPosting()
    
    }
  };

  // variables
  
  
  const snapPoints = useMemo(() => ['1%', '25%', '50%'], []);


  // callbacks
  const handleSheetChanges = useCallback((index: number) => {

    console.log('handleSheetChanges', index);

  }, []);


  // BackDrop
  const renderBackdrop = useCallback(

    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={1} appearsOnIndex={2} />
    , []
  )




  const handleFilter = (searchText: string) => {
    const filteredData = testsData.filter(({ ltesT_DESC }) =>
      ltesT_DESC.toUpperCase().includes(searchText.toUpperCase())
    );
  
    setTestData(filteredData);
  };




  //  function handleFilter(searchparams: string) {


  //   // setTestData(
  //   //   testsData.filter(({ ltesT_ID, ltesT_DESC, tesT_DESCRIPTION }) => {
  //   //     if (searchparams === '') {
  //   //       return true; // include all elements when searchparams is empty
  //   //     } else {
  //   //       return ltesT_DESC.toUpperCase().includes(searchparams.toUpperCase());
  //   //     }
  //   //   })
  //   // );


  //   // if (searchparams.trim() === "") {
  //   //   setTestData(testsData);
  //   // } else {
  //   //   setTestData(
  //   //     testsData.filter(({ ltesT_ID, ltesT_DESC, tesT_DESCRIPTION }) =>
  //   //       ltesT_DESC.toUpperCase().includes(searchparams.toUpperCase())
  //   //     )
  //   //   );
  //   // }
  //   console.log('searchparams:', searchparams);

  //   setTestData((prevTestsData) => {
  //     console.log('prevTestsData:', prevTestsData);
  //     const filteredData = prevTestsData.filter(({ ltesT_ID, ltesT_DESC, tesT_DESCRIPTION }) =>
  //       ltesT_DESC.toUpperCase().includes(searchparams.toUpperCase())
  //     );
  
  //     console.log('filteredData:', filteredData);; // Log the filtered data
  
  //     return filteredData; // Update the state with the filtered data
  //   });



  //     // setTestData(
  //     //   testsData.filter(({ ltesT_ID, ltesT_DESC, tesT_DESCRIPTION }) =>  ltesT_DESC.toUpperCase().includes(searchparams.toUpperCase()))
  //     //   )
        
      
        
  // }

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);




  const handleCheck = (test) => {

    const index = selectedTests.findIndex(

      (item) => item.ltesT_ID === test.ltesT_ID

    );

    if (index === -1) {

      setSelectedTests((prev) => [...prev, test]);

    } else {

      setSelectedTests((prev) =>

        prev.filter((item) => item.ltesT_ID !== test.ltesT_ID))

    }

  };

  // const supportedURL = 'https://google.com'
  const supportedURL = ' http://payabhi.connectdotnet.com/interapi/confirmpayment?Token=46nPwF59gAC8CQlMiM%2fuW9f6HlSyntrngkZ3ipvJpVw%3d';
  // const supportedURL = 'https://google.com';

  // let amount
  type OpenURLButtonProps = {
    url: string;
    children: string;
  };

  const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      // const supported = await Linking.canOpenURL(url);

      // console.log("Supported" , supported);


      // if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
      setAppClosed(false);
      //   } else {
      //     Alert.alert(`Don't know how to open this URL: ${url}`);
      //   }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
  };

  const handleSubmit = () => {

    // setModalVisible(false)

    // Linking.openURL('https://www.google.com')

    // axios.post((PAYMENT_POST_API) ,{

    //   "app_id": "2278",
    //  "Query":" select m.vc_mst_tran_id,w.entryid as app_id,w.patientlname as name,w.email,'0'||w.contactno as mobile,m.voucherid,d.VC_DTL_DTL_VOUCHER_AMT as adm_fees,TO_CHAR(SYSDATE,'YYYY-MON-DD') as coursevalid,c.api_app_id,c.api_app_key  "
    //  + "  from CONSL_APP_T_WEB w "
    //  + "  inner join stdc_jmdc_vc_mst_t m on m.vc_mst_rollno = w.entryid and m.vc_mst_catg_id = 'Consultation Fee'  "
    //  + "  inner join stdc_jmdc_vc_dtl_t d on d.voucherid = m.voucherid " 
    //  + "  left join aass.GL_COMBINE_COMPANY c on c.mastercode = 'MED' "
    //  + "  where m.voucherid =  0000003424 order by 1 desc ",

    //  "FeeTYPECode":"CONSULTATIONFEE",
    //  "FeeDesc":"CONSULTATIONFEE",
    //  "AfterPaymentURL":"http://localhost:53744/frmOnlinePaymentStatusMCGH.aspx",
    //   "Email":"YES",
    //   "SMS":"YES",
    //   "SMSReqType":"MyMedicareHealth",
    //   "SMSMask":"MEDICARE"
    axios.post((PAYMENT_POST_API) ,{

      "app_id": "2278",
     "Query":"select m.vc_mst_tran_id,w.entryid as app_id,w.patientlname as name,w.email,'0'||w.contactno as mobile,m.voucherid,d.VC_DTL_DTL_VOUCHER_AMT as adm_fees,TO_CHAR(SYSDATE,'YYYY-MON-DD') as coursevalid,c.api_app_id,c.api_app_key  from CONSL_APP_T_WEB w inner join stdc_jmdc_vc_mst_t m on m.vc_mst_rollno = w.entryid and m.vc_mst_catg_id = 'Consultation Fee'  inner join stdc_jmdc_vc_dtl_t d on d.voucherid = m.voucherid left join aass.GL_COMBINE_COMPANY c on c.mastercode = 'MED' where m.voucherid =  0000003424 order by 1 desc ",
     "FeeTYPECode":"CONSULTATIONFEE",
    "FeeDesc":"CONSULTATIONFEE",
     "AfterPaymentURL":"http://localhost:53744/frmOnlinePaymentStatusMCGH.aspx",
      "Email":"YES",
      "SMS":"YES",
      "SMSReqType":"MyMedicareHealth",
      "SMSMask":"MEDICARE"



    }).then((res) => {


      console.log("Successful API Call" , res);
      const Status = res.status
      const data = res.data
      const paymentURL = data.redirect_url 

      if (Status === 200) {


        Linking.openURL(paymentURL)

        console.log("URL" , paymentURL);
        



        
      }else{

        Alert.alert("Connection Error" , "Somthing went wrong, Check Your Internet Connection!")

      }



    }).catch((err) => {


      console.log("Error" , err);
      


    })

    // let sum = 0

    // selectedTests.map((tests) => {

    //   tests.amt += amount
    //   // sum += (tests || []).test_amount || 0

    // })

    // setTotalAmount(sum)
    // setPaymentamount(amount)
    // setPaymentModalVisible(true)

  }

  const OpenCloseDatePicker = () => {

    setOpen(!open)

  }



  console.log("select", selectedTests);


  // const LabScreenWrapper = ({ isLoading, children }) => {
  //   return (
  //     <View style={styles.container}>
  //       {isLoading ? (
  //         <View style={styles.loaderContainer}>
  //           <ActivityIndicator size="large" color="red" />
  //         </View>
  //       ) : (
  //         children
  //       )}
  //     </View>
  //   );
  // };
  // const LabScreenWrapper = ({ isLoading, children }) => {
  //   return (
  //     <View style={styles.wrapperContainer}>
  //     {children}
  //     {isLoading && (
  //       <View style={styles.loaderContainer}>
  //         <ActivityIndicator size="large" color="red" />
  //       </View>
  //     )}
  //   </View>
  //   );
  // };




  return (

    // <LabScreenWrapper isLoading={isLoading}>
    
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>

      {isLoading && (
        <View style={styles.overlay}>
          {/* <ActivityIndicator size="large" color="red" /> */}
          <LottieView
                style={[styles.lottie]}
                source={require('../src/animations/logoanimate.json')}
                autoPlay
                loop
              />
        </View>
      )}

        <View style={s`flex-1 bg-red-50 p-8`}>

          <View style={s`m-2`}>

            {/* <Text style={s`text-black font-bold pb-2`}>Date</Text>

            <TextInput

              style={styles.input}
              value={date_to_string}
              placeholder="Select Date"
              showSoftInputOnFocus={false}
              right={<TextInput.Icon onPress={() => setOpen(true)} icon={'calendar-range'} size={20} />}

            />

            <DatePicker
              open={open}
              modal
              textColor='red'
              date={date} mode='date'
              // minimumDate={new Date()}
              onDateChange={setDate}
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
              }}
              onCancel={() => setOpen(false)}
            /> */}

            <View style={[s`flex z-0 flex-row rounded-md justify-between border-2  border-blue-300 p-1 items-center`, styles.InputView]}>


              <View style={[s`flex-row justify-around items-center `, {width : '25%'}]}>
                <FontIcon name='calendar-day' color={'grey'} />
                <Text>Date :</Text>
              </View>
    
              <TouchableOpacity style={[s`flex-row`, {width : '75%'}]} onPress={OpenCloseDatePicker}>
                <View style={[s`justify-center items-center`, {width : '80%'}]}>
                  <TextInput style={{ padding: 5 , color : 'black'}} value={formattedDate} />
                </View>

              <View style={[s` justify-center items-center` , {width : '30%'}]}>

                <FontIcon name='calendar' color={'grey'} />
                <DatePicker
                open={open}
                modal
                textColor='red'
                date={date} mode='date'
                testID='dob'
                onDateChange={setDate}
                // editable={disableFields}
                onConfirm={(date) => {
                  OpenCloseDatePicker
                  setDate(date)
                }}
                onCancel={OpenCloseDatePicker}
                />
              </View>
              </TouchableOpacity>


            </View>



          </View>

          <View style={s`m-2`}>

            <Text style={s`text-black font-bold pb-2`}>Time Slot</Text>

            <DropDownPicker
              open={openPicker}
              value={value}
              items={timeSlot}
              showArrowIcon={true}
              onChangeValue={() => setErrorMsg(false)}
              ActivityIndicatorComponent={() => {

                return (

                  <ActivityIndicator color="#999" animating={true} />

                )
              }}
              setOpen={setOpenPicker}
              setValue={setValue}
              setItems={setTimeSlot}
            />


          </View>
          {errorMsg ? <View style={s`items-center justify-center`}><Text style={s`text-red-400 text-xs`}>Please Select a Preferred Time Slot</Text></View> : null}

          <View style={s`m-2`}>



            <Text style={s`text-black font-bold pb-2 text-center text-md`}>Lab Tests</Text>


            <View style={[s`flex z-0 flex-row rounded-md border-2 w-full border-blue-300 p-1 items-center`, styles.InputView]}>


              <View style={[s`flex-row justify-around items-center`, { width: '30%' }]}>

                <Feather name='search' color={'grey'} />
                <Text>Search :</Text>
              </View>
              <TouchableOpacity style={[s`flex-row items-center`, { width: '80%' }]}>
                <TextInput
                  style={[{ width: '100%', padding: 5 , color : 'black'}]} 
                  placeholder='Search Lab Test'
                  placeholderTextColor={'black'}
                  onChangeText={(text) => handleFilter(text)}
                // value={searchData}
                />
              </TouchableOpacity>

            </View>

            <FlatList
              numColumns={1}
              data={testsData}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              // removeClippedSubviews={true}
              // initialNumToRender={10}
              // maxToRenderPerBatch={10}
              // updateCellsBatchingPeriod={80}
              keyExtractor={item => item.ltesT_ID}
              // getItemLayout={(data, index) => ({
              //   length: 20,
              //   offset: 20 * index,
              //   index,
              // })}
              ItemSeparatorComponent={() => {
                return (
                  <View style={{ borderWidth: 1, borderColor: 'lightgray' }}></View>
                )
              }}
              // windowSize={10}
              // onEndReachedThreshold={0.5}
              renderItem={({ item }) => (


                // <ScrollView
                //   showsHorizontalScrollIndicator={false}
                //   showsVerticalScrollIndicator={false}
                // >

                  <TouchableOpacity style={[s`flex-row z-1 justify-between my-4`, styles.List]}>

                    <View style={{ width: "60%" }}>

                      <Text style={s`text-blue-900 font-medium`}>{item.ltesT_DESC}</Text>

                    </View>

                    <View style={s`flex-row items-center`}>

                      <BouncyCheckbox
                        size={25}
                        fillColor="red"
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular" }}
                        key={item.ltesT_ID}
                        onPress={(isChecked: boolean) => {
                          handleCheck({
                            ltesT_ID: item.ltesT_ID,
                            ltesT_DESC: item.ltesT_DESC,
                            tesT_DESCRIPTION: item.tesT_DESCRIPTION,
                            amt: item.amt,
                            opaT_ID: item.opaT_ID,
                            tranS_ID: item.tranS_ID,
                            currentaddress: item.currentaddress,
                            samplE_COL_DATE: item.samplE_COL_DATE,
                            samplE_COL_TIME: item.samplE_COL_TIME,
                            isChecked
                          })


                        }}
                      />

                      <Icon name='info-with-circle' color={'black'} onPress={() => {
                        setTestId({
                          ltesT_ID: item.ltesT_ID,
                          ltesT_DESC: item.ltesT_DESC,
                          tesT_DESCRIPTION: item.tesT_DESCRIPTION,
                          amt: item.amt,
                          opaT_ID: item.opaT_ID,
                          tranS_ID: item.tranS_ID,
                          currentaddress: item.currentaddress,
                          samplE_COL_DATE: item.samplE_COL_DATE,
                          samplE_COL_TIME: item.samplE_COL_TIME
                        }
                        )
                        bottomSheetRef.current?.expand()
                      }} size={20} />

                    </View>

                  </TouchableOpacity>

                // </ScrollView>
              )}

            />


          </View>


        </View>

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

            <View style={s`flex-row justify-between items-center px-8 py-12`}>

              <View style={s`items-center`}><Text style={s`font-bold text-lg italic text-blue-800`}>Invoice</Text></View>
              <View><Image source={Logo} style={{ width: 100, height: 50 }} width={100} height={100} /></View>

            </View>

            <View style={s`px-8 py-4`}>

              <View style={s`flex-row`}>
                <Text style={s`text-black font-bold`}>OPAT # : </Text>
                <Text style={s`text-black`}>{checkedData.opaT_ID}</Text>
              </View>
              <View style={s`flex-row`}>
                <Text style={s`text-black font-bold`}>Name    : </Text>
                <Text style={s`text-black`}>{checkedData.opaT_PNAME}</Text>
              </View>
              <View style={s`flex-row`}>
                <Text style={s`text-black font-bold`}>Phone #: </Text>
                <Text style={s`text-black`}>{checkedData.opaT_PHONE}</Text>
              </View>
              <View style={s`flex-row`}>
                <Text style={s`text-black font-bold`}>Email     : </Text>
                <Text style={s`text-black`}>{checkedData.email}</Text>
              </View>

            </View>

            <View style={s`px-8 py-8 border-t-2 border-t-gray-100`}>

              <View style={s`flex-row`}>
                <Text style={s`text-black font-bold`}>Collection Date : </Text>
                <Text style={s`text-black`}>{date_to_string}</Text>
              </View>
              <View style={s`flex-row`}>
                <Text style={s`text-black font-bold`}>Time Slot           : </Text>
                <Text style={s`text-black`}>{value}</Text>
              </View>
              <View style={s`flex-row`}>
                <Text style={s`text-black font-bold`}>Request Date     : </Text>
                <Text style={s`text-black`}>{date_to_string}</Text>
              </View>
              <View style={s`flex-row`}>
                <Text style={s`text-black font-bold`}>Due Date            : </Text>
                <Text style={s`text-black`}>{date_to_string}</Text>
              </View>

            </View>

            <View style={s`flex-row justify-between px-6 py-2 bg-blue-700`}>

              <View>
                <Text style={s`text-white`}>Code</Text>
              </View>
              <Text style={s`text-white`}>Test Name</Text>
              <Text style={s`text-white`}>Price</Text>

            </View>

            <FlatList
              numColumns={1}
              data={selectedTests}
              scrollEnabled={true}
              removeClippedSubviews={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.ltesT_ID}
              ItemSeparatorComponent={() => {
                return (
                  <View style={{ borderWidth: 1, borderColor: 'lightgray' }}></View>
                )
              }}
              renderItem={({ item }) => (

                <ScrollView scrollEnabled={true} >

                  <View style={s`flex-row justify-between px-4 py-6`}>

                    {/* <View> */}

                    {/* <Text style={s`text-black`}>{tests.test_name}</Text> */}
                    <Text style={s`text-black`}>{item.ltesT_ID}</Text>
                    <Text style={s`text-blue-900 font-bold `}>{item.ltesT_DESC}</Text>
                    <Text style={s`text-red-900 font-bold `}>{item.amt}</Text>

                    {/* </View> */}

                  </View>

                </ScrollView>
              )}
            />





            <View style={s`flex-row p-4 w-full justify-between`}>

              <View>

                <Button title="Close" color={'red'} onPress={() => setModalVisible(false)} />

              </View>

              <View>

                {/* <Button title="Pay" color={'green'} onPress={handleSubmit} /> */}
                {/* <OpenURLButton url={supportedURL}>PAY ONLINE</OpenURLButton> */}
                <Button onPress={handleSubmit} title='PAY ONLINE' />

              </View>

            </View>
          </View>
        </Modal>





        {/* --------------------------- Payment Submit Modal--------------------------------------- */}

        <Modal
          isVisible={isPaymentModalVisible}
          animationInTiming={300}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}
          coverScreen={true}
        >

          <View
            style={{ height: '40%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}
          >

            <Text style={s`text-black`}>Thank You </Text>

            <Text style={s`text-black`}>Our Contact Person Will Contact You Soon </Text>


            {/* <Text style={s`text-red-900 font-bold `}>Rs. {totalAmount}</Text> */}


            <Button title="Close" onPress={() => setPaymentModalVisible(false)} />



          </View>
        </Modal>




        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          // onClose={closeBottom}
          backdropComponent={renderBackdrop}
          // style={s`bg-red-100`}
          detached={true}
          // overDragResistanceFactor={1.5}
          // containerHeight={750}
          // bottomInset={50}
          backgroundStyle={{
            backgroundColor: 'lightblue'
          }}
        // handleHeight={80}
        >
          <View style={styles.contentContainer}>
            <View style={s`flex-row justify-between w-full p-4`}>
              <Text style={s`text-black italic`}>{testID?.ltesT_ID} </Text>
              <Text style={s`text-green-700 font-bold `}>Rs. {testID?.amt}</Text>
            </View>
            <Text style={s`text-black text-lg font-bold italic text-blue-600`}>{testID?.ltesT_DESC}</Text>
            <Text style={s`text-black`}>{testID?.tesT_DESCRIPTION} 🎉</Text>

          </View>
        </BottomSheet>

        <View style={[s`justify-center items-center absolute bottom-0 z-999 -left-0`, { width: '100%' }]}>

          {selectedTests.length !== 0 ?

            <TouchableOpacity
              onPress={toggleModal}
              style={[s`bg-red-500 items-center justify-center m-4 p-4`, { width: '100%', borderRadius: 100 }]}>

              <Icon name='forward' color={'white'} size={25} />

            </TouchableOpacity> : null

          }

        </View>


      </GestureHandlerRootView>
    </View>
    // </LabScreenWrapper>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    position: 'relative',

  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 999,
  },
  contentContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  // wrapperContainer: {
  //   flex: 1,
  //   position: 'relative',
  // },
  // loaderContainer: {
  //   ...StyleSheet.absoluteFillObject,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(255, 255, 255, 0.7)',
  //   zIndex: 999,
  // },

  // loaderContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#0000003b', // Semi-transparent white background
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   // zIndex: 999,
  // },
  // wrapperContainer: {
  //   flex: 1,
  //   position: 'relative', // Make sure it uses relative positioning
  // },
  // loaderContainer: {
  //   ...StyleSheet.absoluteFillObject, // Cover the entire screen
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#0000003b', // Semi-transparent white background
  //   // zIndex: 999,
  // },
  InputBox: {
    gap: 16,
  },
  lottie: {

    width: 200,
    height: 200,
    zIndex: 0,

  },
  InputView: {

    shadowColor: 'black',
    backgroundColor: 'white',
    shadowRadius: 50,
    shadowOffset: {
      width: 10,
      height: 50,
    },
    shadowOpacity: 1,
    elevation: 15,
    width: "100%"

  },
  input: {
    borderWidth: 0,
    width: '100%',
    textAlign: 'center'
  },
  List: {

    width: '100%',
    shadowColor: 'black',
    shadowOffset: {
      width: 4,
      height: 8
    },
    shadowOpacity: 1,
    elevation: 50

  },
  Footer: {
    alignItems: 'flex-end',
  },
});

export default LabScreen;




