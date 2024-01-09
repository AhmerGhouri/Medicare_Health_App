import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  SafeAreaView
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { s } from 'react-native-wind';
import LottieView from 'lottie-react-native';
import HeaderImg from '../src/assets/Ellipse.png'
import FooterImg from '../src/assets/Footer.png'
import Logo from '../src/assets/MEDICARE.png'
import Services from '../components/services/Services';
import Avatar from '../components/Avatar/Avatar';
import { Drawer } from 'react-native-drawer-layout';
import axios from 'axios';
import Man from '../src/assets/man.png'
import GetLocation from 'react-native-get-location';
import { useAuth } from '../components/authContext/AuthContext';
import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import UserDrawer from '../components/drawer/Drawer';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';



type HomeProps = NativeStackScreenProps<RootStackParamList , 'HomeScreen'>




export default function HomeScreen({ navigation } : any) {


  // const {opaT_PNAME} = route.params

  // useNavigation<NativeStackNavigationProp<RootStackParamList>>

  // console.log('name' , opaT_PNAME);
  // console.log('password' , weB_PASSWORD);


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

  requestCameraPermission()

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
  const {authState , onLogout} = useAuth()

  //   const baseUrl : string = 'https://local.medicarehospital.pk:98/Handlers/MCGHWebHandler.ashx'


  // // Invoking get method to perform a GET request
  //   const fetchUser = async () => {
  
  //     const url = `${baseUrl}/api/users/1`;
  //     const response = await axios.get(url);
  //     console.log(response.data);

  //     return response

  //   };

  
  
  return (


    // For whole screen drawer
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <UserDrawer />;
      }}
      >
      
      <SafeAreaView style={s`flex-1`} >
    
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

            <View
              style={s`flex-row mb-2 pt-4 px-4 justify-between items-center`}>

            
              <Image
                source={Logo}
                style={s`w-24 h-12`}
              />

              <View>


                {/* For Opening and Closing */}

                <TouchableOpacity
                  style={s` items-center align-center`}
                  onPress={() => {
                    setOpen((prevOpen) => !prevOpen)
                  }}>
                  
                  <Avatar ImageUrl={Man} width={20} height={20}/>
                  
                  <Text style={s`text-black text-sm`}>Juma Bai</Text>
                  
                  <TouchableOpacity onPress={onLogout}>

                    <Text style={s`text-green-500 pt-1`}>Sign Out</Text>

                  </TouchableOpacity>

                  
                </TouchableOpacity> 
                           
                
              </View>

            </View>

          </View>

          <View style={s`flex shrink-1 justify-top z-30`}>
            
            <View style={[s` w-full items-center` , styles.lottieContainer]}>

              <LottieView
                style={[styles.lottie]}
                source={require('../src/animations/animation_2.json')}
                autoPlay
                loop
              />

            </View>

            <View style={[s`` , styles.servicesSection]}>

              {/* <ScrollView 
                    scrollEnabled={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                  > */}

              <Services navigation={navigation} />

                {/* </ScrollView> */}

            </View>

              {/* </ScrollView> */}


          </View>
  
        
          <View style={s`flex-1 absolute bottom-0 right-0 z-1`}>

            <Image style={s`z-1`} source={FooterImg} />

          </View>



        </View>

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
  servicesSection: {

    // flex : 1,
    // height : 280,
    marginTop : -50,
    justifyContent :'center',
    alignItems : 'center',
    zIndex : 30,
    borderWidth : 0,
    // borderColor : 'red',
    // borderRadius : 50,
    // borderLeftWidth : 0,
    // borderRightWidth : 0,
    // borderBottomWidth : 0,


  },
  lottieContainer : {

    zIndex : 0,
    
  },
  lottie : {

    width : 400,
    height : 400,
    zIndex : 0,

  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});
