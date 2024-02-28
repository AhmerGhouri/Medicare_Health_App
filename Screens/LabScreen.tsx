import { Labtests, timeSlotData } from '../DummyData/LabTests';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, FlatList, Pressable, BackHandler, Image, Linking, Alert, AppState, EmitterSubscription, NativeEventSubscription } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { s } from 'react-native-wind'
import { TextInput } from 'react-native'
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import { opatValuesType, selectedTest } from '../constants';
import { testData, timeSlots, LabTestData, postDatatype } from '../constants';
import LottieView from 'lottie-react-native';
import Search from '../components/searchBox/Search';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useAppDispatch, useAppSelector } from '../app/hooks/hooks';
import { addToCart, CartItem, removeFromCart } from '../app/slices/cartSlice';
import { setOpatId } from '../app/slices/cartSlice';




type LabScreenProps = NativeStackScreenProps<RootStackParamList, 'LabTestRequest'>


function LabScreen({ navigation, route }: LabScreenProps) {


  
  
  const  code  = useAppSelector(state => state.code);
  const API = `https://local.jmc.edu.pk:82/api/WebReqServices/GetSelectServiceData?Class=${code}&Panel=PVT`
  console.log("Short Code" , code);
  
  // All State Which Manages
  const checkedData = route.params
  const [date, setDate] = useState(new Date());
  const [testsData, setTestData] = useState<LabTestData[]>([])
  const [filterData, setFilterData] = useState<LabTestData[]>([]);
  const [open, setOpen] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedTests, setSelectedTests] = useState<selectedTest>()
  const [timeSlot, setTimeSlot] = useState<timeSlots[]>(timeSlotData);
  const [testID, setTestId] = useState<testData>()
  const [externalLinkOpened, setExternalLinkOpened] = useState(false)
  const appStateSubscriptionRef = useRef<NativeEventSubscription | null>(null);
  const [appClosed, setAppClosed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<boolean>(false)
  let formattedDate = date.getDate() + '-' + date.toLocaleString("en-US", { month: 'short' }) + '-' + date.getFullYear();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false)
  const [updatedpostData, setUpdatedPostData] = useState<postDatatype>({});
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => ['1%', '25%', '50%'], []);
  const dispatch = useAppDispatch();
  const { cartItem } = useAppSelector(state => state.cart);

  console.log("cart item lenght" , cartItem.length);
  

  
    const opatValues = {
      opaT_ID: checkedData.opaT_ID!.toString(),
      currentaddress: "KARACHI",
      samplE_COL_DATE: formattedDate,
      samplE_COL_TIME: value,
      
    };

    console.log("opat smaple time" , opatValues.samplE_COL_TIME);

    // const postData : postDatatype = selectedTests.map((tests) => ({
    
  //   amt: tests.amt,
  //   ltesT_DESC: tests.ltesT_DESC,
  //   ltesT_ID: tests.ltesT_ID,
  //   tesT_DESCRIPTION: tests.ltesT_DESC,
  //   opaT_ID : opatValues.opaT_ID,
  //   currentaddress  : opatValues.currentaddress,
  //   samplE_COL_DATE : opatValues.samplE_COL_DATE,
  //   samplE_COL_TIME : opatValues.samplE_COL_TIME
    
  // }))

    // const postData : postDatatype = {
      
    //   amt: selectedTests?.amt,
    //   ltesT_DESC: selectedTests?.ltesT_DESC,
    //   ltesT_ID: selectedTests?.ltesT_ID,
    //   tesT_DESCRIPTION: selectedTests?.ltesT_DESC,
    //   opaT_ID : opatState!.opaT_ID,
    //   currentaddress  : opatState!.currentaddress,
    //   samplE_COL_DATE : opatState!.samplE_COL_DATE,
    //   samplE_COL_TIME : opatState!.samplE_COL_TIME
      
    // }



  // console.log("postdat", postData);


  // Fetch Data from API

  const fetchData = useCallback(async () => {

    try {

      const result = await axios.get(API).then((res) => {

        const data = res.data
        setIsLoading(true)
        setTimeout(() => {
          setTestData(data)
          setFilterData(data)
          setIsLoading(false)
        }, 1000)

      }).catch((error) => {

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
      })

      return result

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
  }, [])

  const closeBottom = () => {
    bottomSheetRef.current?.close()
  }

  useEffect(() => {
    closeBottom()
    fetchData()
  }, [])

  const toggleModal = () => {

    if (value === null) {
      setErrorMsg(true)
    } else {
      setIsLoading(true);
      setTimeout(() => {
        navigation.navigate('CartScreen')
        setIsLoading(false)
      }, 2000)
    }

  };

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {

    console.log('handleSheetChanges', index);

  }, []);

  // BackDrop
  const renderBackdrop = useCallback(

    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={1} appearsOnIndex={2} />
    , []
  )

  const handleFilter = useCallback(
    (searchText: string) => {

      const filteredData = testsData!.filter(({ ltesT_DESC }) =>
        ltesT_DESC!.toUpperCase().includes(searchText.toUpperCase())

      );
      setFilterData(filteredData);

    }, [testsData, setFilterData])

  const renderLabTest = useCallback(({ item }) => {

    return (

      <>

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
                  ...item,
                  isChecked
                })

              }}
            />

            <Icon name='info-with-circle' color={'black'}
              onPress={() => {
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
                })
                bottomSheetRef.current?.expand()
              }} size={20}
            />

          </View>

        </TouchableOpacity>

      </>



    )

  }, [])

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

  // const handleCheck = (test) => {
  //   console.log("selected tests" , selectedTests);
    
  //   dispatch(addToCart(updatedTest));
  //   setSelectedTests((prev) => {

  //     // If test is already in array, remove it. Otherwise add it.
  //     const index = prev.findIndex((item) => item.ltesT_ID === test.ltesT_ID);
      
  //     if (index === -1) {
  //       // dispatch(addToCart(test));
  //       return [ ...prev , test];
  //     } else {
  //       return prev.filter((item) => item.ltesT_ID !== test.ltesT_ID);
  //     }
  //   });
    

  // };
  
  const handleCheck = (test) => {
    dispatch(setOpatId(opatValues))
    dispatch(addToCart(test));
    // setSelectedTests(test)    
  };

  const OpenCloseDatePicker = () => {

    setOpen(!open)

  }

  return (

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


            <View style={[s`flex z-0 flex-row rounded-md justify-between border-2  border-blue-300 p-1 items-center`, styles.InputView]}>


              <View style={[s`flex-row justify-around items-center `, { width: '25%' }]}>
                <FontIcon name='calendar-day' color={'grey'} />
                <Text>Date :</Text>
              </View>

              <TouchableOpacity style={[s`flex-row`, { width: '75%' }]} onPress={OpenCloseDatePicker}>
                <View style={[s`justify-center items-center`, { width: '80%' }]}>
                  <TextInput style={{ padding: 5, color: 'black' }} value={formattedDate} />
                </View>

                <View style={[s` justify-center items-center`, { width: '30%' }]}>

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


            <Search onChange={handleFilter} />

            <FlatList
              numColumns={1}
              data={filterData}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.ltesT_ID}
              ItemSeparatorComponent={() => {
                return (
                  <View style={{ borderWidth: 1, borderColor: 'lightgray' }}></View>
                )
              }}
              renderItem={renderLabTest}

            />


          </View>

        </View>


        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          detached={true}
          backgroundStyle={{
            backgroundColor: 'lightblue'
          }}
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

          {cartItem.length !== 0 ?

            <TouchableOpacity
              onPress={toggleModal}
              style={[s`bg-red-500 items-center justify-center m-4 p-4`, { width: '100%', borderRadius: 100 }]}>

              <Icon name='forward' color={'white'} size={25} />
              <Text style={s`text-white italic font-bold`}>Cart</Text>

            </TouchableOpacity> 
            : null

          }


        </View>


      </GestureHandlerRootView>
    </View>

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