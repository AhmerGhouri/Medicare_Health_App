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
import Animated, { FadeOut, ZoomIn, ZoomInRight, ZoomInUp, ZoomOutEasyUp } from 'react-native-reanimated';
import SelectedTestsModals from '../components/Modals/SelectedTestsModals';
import ServicesDetail from '../components/services/ServicesDetail';
import BottomSheetComponent from '../components/BottomSheet/BottomSheet';




type LabScreenProps = NativeStackScreenProps<RootStackParamList, 'LabTestRequest'>


function LabScreen({ navigation, route }: LabScreenProps) {




  const code = useAppSelector(state => state.code);
  const API = `https://local.jmc.edu.pk:82/api/WebReqServices/GetSelectServiceData?Class=${code}&Panel=PVT`


  // All State Which Manages
  const checkedData = route.params
  const [date, setDate] = useState(new Date());
  const [testsData, setTestData] = useState<LabTestData[]>([])
  const [filterData, setFilterData] = useState<LabTestData[]>([]);
  const [open, setOpen] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [selectedTests, setSelectedTests] = useState<selectedTest>()
  const [timeSlot, setTimeSlot] = useState<timeSlots[]>(timeSlotData);
  const [testID, setTestId] = useState<testData>()
  const [externalLinkOpened, setExternalLinkOpened] = useState(false)
  const appStateSubscriptionRef = useRef<NativeEventSubscription | null>(null);
  const [appClosed, setAppClosed] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<boolean>(false)
  let formattedDate = date.getDate() + '-' + date.toLocaleString("en-US", { month: 'short' }) + '-' + date.getFullYear();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false)
  const [updatedpostData, setUpdatedPostData] = useState<postDatatype>({});
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => ['1%' , '50%'], []);
  const { cartItem } = useAppSelector(state => state.cart);
  const { errorMessage } = useAppSelector((state => state.cart))

  console.log("col", value);
  // console.log("error" , errorMessage);


  const opatValues = {
    opaT_ID: checkedData.opaT_ID!.toString(),
    currentaddress: "KARACHI",
    samplE_COL_DATE: formattedDate,
    samplE_COL_TIME: value,

  };

  // Fetch Data from API
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const result = await axios.get(API)
      const data = result.data
      setTestData(data)
      setFilterData(data)
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

    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {

    console.log('handleSheetChanges', index);

  }, []);

  // BackDrop
  const renderBackdrop = useCallback(

    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={2} />
    , []
  )

  const handleFilter = useCallback(
    (searchText: string) => {

      const filteredData = testsData!.filter(({ ltesT_DESC }) =>
        ltesT_DESC!.toUpperCase().includes(searchText.toUpperCase())

      );
      setFilterData(filteredData);

    }, [testsData, setFilterData])


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

  const OpenCloseDatePicker = () => {

    setOpen(!open)

  }

  const toggleModal = async () => {
    if (value === null) {
      setErrorMsg(true);
    } else {
      try {

        setIsLoading(true)
        navigation.navigate('CartScreen');
        setIsLoading(false);

      } catch (error) {
        // Handle error if needed
        console.error('Error navigating to CartScreen:', error);
      }
    }
  };

  const handleSetTestID = useCallback((id: testData) => {
    setTestId(id);
    bottomSheetRef.current?.expand();
  }, [bottomSheetRef]); 

  return (

    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>

        {isLoading && (
          <View style={styles.overlay}>
            <LottieView
              style={[styles.lottie]}
              source={require('../src/animations/logoanimate.json')}
              autoPlay
              loop
            />
          </View>
        )}

        <View style={s`flex-1 p-8`}>

          <View style={s`m-2`}>

            <View style={[s`flex z-0 flex-row rounded-md justify-between border-2  border-blue-300 p-1 items-center`, styles.InputView]}>

              <View style={[s`flex-row justify-around items-center `, { width: '25%' }]}>
                <FontIcon name='calendar-day' color={'grey'} />
                <Text style={{ fontFamily: 'Quicksand-Regular', color: 'gray' }}>Date :</Text>
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
                    minimumDate={new Date()}
                    title={'Select a Collection/Service date'}
                    textColor='white'
                    androidVariant='nativeAndroid'
                    date={date} mode='date'
                    theme='dark'
                    testID='dob'
                    style={{ backgroundColor: '#fb4d4d' }}
                    onDateChange={setDate}
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
              style={{ width: '95%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, marginHorizontal: 8, }}
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
            <ServicesDetail data={filterData} opatValues={opatValues} onSetTestID={handleSetTestID} />
          </View>

        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          handleIndicatorStyle={{ backgroundColor: 'white' }}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          detached={true}
          backgroundStyle={{
            backgroundColor: '#fb4d4d'
          }}
        >
          <BottomSheetComponent  testID={testID}/>        
        </BottomSheet>


        <Animated.View style={s`flex`} entering={ZoomIn.duration(1000)} exiting={FadeOut} >
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
        </Animated.View>
        <SelectedTestsModals visible={errorMessage} navigation={navigation} />
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