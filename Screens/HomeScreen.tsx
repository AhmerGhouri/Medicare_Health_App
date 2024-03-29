import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  SafeAreaView,
  FlatList,
  Pressable,
  Dimensions,
  LogBox,
  Button,
  Alert,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { s } from 'react-native-wind';
import LottieView from 'lottie-react-native';
import Logo from '../src/assets/MEDICARE.png'
import Woman from '../src/assets/woman.png'
import Man from '../src/assets/man.png'
import Services from '../components/services/OfferedServices';
import Avatar from '../components/Avatar/Avatar';
import { Drawer } from 'react-native-drawer-layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App';
import UserDrawer from '../components/drawer/Drawer';
import Geolocation from '@react-native-community/geolocation';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { RadioButton } from 'react-native-paper';
import IconButton from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { bottomSheetDataType } from '../constants';
import { checkedData } from '../constants';
import { useAppDispatch } from '../app/hooks/hooks';
import { addPatientToStore } from '../app/slices/patientSlice';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { FadeOut, ZoomInRight } from 'react-native-reanimated';
import { Snackbar } from 'react-native-paper';




type HomeProps = NativeStackScreenProps<RootStackParamList, "HomeScreen">




export default function HomeScreen({ route, navigation }: HomeProps): JSX.Element {

  // const { user } = useAuth();
  // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { user } = route.params
  const [checked, setChecked] = useState('')
  const bottomSheetRef = useRef<BottomSheet>(null);
  const dispatch = useAppDispatch()
  const [bottomSheetData, setBottomSheetData] = useState<any>()
  const [checkedData, setCheckedData] = useState<checkedData>()
  const [backPressed, setBackPressed] = useState<any>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  // const centerLongitude = 67.06346625170369;
  // const centerLatitude = 24.881140447614683;
  // const radius = 1000; // in kilometers

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Geolocation Permission',
  //         message: 'Can we access your location?',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     return granted === PermissionsAndroid.RESULTS.GRANTED;
  //   } catch (err) {
  //     console.warn('Error requesting location permission:', err);
  //     return false;
  //   }
  // };

  // const getUserLocation = (): Promise<{ longitude, latitude }> => {
  //   return new Promise((resolve, reject) => {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         resolve({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //       },
  //       error => {
  //         reject(error);
  //       },
  //       { maximumAge: 0 },
  //     );
  //   });
  // };

  // const haversineDistance = (lat1, lon1, lat2, lon2) => {
  //   const R = 6371e3; // meters
  //   const φ1 = toRadians(lat1);
  //   const φ2 = toRadians(lat2);
  //   const Δφ = toRadians(lat2 - lat1);
  //   const Δλ = toRadians(lon2 - lon1);
  //   const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   return R * c;
  // };

  // const toRadians = angle => (angle * Math.PI) / 180;

  // const isWithin1Km = (longitude, latitude) => {
  //   const distance = haversineDistance(latitude, longitude, centerLatitude, centerLongitude);
  //   return distance <= radius;
  // };

  // const checkUserLocation = async () => {
  //   const hasPermission = await requestLocationPermission();
  //   if (!hasPermission) {
  //     console.warn('No permission for geolocation');
  //     return;
  //   }

  //   try {
  //     const location = await getUserLocation();
  //     if (isWithin1Km(location.longitude, location.latitude)) {
  //       Alert.alert('', 'User is inside 1 Km premises');
  //     } else {
  //       Alert.alert('Ineligible', 'You are not eligible to take these services outside of our premises.')
  //     }
  //   } catch (error) {
  //     console.warn('Error getting geolocation:', error.message);
  //     Alert.alert('Location Error', 'Failed to retrieve your location. Please make sure location services are enabled.');
  //   }
  // };



  // For Drawer Opening and closing
  const [open, setOpen] = React.useState(false);
  const snapPoints = useMemo(() => ['1%', '25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // BackDrop
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={2} />
    , []
  )

  const handleSetBottomSheetData = useCallback((data: null | any) => {
    setBottomSheetData(data)
  }, [])

  const handleCheckedData = useCallback((item) => {

    setChecked(item.opaT_ID)
    setCheckedData(item)

  }, [])

  const handleNavigateToLabScreen = (checkedData) => {

    dispatch(addPatientToStore(checkedData));
    navigation.navigate('Loading')
    setTimeout(() => navigation.replace('LabTestRequest', checkedData), 5000)
    bottomSheetRef.current?.close()

  }

  const renderList = (item) => {

    console.log("item" , item);
    

    return (
      <Pressable style={[s`flex-row z-1 justify-between items-center my-4 mx-2`, styles.List]}>
        <View style={[s`flex-row items-center justify-between`, {}]}>
        <Avatar ImageUrl={item.opaT_SEX === 'M' ? Man : Woman} width={20} height={20}/>

        <View style={[s`flex justify-between pl-4`, {}]}>
          <Text style={[s`text-black`, { fontFamily: 'Quicksand-Bold', fontSize: Dimensions.get('window').height < 804 ? 11 : 13 }]}>{item.opaT_ID}</Text>
          <Text style={[s`text-blue-900`, { fontFamily: 'Quicksand-Bold', fontSize: Dimensions.get('window').height < 804 ? 13 : 15 }]}>{item.opaT_PNAME.length > 20 ? item.opaT_PNAME.slice(0, 20) + '..' : item.opaT_PNAME}</Text>
        </View>
        </View>

        <View style={s`flex-row`}>
          <RadioButton
            value={item.opaT_ID}
            status={checked === item.opaT_ID ? 'checked' : 'unchecked'}
            onPress={() => handleCheckedData(item)}
          />
        </View>
      </Pressable>
    )

  }

  useEffect(() => {
    const backAction = () => {
      if (navigation.getState().routes[navigation.getState().index].name !== "HomeScreen") {
        return false;
      }
      if (backPressed > 0) {
        BackHandler.exitApp();
      } else {
        // ToastAndroid.show("Press back again to exit ", ToastAndroid.SHORT);
        setVisible(true)
        setBackPressed(backPressed + 1);
        setTimeout(() => setBackPressed(0), 2000);
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [backPressed]);

  const onDismissSnackBar = () => setVisible(false);


  return (

    // For whole screen drawer
    <Drawer
      open={open}
      style={s`flex-1`}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <UserDrawer user={user} />;
      }}
    >

      <SafeAreaView style={s`flex-1 `} >

        <View style={s`flex-1 bg-red-50 rounded-xl`}>

          <StatusBar barStyle={'dark-content'} />

          <View style={s`flex shrink-0 z-30`}>

            <View style={s`absolute top-0 left-0`}>
              {/* <Image source={HeaderImg} /> */}
              <Header />
            </View>

            <View style={s`flex-row mb-2 pt-8 px-6 justify-between items-center`}>
              {/* <Image
                source={Logo}
                style={[s`w-24 h-12`]}
              /> */}
              <Image source={Logo} style={{ width: Dimensions.get('window').height < 604 ? 100 : 130, height: Dimensions.get('window').height <= 804 ? 40 : 50 }}
              />
              <View>

                {/* For Opening and Closing */}
                <TouchableOpacity
                  style={s`items-center align-center`}
                  onPress={() => {
                    setOpen((prevOpen) => !prevOpen)
                  }}>

                  {/* <Avatar ImageUrl={user.gender === 'M' ? Man : Woman} width={20} height={20} /> */}
                  <Avatar ImageUrl={user.gender === 'M' ? Man : Woman} width={20} height={20} />
                  <Text style={[s`text-black pt-1 text-sm`, { fontSize: Dimensions.get('window').height < 604 ? 10 : 14, fontFamily: 'Quicksand-Bold' }]}>{user.pname?.slice(0, 7)}</Text>

                </TouchableOpacity>

              </View>

            </View>

          </View>

          {/* <Button title='Get Location' onPress={() => checkUserLocation()} /> */}

          <View style={s`flex-1 z-0 grow justify-top z-30`}>

            <View style={[s`flex shrink-0 w-full items-center`, styles.lottieContainer]}>
              <LottieView
                style={[styles.lottie]}
                source={require('../src/animations/animation_2.json')}
                autoPlay
                loop
              />
            </View>


            {/* <View style={[s``, {height : Dimensions.get('window').height <= 592 ? 200 : 'auto' } ,styles.servicesSection]}> */}
            <View style={[s``, , styles.servicesSection]}>
              <Services navigation={navigation} mob={user.mob} bottomSheetRef={bottomSheetRef} handleSetBottomSheetData={handleSetBottomSheetData} />
            </View>

          </View>

          <View style={s`flex-1  absolute bottom-0 right-0 z-1`}>
            {/* <<Image style={s`z-1`} source={FooterImg} />> */}
            {/* <Footer /> */}
          </View>

        </View>

        <BottomSheet
          ref={bottomSheetRef}
          style={s`z-999`}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          index={-1}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          // backgroundStyle= {{backgroundColor: '#fb4d4d'}}
          handleIndicatorStyle={{ backgroundColor: 'white', backfaceVisibility: 'hidden' }}
          handleStyle={{ backgroundColor: '#fb4d4d', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
        >

<View style={s`flex-column w-full `}>
            <Pressable
              onPress={() => navigation.push('MRScreen', { user })}
              style={[s`flex-row p-4 items-center justify-around w-full ` , {elevation : 20 , backgroundColor : '#fb4d4d'}]}>

              <View style={[s` items-center`, { width: '30%' }]}>
                <Icon name='plus' color={'white'} size={20} />
              </View>

              <View style={[s`pl-8`, { width: Dimensions.get('window').width <= 600 ? '70%' : '60%' }]}>
                <Text style={s`text-white text-medium italic font-semibold`}>
                  Create New MR #
                </Text>
              </View>

            </Pressable>
            {/* <Pressable
              onPress={() => navigation.push('MRScreen', { user })}
              style={[s`flex-row pb-4 justify-around w-full `, { width: '100%' }]}>
              
              <View style={s`bg-blue-600 p-4 rounded-full items-center justify-center`}>
                <View style={[s``]}>
                  <Icon name='plus' color={'white'} size={20} />
                </View>

                <View style={[s``]}>
                  <Text style={s`text-white text-medium italic font-semibold`}>
                    MR #
                  </Text>
                </View>
              </View>

            </Pressable> */}
          </View>

          <View style={s`my-2 p-2`}>
            {
              bottomSheetData == 0 ?
                (
                  <Text style={[s`text-sm font-medium m-12 items-center justify-center italic text-center text-black`, { fontFamily: 'Quicksand-Bold', fontSize: Dimensions.get('window').height < 804 ? 12 : 14 }]}>
                    No MR Number is Registered with this Mobile Number! Please Click below button to create MR #.
                  </Text>
                )
                :
                (
                  <Text style={[s`text-sm font-medium mx-4 italic text-center text-black`, { fontFamily: 'Quicksand-Bold', fontSize: Dimensions.get('window').height < 804 ? 12 : 14 }]}>
                    Following MR # are registered on your mobile number kindly select one for service.
                  </Text>
                )
            }
          </View>

         

          <BottomSheetScrollView nestedScrollEnabled={true} contentContainerStyle={styles.contentContainer}>
            <FlatList
              numColumns={1}
              data={bottomSheetData}
              removeClippedSubviews={false}
              // ItemSeparatorComponent={() => {
              //   return (
              //     <View style={{ borderWidth: 0.5, borderColor: 'lightgray' }}></View>
              //   )
              // }}
              keyExtractor={item => item.opaT_ID}
              renderItem={({ item }) => renderList(item)}

            />
          </BottomSheetScrollView>

          <View>
            {checkedData && (

              <Animated.View style={s`flex`} entering={ZoomInRight.duration(1000)} exiting={FadeOut} >
                <Pressable onPress={() => handleNavigateToLabScreen(checkedData)} style={[s`absolute bg-red-500 rounded-full right-0 bottom-10  m-4 p-4`, { elevation: 25 }]}>
                  <IconButton
                    name="mail-forward"
                    color={'white'}
                    size={Dimensions.get('window').height < 704 ? 15 : 25}
                  />
                </Pressable>
              </Animated.View>
            )
            }
          </View>

        

        </BottomSheet>

        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={2000}

          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            width: '100%',
            textAlign: 'center'
          }}>
            Press back again to exit
          </Text>
        </Snackbar>

      </SafeAreaView>

    </Drawer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  contentContainer: {

    padding: 10,
    // alignItems: 'center',
    // justifyContent: 'center'
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
  servicesSection: {

    // flex : 1,
    // height : 280,
    marginTop: -50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
    borderWidth: 0,
    // borderColor : 'red',
    // borderRadius : 50,
    // borderLeftWidth : 0,
    // borderRightWidth : 0,
    // borderBottomWidth : 0,


  },
  lottieContainer: {

    zIndex: 0,

  },
  lottie: {

    // width: 400,
    // height: 400,
    width: Dimensions.get('window').height <= 704 ? 330 : 400 && Dimensions.get('screen').width >= 800 && Dimensions.get('screen').width <= 1080 ? 700 : 400 && Dimensions.get('screen').width >= 1080 ? 400 : 400,
    height: Dimensions.get('window').height <= 704 ? 330 : 400 && Dimensions.get('screen').width >= 800 && Dimensions.get('screen').width <= 1080 ? 700 : 400 && Dimensions.get('screen').width >= 1080 ? 400 : 400,
    zIndex: 0,

  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

