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
  Dimensions,
  Alert,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Logo from '../src/assets/MEDICARE.png'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, TouchableOpacity } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { useAuth } from '../components/authContext/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App';
import Icon from 'react-native-vector-icons/FontAwesome6'
import { s } from 'react-native-wind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import { useAppDispatch } from '../app/hooks/hooks';
import { addUserToStore } from '../app/slices/userSlice';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Animated, { BounceInDown, FadeOut } from 'react-native-reanimated';





type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login', 'Registration'>



export default function LoginScreen({ navigation }: LoginProps) {


  const [mobileNo, setMobileNo] = useState('')
  const [weB_PASSWORD, setPassword] = useState('')
  const { onLogin } = useAuth()
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch()
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
  const [showPassword, setShowPassword] = useState<boolean>(true)


  const showhidePass = () => {

    setShowPassword(!showPassword)

  }

  // This Excutes when mobile Number entering
  // This Method fetch Data from User Registration Table
  const fetchRegData = async () => {

    try {
      const baseURL = `https://local.jmc.edu.pk:82/api/UserRegData/GetUserRegData?mob=${mobileNo}`;
      const response = await axios.get(baseURL);
      setErrorMsg('');
      setUserData(response.data)
      if (response.status !== 200) {
        Alert.alert("Error", "Something Went Wrong");
      } else {
        setErrorMsg('No user found with this mobile number');
      }
    } catch (error) {
      setErrorMsg('Something went wrong, please try again later');
    }

  }

  // Send Parameters Mobile & Password to AUTHSTATE.ts for Authentication
  // This Excutes when Login Button Press
  const login = async () => {
    setLoading(true);
    try {

      const result = await onLogin!(mobileNo, weB_PASSWORD);
      const user = result.data[0]
      dispatch(addUserToStore(user))

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

  const handleLogin = async () => {

    Keyboard.dismiss();
    const data = await userData

    if (data.length !== 0) {

      login()

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

      style={[styles.ScreenContainer, { flexDirection: 'column' }]}>

      <GestureHandlerRootView style={s`flex-1`}>

        <View>

          <Header />

        </View>

        <View style={styles.Credentials as StyleProp<ViewStyle>}>

          <Animated.View style={s`flex`} entering={BounceInDown.duration(1000)} exiting={FadeOut} >
            <View style={s`my-8`}>

              {/* <Image source={Logo}
              width={10} height={10} /> */}
              <Image source={Logo} style={{ width: Dimensions.get('window').height < 804 ? 150 : 180, height: Dimensions.get('window').height <= 804 ? 70 : 70 }}
              />

            </View>
          </Animated.View>

          <View style={styles.InputBox}>

            <Animated.View style={s`flex`} entering={BounceInDown.duration(1300)} exiting={FadeOut} >
              <View style={[s`flex flex-row rounded-md border-red-300 p-1 justify-around items-center`, styles.InputView]}>

                <View style={[s`items-center`, { width: '15%' }]}>
                  <Icon name='phone' color={'grey'} size={Dimensions.get('window').height < 804 ? 12 : 14} />
                </View>

                <View style={[{ width: '85%', alignItems: 'center' }]}>

                  <TextInput
                    onBlur={handleInput}
                    placeholderTextColor={'black'}
                    placeholder='Enter Your Mobile Number'
                    keyboardType='numeric'
                    style={[s`text-black`, { fontSize: Dimensions.get('window').height < 804 ? 12 : 14 }]}
                    maxLength={11}
                    onChangeText={(text: string) => setMobileNo(text)}
                    value={mobileNo}
                  />

                </View>

              </View>
            </Animated.View>

            {numMsg ? <Text style={[s`text-red-600`, { fontSize: Dimensions.get('window').height < 804 ? 10 : 14 }]}>{numError}</Text> : ''}
            <Animated.View style={s`flex`} entering={BounceInDown.duration(1600)} exiting={FadeOut} >
              <View style={[s`flex flex-row rounded-md  justify-around border-red-300 p-1 items-center`, styles.InputView]}>

                <View style={[s`items-center`, { width: '15%' }]}>
                  <Icon name='lock' color={'grey'} size={Dimensions.get('window').height < 804 ? 12 : 14} />
                </View>
                <View style={[{ width: '65%', alignItems: 'center', paddingLeft: '12%' }]}>
                  <TextInput
                    placeholder='Enter Your Password'
                    placeholderTextColor={'black'}
                    style={[s`text-black `, { fontSize: Dimensions.get('window').height < 804 ? 12 : 14 }]}
                    keyboardType='default'
                    secureTextEntry={showPassword}
                    onChangeText={(text: string) => setPassword(text)}
                    value={weB_PASSWORD}
                  />
                </View>
                <View style={[{ width: '20%', alignItems: 'center' }]}>
                  <Icon name={showPassword ? 'eye-slash' : 'eye'} color={'grey'} onPress={showhidePass} size={Dimensions.get('window').height < 804 ? 12 : 16} />
                </View>

              </View>
            </Animated.View>
            <Animated.View style={s`flex`} entering={BounceInDown.duration(1800)} exiting={FadeOut} >

              {loading ?
                (
                    <View style={[s`mt-8 rounded px-6 py-0` , {elevation : 10 , backgroundColor : 'red'}]}>
                      <ActivityIndicator size="large" color="white" />
                    </View>
                ) : (
                  <View style={[s`mt-8`, { width: "100%" }]}>

                    <TouchableOpacity disabled={isButtonDisable()} onPress={handleLogin} style={[s`rounded p-2  `, { paddingHorizontal: Dimensions.get('window').height < 804 ? 16 : 30, backgroundColor: isButtonDisable() ? 'lightgray' : 'red', elevation: 10, width: '100%' }]}>
                      <Text style={[s`font-bold italic`, { color: 'white', fontSize: Dimensions.get('window').height < 804 ? 12 : 16 }]}>
                        Login
                      </Text>
                    </TouchableOpacity>

                    {/* <Button
                    title="Login"
                    color="red"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={handleLogin}
                    disabled={isButtonDisable()}
                  /> */}
                  </View>
                )
              }
            </Animated.View>

            <Animated.View style={s`flex`} entering={BounceInDown.duration(2000)} exiting={FadeOut} >

              <View style={s`w-36`}>
                <TouchableOpacity onPress={() => navigation.push('Registration')} style={[s`rounded p-2  items-center`, { paddingHorizontal: Dimensions.get('window').height < 804 ? 16 : 20, backgroundColor: '#313594', elevation: 10, width: '100%' }]}>
                  <Text style={[s`font-bold italic`, { color: 'white', fontSize: Dimensions.get('window').height < 804 ? 12 : 16 }]}>
                    Registration
                  </Text>
                </TouchableOpacity>

              </View>
              </Animated.View>

            {/* <Button
                title="Registration"
                color="skyblue"
                accessibilityLabel="Learn more about this purple button"
                onPress={() => navigation.push('Registration')}
              /> */}
            {/* {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null} */}

          </View>

        </View>

        <View>

          <Footer />

        </View>


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


      </GestureHandlerRootView>
    </View>

  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  InputView: {
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowRadius: 50,
    shadowOffset: {
      width: 10,
      height: 50,
    },
    padding: Dimensions.get("window").height <= 804 ? 0 : 6,
    shadowOpacity: 1,
    elevation: 15,
    width: Dimensions.get("window").height <= 804 ? "80%" : "80%"
  },
  Credentials: {
    color: 'black',
    flex: 1,
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
