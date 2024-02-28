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
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { s } from 'react-native-wind';
import LottieView from 'lottie-react-native';
import HeaderImg from '../src/assets/Ellipse.png'
import FooterImg from '../src/assets/Footer.png'
import Logo from '../src/assets/MEDICARE.png'
import Woman from '../src/assets/woman.png'
import Man from '../src/assets/man.png'
import Services from '../components/services/Services';
import Avatar from '../components/Avatar/Avatar';
import { Drawer } from 'react-native-drawer-layout';
import axios from 'axios';
import GetLocation from 'react-native-get-location';
import { useAuth } from '../components/authContext/AuthContext';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import UserDrawer from '../components/drawer/Drawer';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetScrollView, BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { Button, IconButton, MD3Colors, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { bottomSheetDataType } from '../constants';
import { checkedData } from '../constants';
import { useAppSelector, useAppDispatch } from '../app/hooks/hooks';
import { addPatientToStore } from '../app/slices/patientSlice';




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


  useEffect(() => {
    requestCameraPermission()
    bottomSheetRef.current?.close()
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // GetLocation.getCurrentPosition({

  //   enableHighAccuracy: true,
  //   timeout: 60000,

  // })
  // .then(location => {
  //   console.log(location);
  // })
  // .catch(error => {
  //   const { code, message } = error;
  //   console.warn(code, message);  
  // })





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

  const handleCheckedData = (item) => {

    setChecked(item.opaT_ID)
    setCheckedData(item)

  }


  const handleNavigateToLabScreen = (checkedData) => {

    dispatch(addPatientToStore(checkedData));
    navigation.navigate('Loading')
    setTimeout(() => navigation.replace('LabTestRequest', checkedData), 5000)
    bottomSheetRef.current?.close()

  }

  return (

    // For whole screen drawer
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <UserDrawer user={user} />;
      }}
    >

      <SafeAreaView style={s`flex-1 `} >

        <View style={s`flex-1 bg-red-50 rounded-xl`}>

          <StatusBar barStyle={'dark-content'} />

          {/* <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{padding: 10}}
            style={s` z-30`}
            > */}

          <View style={s`flex shrink-0 z-30`}>

            <View style={s`absolute top-0 left-0`}>

              <Image source={HeaderImg} />

            </View>

            <View style={s`flex-row mb-2 pt-8 px-6 justify-between items-center`}>

              <Image
                source={Logo}
                style={[s`w-24 h-12`]}
              />

              <View>

                {/* For Opening and Closing */}
                <TouchableOpacity
                  style={s`items-center align-center`}
                  onPress={() => {
                    setOpen((prevOpen) => !prevOpen)
                  }}>

                  <Avatar ImageUrl={user.gender === 'M' ? Man : Woman} width={20} height={20} />

                  {/* <Text style={s`text-black text-sm`}>{user.pname}</Text> */}
                  <Text style={s`text-black pt-2 text-sm`}>{user.pname?.slice(0, 7)}</Text>

                  {/* <TouchableOpacity onPress={onLogout}>

                    <Text style={s`text-green-500 pt-1`}>Sign Out</Text>

                  </TouchableOpacity> */}

                </TouchableOpacity>

              </View>

            </View>

          </View>

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

            <Image style={s`z-1`} source={FooterImg} />

          </View>

        </View>

        <BottomSheet
          ref={bottomSheetRef}
          style={s`z-999`}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
        >

          <View style={s`mb-4`}>
            {
              bottomSheetData == 0 ?
                (
                  <Text style={[s`text-sm font-medium m-12 items-center justify-center italic text-center text-black`]}>
                    No MR Number is Registered with this Mobile Number! Please Click below button to create MR #.
                  </Text>
                )
                :
                (
                  <Text style={[s`text-sm font-medium mx-4 italic text-center text-black`]}>
                    Following MR # are registered on your mobile number kindly select one for service.
                  </Text>
                )
            }
          </View>

          {/* <View style={styles.contentContainer}> */}
          <BottomSheetScrollView nestedScrollEnabled={true} contentContainerStyle={styles.contentContainer}>
            {/* <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.contentContainer}> */}
            <FlatList
              numColumns={1}
              data={bottomSheetData}
              //             ListHeaderComponent={() => (
              //               <View style={s`fixed top-0`}>
              //                 <Text style={[s`text-sm italic text-center text-black`]}>
              //                   Following MR # are registered on your mobile number kindly select one for service. 
              //                 </Text>
              //               </View>
              // )}
              // nestedScrollEnabled={true}
              // scrollEnabled={true}
              removeClippedSubviews={false}
              keyExtractor={item => item.opaT_ID}
              renderItem={({ item }) => (

                <Pressable style={[s`flex-row z-1  justify-between items-center my-4 mx-2`, styles.List]}>

                  <View style={[s`flex-row justify-between`, {}]}>

                    <Text style={s`text-blue-900 font-medium`}>{item.opaT_ID}</Text>

                  </View>
                  <View style={[s`flex-row justify-between`, {}]}>

                    <Text style={s`text-blue-900 font-medium`}>{item.opaT_PNAME}</Text>

                  </View>

                  <View style={s`flex-row`}>

                    <RadioButton
                      value={item.opaT_ID}
                      status={checked === item.opaT_ID ? 'checked' : 'unchecked'}
                      onPress={() => handleCheckedData(item)}
                    />

                  </View>

                </Pressable>

              )}

            />

          </BottomSheetScrollView>
          {/* </ScrollView> */}
          {/* </View> */}

          <View>

            {checkedData && (

              <View style={s`absolute bottom-0 right-0 p-4`}>

                <IconButton
                  icon="send"
                  animated={true}
                  mode={'contained'}
                  iconColor={MD3Colors.error50}
                  size={20}
                  onPress={() => handleNavigateToLabScreen(checkedData)}
                />
              </View>

            )
            }

          </View>

          <View style={s`flex-column w-full border-t-2 border-gray-300 `}>

            <TouchableOpacity
              onPress={() => navigation.push('MRScreen', { user })}
              style={s`flex-row p-4 items-center bg-blue-600 justify-around w-full `}>

              <View style={[s` items-center`, { width: '30%' }]}>
                <Icon name='plus' color={'white'} size={20} />

              </View>
              <View style={[s`pl-8`, { width: Dimensions.get('window').width <= 600 ? '70%' : '60%' }]}>

                <Text style={s`text-white text-medium italic font-semibold`}>

                  Create New MR #

                </Text>
              </View>


            </TouchableOpacity>

          </View>



        </BottomSheet>

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
    width: Dimensions.get('window').height <= 592 ? 300 : 400 && Dimensions.get('screen').width >= 800 && Dimensions.get('screen').width <= 1080 ? 700 : 400 && Dimensions.get('screen').width >= 1080 ? 400 : 400,
    height: Dimensions.get('window').height <= 592 ? 300 : 400 && Dimensions.get('screen').width >= 800 && Dimensions.get('screen').width <= 1080 ? 700 : 400 && Dimensions.get('screen').width >= 1080 ? 400 : 400,
    zIndex: 0,

  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});


