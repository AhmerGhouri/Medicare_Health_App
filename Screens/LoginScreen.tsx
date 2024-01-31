import {
  Image,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Button,
  Text,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import {TextInput, Icon, RadioButton} from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderImg from '../src/assets/Ellipse.png'
import FooterImg from '../src/assets/Footer.png'
import Logo from '../src/assets/MEDICARE.png'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, TouchableOpacity } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { api, useAuth } from '../components/authContext/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App';
import { data } from 'autoprefixer';
import Icon from 'react-native-vector-icons/FontAwesome6'
import { s } from 'react-native-wind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Snackbar from 'react-native-snackbar';
import { Snackbar } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';





type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login', 'Registration'>



export default function LoginScreen({ navigation }: LoginProps) {


  const [mobileNo, setMobileNo] = useState('')
  const [weB_PASSWORD, setPassword] = useState('')
  const { onLogin, onRegister } = useAuth()
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState([{
    opaT_ID: '',
    opaT_PNAME: '',
    email: '',
    weB_PASSWORD: '',
    rolE_ID: ''
  }])
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [numError, setNumError] = useState('')
  const [numMsg, setnumMsg] = useState(false)
  const bottomSheetRef = useRef<BottomSheet>(null);




  // ---------------- Fetching Data From OPAT API and checking that user in opat exist or not
  // ---------------- If exist than set object to userData if not than give error
  // ---------------- This will run when mobile no is entering

  // const fetchData = async () => {
  //   try {

  //     const baseURL = `https://local.jmc.edu.pk:82/api/Patients/GetPatientDataFromMob?mob=${mobileNo}`;
  //     const response = await axios.get(baseURL);
  //     setErrorMsg('');
  //     setUserData(response.data)
  //     if(userData.length > 0){

  //     }

  //     if (response.status !== 200) {
  //       console.log("Something Went Wrong");
  //     } else {
  //       setErrorMsg('No user found with this mobile number');
  //     }

  //   } catch (error) {
  //     setErrorMsg('Something went wrong, please try again later');
  //   }

  // };

  // -----------------------------------------------------------------------------------------


  // This Excutes when mobile Number entering
  // This Method fetch Data from User Registration Table
  const fetchRegData = async () => {

    try {

      const baseURL = `https://local.jmc.edu.pk:82/api/UserRegData/GetUserRegData?mob=${mobileNo}`;
      const response = await axios.get(baseURL);
      setErrorMsg('');
      setUserData(response.data)
      if (response.status !== 200) {
        console.log("Something Went Wrong");
      } else {
        setErrorMsg('No user found with this mobile number');
      }


    } catch (error) {
      setErrorMsg('Something went wrong, please try again later');
    }

  }


  const handlePress = (user) => {
    console.log(`Logged in with user: ${user}`);
  };


  // Send Parameters Mobile & Password to AUTHSTATE.ts for Authentication
  // This Excutes when Login Button Press
  const login = async () => {

    setLoading(true);
    try {

      const result = await onLogin!(mobileNo, weB_PASSWORD);
      console.log("login result", result)
      // if (result && result.error) {
      //   setErrorMsg(result.msg);
      // } else {
      //   setErrorMsg('');
      //   // navigation.replace('Home');
      // }
    } catch (error) {
      setErrorMsg('Something went wrong, please try again later');
    } finally {
      setLoading(false);
    }

  };


  // This UseEffect Works When mobile no entered
  useEffect(() => {

    // Fetch Data from User Registraion Table
    fetchRegData();


  }, [mobileNo]);


  // Disable Button When Login and Password is Empty
  const isButtonDisable = () => {

    return weB_PASSWORD === '' || mobileNo.trim() === '' || numMsg

  }




  // ----------------- This Handle Login Function Check from userData which comes from OPAT API
  // ----------------- Checking if response have multiple object check whether there have password in any object
  // ----------------- If there have been a password in any of the object than execute login method if not set an error kindly register your password


  // const handleLogin = () => {

  //   Keyboard.dismiss();



  //   Checking length of the response
  //   if (userData.length >= 1) {


  //      if true Checking whether a password exist on that objects or not
  //     const getItem = () => {

  //       This will return true or false
  //       return userData.filter(pwd => pwd.weB_PASSWORD !== null).length > 0


  //       // these variable "NAME" & "PASSWORD" comes from login screen inputs
  //       // const res = getItem(data,{"Password": weB_PASSWORD})

  //       // if(pwd.weB_PASSWORD === null){

  //       //   login()
  //       //   bottomSheetRef.current?.expand()
  //       //   console.log("password" , pwd.weB_PASSWORD);

  //       // }else{

  //         // setNumError("Your Password is Not Set, Kindly Generate Your Password")
  //         // setErrorMsg('Password')
  //         // setVisible(true)


  //       // }


  //     // })

  //     }
  //     const getPass = getItem()

  // 
  //      if above getPass function true it execute login method
  //     if (getPass) {

  //       login()

  //     }
  //     else set an error your password is not set kindly set password
  //     else{

  //       setNumError("Your Password is Not Set, Kindly Generate Your Password")
  //       setErrorMsg('Password')
  //       setVisible(true)


  //     }


  //     console.log("get" , getItem());


  //   }


  //    if the "if statement" not true means number not found in OPAT API than execute this else block where 
  //      show a message that you are not registered with us and click on register to sign up
  //   else{

  //     setNumError("Your Number is Not Registered Kindly Register YourSelf")
  //     setErrorMsg('Number')
  //     setVisible(true)

  //   }

  // }


  const handleLogin = async () => {



    Keyboard.dismiss();
    console.log("userData On handle", userData);
    console.log("userData type On handle", userData.length);


    const data = await userData

    if (data.length !== 0) {

      login()

      // Reason for Below Commented Data is, initially we trying to Login users from OPAT Table,
      // Where we check if the  
      //  if above getPass function true it execute login method

      // }

      // // else set an error your password is not set kindly set password
      // else{

      //   setNumError("Your Password is Not Set, Kindly Generate Your Password")
      //   setErrorMsg('Password')
      //   setVisible(true)


      // }


      // console.log("get" , getItem());


    }
    //  if the "if statement" not true means number not found in OPAT API than execute this else block where 
    //    show a message that you are not registered with us and click on register to sign up
    else {

      setNumError("Your Number is Not Registered Kindly Register YourSelf")
      setVisible(true)

    }



  }



  const onDismissSnackBar = () => setVisible(false);

  const handleInput = () => {

    if (mobileNo.trim().length < 11) {

      if (mobileNo.trim() == '') {

        setNumError("Number is Required")
        setnumMsg(true)

      } else {


        setNumError("Enter a valid Number")
        setnumMsg(true)

      }
    }
    else {

      setNumError('')
      setnumMsg(false)

    }

  }

  return (



    <View

      style={[

        styles.ScreenContainer,

        {

          flexDirection: 'column',

        },

      ]}>

      <GestureHandlerRootView style={s`flex-1`}>

        <View style={styles.Header}>

          <Image source={HeaderImg} />

        </View>


        <View style={styles.Credentials as StyleProp<ViewStyle>}>

          <View style={s`my-8`}>

            <Image source={Logo}
              width={10} height={10} />

          </View>

          <View style={styles.InputBox}>


            <View style={[s`flex flex-row rounded-md border-2 border-red-300 p-1 justify-around items-center`, styles.InputView]}>

              <Icon name='phone' color={'grey'} />
              <TextInput
                onBlur={handleInput}
                placeholderTextColor={'black'}
                placeholder='Enter Your Mobile Number'
                keyboardType='numeric'
                style={s`text-black`}
                maxLength={11}
                onChangeText={(text: string) => setMobileNo(text)}
                value={mobileNo}
              />

            </View>

            {numMsg ? <Text style={s`text-red-600`}>{numError}</Text> : ''}

            <View style={[s`flex flex-row rounded-md border-2 border-red-300 p-1 justify-around items-center`, styles.InputView]}>

              <Icon name='lock' color={'grey'} />
              <TextInput
                placeholder='Enter Your Password'
                placeholderTextColor={'black'}
                keyboardType='default'
                style={s`text-black`}
                // maxLength={11}
                secureTextEntry={true}
                onChangeText={(text: string) => setPassword(text)}
                value={weB_PASSWORD}

              />

            </View>



            {loading ? (
              <View style={s`bg-red-600 px-4`}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            ) : (

              <View style={s`w-36 mt-8`}>
                <Button
                  title="Login"
                  color="red"
                  accessibilityLabel="Learn more about this purple button"
                  onPress={handleLogin}
                  disabled={isButtonDisable()}
                />
              </View>

            )}

            <View style={s`w-36`}>
              <Button
                title="Registration"
                color="skyblue"
                accessibilityLabel="Learn more about this purple button"
                onPress={() => navigation.push('Registration')}
              />
            </View>
            {/* {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null} */}

          </View>

        </View>

        <View style={styles.Footer}>

          <Image source={FooterImg} />

        </View>

        {/*         
      <View style={styles.container}> */}
        {/* <Button onPress={onToggleSnackBar} title={visible ? 'Hide' : 'Show'} /> */}
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            // label: errorMsg === 'Number' ? 'Register' : 'Set Password',
            // onPress: () => {
            //   {
            //     errorMsg === 'Number' ? navigation.navigate('Registration') : navigation.navigate('PasswordGenerator')
            //   }
            // },
            label: 'Register',
            onPress: () => {
              {
                navigation.navigate('Registration')
              }
            },
          }}
        >
          {numError}
        </Snackbar>

        
        {/* <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        style={s`z-30`}
        >
        <View >
          <Text>Hogaya Kam</Text>
          <Text style={s`text-black`}>{testID?.test_code} 🎉</Text>
          <Text style={s`text-black`}>{testID?.test_short_name} 🎉</Text>
          <Text style={s`text-black`}>{testID?.test_description} 🎉</Text>
        </View>
      </BottomSheet> */}
      </GestureHandlerRootView>
    </View>

  );
}

const styles = StyleSheet.create({
  ScreenContainer: {

    flex: 1,
    backgroundColor: '#ffffff',

  },

  Header: {
    flex: 1,
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
    width: "60%"

  },

  Credentials: {
    color: 'black',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
  },

  InputBox: {
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },

  input: {
    borderWidth: 1,
    width: 250,
  },

  Footer: {

    alignItems: 'flex-end',
    zIndex: -1

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImg: {
    width: 250,
    height: 200,
  },
  //  input: {
  //     borderWidth: 1,
  //     width: 250,
  //     paddingLeft: 10,
  //     marginBottom: 10,
  //  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    width: 250,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  error: {

    display: 'flex',
    width: 60

  },
  errorMsg: {
    //  display : 'flex',
    //  flexWrap : 'wrap',
    color: 'red',
    marginTop: 10,
    //  width : 60,
  },
  footerImg: {
    width: 250,
    height: 150,
    position: 'absolute',
    bottom: 0,
  },
});
