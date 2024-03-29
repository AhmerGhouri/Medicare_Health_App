import {
  Image,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Button,
  Text,
  ActivityIndicator,
  Keyboard,
  TextInput,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6'
import HeaderImg from '../src/assets/Ellipse.png'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import FooterImg from '../src/assets/Footer.png'
import Logo from '../src/assets/MEDICARE.png'
import BottomSheet, { BottomSheetBackdrop, TouchableOpacity } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { api, useAuth } from '../components/authContext/AuthContext';
import { s } from 'react-native-wind';
import Entypo from 'react-native-vector-icons/Entypo'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { errors, regForm, titleMrMs, error } from '../constants';
import { titleMrMsData } from '../DummyData/LabTests';
import RadioGroup, { RadioButton, RadioButtonProps } from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-date-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Animated, { BounceInDown, FadeOut, ZoomIn } from 'react-native-reanimated';



type RegistrationProps = NativeStackScreenProps<RootStackParamList, "Registration">




export default function Registraion({ navigation }: RegistrationProps) {

  // const navi = useNavigation<NativeStackScreenProps<RootStackParamList>>

  const [mobileNo, setMobileNo] = useState<string>()
  const [weB_PASSWORD, setPassword] = useState<string>()
  const [fullName, setFullName] = useState<string>()
  const [fatherName, setFatherName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const { onRegister } = useAuth();
  const [title, setTitle] = useState<string>();
  const [date, setDate] = useState(new Date());
  const [selectedId, setSelectedId] = useState<string | undefined>();
  let formattedDate = date.getDate() + '-' + date.toLocaleString("en-US", { month: 'short' }) + '-' + date.getFullYear();
  const currentDate = new Date()
  let currentDateformat = currentDate.getDate() + '-' + currentDate.toLocaleString("en-US", { month: 'short' }) + '-' + currentDate.getFullYear();
  const [titleMrMs, setTitleMrMs] = useState<titleMrMs[]>(titleMrMsData);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false)
  const [errors, setErrors] = useState<errors>()
  const [errorMsg, setErrorMsg] = useState<error>({
    mobileno: 'Mobile Number is Required',
    password: "Password is Required",
    name: "Name is Required",
    father_name: "Father Name is Required",
    gender: "Gender is Required",
    dateOfBirth: "Date Of Birth is Required"
  });
  const [numError, setNumError] = useState<string>()
  const [disableFields, setDisableFields] = useState(true)
  const [dateOfBirth, setDateOfBirth] = useState()
  const radioButtons: RadioButtonProps[] = useMemo(() => ([
    {
      id: 'M', // acts as primary key, should be unique and non-empty string
      label: 'Male',
      value: 'male'
    },
    {
      id: 'F',
      label: 'Female',
      value: 'female'
    }
  ]), []);


  const OPAT_API: string = `https://local.jmc.edu.pk:82/api/Patients/GetPatientDataFromMob?mob=${mobileNo}`
  const REG_API: string = `https://local.jmc.edu.pk:82/api/UserRegData/GetUserRegData?mob=${mobileNo}`


  const userRegData = async () => {

    // let cancelToken;
    // cancelToken = axios.CancelToken.source()

    if (mobileNo?.trim() === '') {
      setError(true)
      setNumError("Mobile Number is Required")
    }
    else if (mobileNo!?.trim().length < 11) {

      setError(true)
      setNumError("Please Enter a valid number")

    } else {

      setError(false)
      setNumError("")

    }

    try {

      function getUserFromOPAT() {
        return axios.get(OPAT_API);
      }
      function getUserFromREG() {
        return axios.get(REG_API);
      }
      return Promise.all([getUserFromOPAT(), getUserFromREG()])
        .then(function ([opat, reg]) {
          // ...
          const opat_data = opat.data
          const reg_data = reg.data

          if (reg_data !== null) {

            // if (reg_data.length > 1) {

            reg_data.map((reg_user) => {

              if (reg_user.password !== null) {

                Alert.alert("Registered", 'You have Already Register, Kindly Login', [
                  {
                    text: 'Log In',
                    onPress: () => navigation.navigate('Login'),
                    style: 'cancel',
                  }]
                )
                setFullName(reg_user.pname)
                setFatherName(reg_user.fname)
                setPassword(reg_user.password)
                setSelectedId(reg_user.gender)
                setDateOfBirth(reg_user.dob)
                setDisableFields(false)

              } else {

                setDisableFields(true)
                setFullName(reg_user.pname)
                setFatherName(reg_user.fname)
                setPassword(reg_user.password)
                setDateOfBirth(reg_user.dob)
                setSelectedId(reg_user.gender)

              }
            })

          } if (opat_data !== null) {
            if (opat_data.length > 1) {

              const getItem = () => {

                return opat_data.filter(item =>
                  item.weB_PASSWORD !== null).length > 0

              };

              const res = getItem()

              if (res) {

                Alert.alert("Registered", 'You Already Register, Kindly Login', [
                  {
                    text: 'Log In',
                    onPress: () => navigation.navigate('Login'),
                    style: 'cancel',
                  }]
                )
                setDisableFields(false)
                setFullName(opat_data[0].opaT_PNAME)
                setPassword(opat_data[0].weB_PASSWORD)
                setSelectedId(opat_data[0].opaT_SEX)


              } else {

                setDisableFields(true)
                setFullName(opat_data[0].opaT_PNAME)
                setPassword(opat_data[0].weB_PASSWORD)
                setSelectedId(opat_data[0].opaT_SEX)
                // setSelectedId(opat_data[0].opaT_SEX)
                console.log("Full Nam", fullName);


              }


              // })


            }
          }

        })
        .catch(
          err => { console.log("Error", err) }
        )

    } catch (error) {

      console.log(error.response.data);


    }

  }

  const disableForEmpty = () => {

    return mobileNo === '' || fullName === '' || fatherName === '' || weB_PASSWORD === '' || selectedId === '' || formattedDate === currentDateformat || error

  }

  const isButtonDisable = () => {

    return mobileNo === undefined || fullName === undefined || fatherName === undefined || weB_PASSWORD === undefined || selectedId === undefined || formattedDate === currentDateformat || error

  }

  const Register = async () => {

    setLoading(true);



    try {

      const data = await axios.get(REG_API)

      const reg_data = data.data

      const getUserReg = reg_data.filter(mob => mob.mob === mobileNo).length > 0



      if (mobileNo == undefined && fullName == undefined && fatherName == undefined && email == undefined && weB_PASSWORD == undefined && selectedId == undefined && formattedDate === currentDateformat) {

        console.log("all Fields are Required");
        // Alert.alert("Required" , "All Fields are Required")
        setErrors({
          ...errors,
          mobiletype: true,
          passwordtype: true,
          nametype: true,
          gendertype: true,
          father_nametype: true,
          dateOfBirthtype: true
        })
        setErrorMsg({
          ...errorMsg,
          mobileno: 'Mobile Number is Required',
          password: "Password is Required",
          name: "Name is Required",
          father_name: "Father Name is Required",
          gender: "Gender is Required",
          dateOfBirth: "Date Of Birth is Required"

        })



      } else if (fullName == undefined && fatherName == undefined && email == undefined && weB_PASSWORD == undefined && selectedId == undefined && formattedDate === currentDateformat) {

        setErrors({
          ...errors,
          passwordtype: true,
          nametype: true,
          gendertype: true,
          father_nametype: true,
          dateOfBirthtype: true
        })
        setErrorMsg({
          ...errorMsg,
          password: "Password is Required",
          name: "Name is Required",
          father_name: "Father Name is Required",
          gender: "Gender is Required",
          dateOfBirth: "Date Of Birth is Required"

        })

      }
      else if (fatherName == undefined && email == undefined && weB_PASSWORD == undefined && selectedId == undefined && formattedDate === currentDateformat) {

        setErrors({
          ...errors,
          passwordtype: true,
          gendertype: true,
          father_nametype: true,
          dateOfBirthtype: true
        })
        setErrorMsg({
          ...errorMsg,
          password: "Password is Required",
          father_name: "Father Name is Required",
          gender: "Gender is Required",
          dateOfBirth: "Date Of Birth is Required"

        })

      }
      else if (weB_PASSWORD == undefined && selectedId == undefined && formattedDate === currentDateformat) {

        setErrors({
          ...errors,
          passwordtype: true,
          gendertype: true,
          dateOfBirthtype: true
        })
        setErrorMsg({
          ...errorMsg,
          password: "Password is Required",
          gender: "Gender is Required",
          dateOfBirth: "Date Of Birth is Required"

        })

      }
      else if (selectedId == undefined && formattedDate === currentDateformat) {

        setErrors({
          ...errors,
          gendertype: true,
          dateOfBirthtype: true
        })
        setErrorMsg({
          ...errorMsg,
          gender: "Gender is Required",
          dateOfBirth: "Date Of Birth is Required"

        })

      }
      else if (formattedDate === currentDateformat) {

        setErrors({
          ...errors,
          dateOfBirthtype: true
        })
        setErrorMsg({
          ...errorMsg,
          dateOfBirth: "Date Of Birth is Required"

        })

      }
      else if (selectedId == undefined) {

        setErrors({
          ...errors,
          gendertype: true,
        })
        setErrorMsg({
          ...errorMsg,
          gender: "Gender is Required",
        })

      }
      else if (mobileNo == undefined) {

        setErrors({
          ...errors,
          mobiletype: true
        })
        setErrorMsg({
          ...errorMsg,
          mobileno: 'Mobile Number is Required',

        })

      }
      else if (fullName == undefined) {

        setErrors({
          ...errors,
          nametype: true
        })
        setErrorMsg({
          ...errorMsg,
          name: "Name is required",
        })

      }
      else if (fatherName == undefined) {

        setErrors({
          ...errors,
          father_nametype: true
        })
        setErrorMsg({
          ...errorMsg,
          father_name: "father name is reuired",
        })

      }
      else if (weB_PASSWORD == undefined) {

        setErrors({
          ...errors,
          passwordtype: true
        })
        setErrorMsg({
          ...errorMsg,
          password: "Password is required",
        })

      } else if (getUserReg) {

        Alert.alert("Registered", "You are already Registered")

      } else {

        setErrors({
          ...errors,
          mobiletype: false,
          passwordtype: false,
          nametype: false,
          father_nametype: false,
          gendertype: false,
          dateOfBirthtype: false

        })
        setErrorMsg({
          mobileno: '',
          password: "",
          name: "",
          father_name: "",
          gender: "",
          dateOfBirth: ""

        })
        const result = await onRegister!(mobileNo!, weB_PASSWORD!, title!, email, fullName, fatherName, selectedId, formattedDate);
        console.log("registration result", result)
        console.log(" result", result.status)


        if (result.status === 200) {

          Alert.alert("Successful", "You have been Registered Successfully", [
            {
              text: 'Log In',
              onPress: () => navigation.navigate('Login'),
              style: 'cancel',
            }])

        } else {

          Alert.alert("Error", "Something went wrong, Please try again")

        }
        // setLoading(true);
        // OnRegister()
        // setLoading(false);



      }


    } catch (error) {

      setNumError('Something went wrong, please try again later');

    } finally {

      setLoading(false);
    }

  };

  const handleRegister = () => {



    Register()


  }

  const setDateError = (date) => {

    setDate(date)

    formattedDate === currentDateformat ? setErrors({ ...errors, dateOfBirthtype: true })
      :
      setErrors({ ...errors, dateOfBirthtype: false })

    setOpen(false)

    console.log('confirm', errors?.dateOfBirthtype);


  }

  return (

    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      scrollEnabled={Dimensions.get('window').height < 804 ? true : false}>
      <View style={[styles.ScreenContainer, {flexDirection: 'column'}]}>
        <GestureHandlerRootView style={s`flex-1`}>

          <View>
            <Header />
          </View>

          <View style={styles.Registration as StyleProp<ViewStyle>}>

            {/* Registration Heading */}
            <View style={s`my-6 w-full items-center`}>
              <Animated.View style={s`flex`} entering={ZoomIn.duration(1600)} exiting={FadeOut} >
                <Text style={s`font-bold text-2xl tracking-wider text-blue-800 italic`}>Registration</Text>
              </Animated.View>
            </View>

            <View style={styles.InputBox}>

              {/* Mobile No Input Field */}
              <Animated.View style={s`flex`} entering={BounceInDown.duration(1000)} exiting={FadeOut} >
                <View style={s`flex w-full justify-center`}>

                  <View style={[s`flex z-0 flex-row rounded-md  p-0 border-blue-300 justify-around items-center`, styles.InputViewNum, error ? { borderColor: 'red' } : { borderColor: 'skyblue' }]}>

                    <View style={[s`items-center`, { width: '30%' }]}>
                      <Icon name='phone' color={'grey'} />
                    </View>
                    <View style={[s`items-left`, { width: '60%' }]}>
                      <TextInput
                        placeholder='Enter Your Mobile No'
                        keyboardType='numeric'
                        // style={s`text-left`}
                        placeholderTextColor={'gray'}
                        style={s`text-black`}
                        testID="MobileNo"
                        maxLength={11}
                        onBlur={() => {
                          userRegData()
                          // mobileNo !== '' ? setErrors({ ...errors, mobiletype: false }) : setErrors({ ...errors, mobiletype: true })
                        }}
                        onChangeText={(text: string) => setMobileNo(text)}
                        value={mobileNo!}
                        returnKeyType='done'
                      />
                    </View>

                  </View>

                </View>
              </Animated.View>
              {error ? <Text style={s`text-red-600 text-sm`}>{numError}</Text> : ''}

              {/*  Full Name Input Field */}
              <Animated.View style={s`flex`} entering={BounceInDown.duration(1200)} exiting={FadeOut} >
                <View style={[s`flex z-0 flex-row rounded-md  border-blue-300 p-0 justify-around items-center`, styles.InputView]}>

                  <View style={[s`items-center`, { width: '30%' }]}>
                    <Icon name='address-card' color={'grey'} />
                  </View>

                  <View style={[s`items-left`, { width: '60%' }]}>
                    <TextInput
                      placeholder='Enter Your Full Name'
                      testID="FullName"
                      placeholderTextColor={'gray'}
                      style={s`text-black`}
                      onBlur={() => fullName === '' ? setErrors({ ...errors, nametype: true }) : setErrors({ nametype: false })}
                      keyboardType='name-phone-pad'
                      onChangeText={(text: string) => setFullName(text)}
                      editable={disableFields}
                      value={fullName}
                    />
                  </View>

                </View>
              </Animated.View>
              {errors?.nametype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.name}</Text> : null}

              {/* Father Name Input Field */}
              <Animated.View style={s`flex`} entering={BounceInDown.duration(1400)} exiting={FadeOut} >
                <View style={[s`flex z-0 flex-row rounded-md  border-blue-300 p-0 justify-around items-center`, styles.InputView]}>

                  <View style={[s`items-center`, { width: '30%' }]}>
                    <Material name='human-male-child' color={'grey'} />
                  </View>
                  <View style={[s`items-left`, { width: '60%' }]}>
                    <TextInput
                      placeholder='Enter Your Father Name'
                      keyboardType='default'
                      testID="FatherName"
                      placeholderTextColor={'gray'}
                      style={s`text-black`}
                      onBlur={() => fatherName !== '' ? setErrors({ ...errors, father_nametype: false }) : setErrors({ father_nametype: true })}
                      onChangeText={(text: string) => setFatherName(text)}
                      editable={disableFields}
                      value={fatherName}
                    />
                  </View>
                </View>
              </Animated.View>
              {errors?.father_nametype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.father_name}</Text> : null}

              {/* Password Input Field */}
              <Animated.View style={s`flex`} entering={BounceInDown.duration(1600)} exiting={FadeOut} >
                <View style={[s`flex z-0 flex-row rounded-md  border-blue-300 p-0 justify-around items-center`, styles.InputView]}>

                  <View style={[s`items-center`, { width: '30%' }]}>
                    <Entypo name='lock' color={'grey'} />
                  </View>
                  <View style={[s`items-left`, { width: '60%' }]}>
                    <TextInput
                      placeholder='Enter Your Password'
                      keyboardType='default'
                      testID='Password'
                      placeholderTextColor={'gray'}
                      style={s`text-black`}
                      secureTextEntry={true}
                      // onBlur={() => weB_PASSWORD !== '' ? setErrors({ ...errors, passwordtype: false }) : setErrors({ passwordtype: true })}
                      editable={disableFields}
                      onChangeText={(text: string) => setPassword(text)}
                      value={weB_PASSWORD}
                    />
                  </View>

                </View>
              </Animated.View>
              {errors?.passwordtype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.password}</Text> : null}

              {/* Gender Radio Buttons*/}
              <Animated.View style={s`flex`} entering={BounceInDown.duration(1800)} exiting={FadeOut} >
                <View pointerEvents={disableFields ? 'auto' : 'none'} style={[s`flex z-0 flex-row rounded-md  border-blue-300 p-0 justify-around items-center`, styles.InputView]}>

                  <View style={[s`items-center`, { width: '30%' }]}>
                    <Icon name='restroom' color={'grey'} />
                  </View>

                  <View style={[s`items-left`, { width: '60%' }]}>
                    <TouchableOpacity
                      style={s`flex-column text-black`}
                      disabled={disableFields ? false : true}
                      onBlur={() => selectedId !== '' ? setErrors({ ...errors, gendertype: false }) : setErrors({ gendertype: true })}
                    >

                      <RadioGroup
                        containerStyle={{
                          flexDirection: 'row',
                          borderColor: 'lightblue',
                          height: 40,
                        }}
                        accessibilityLabel='blue'
                        radioButtons={radioButtons}
                        // editable={disableFields}
                        onPress={setSelectedId}
                        testID='Radio'
                        selectedId={selectedId}

                      />

                    </TouchableOpacity>
                  </View>

                </View>
              </Animated.View>
              {errors?.gendertype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.gender}</Text> : null}

              {/* Date Of Birth Date Picker */}
              <Animated.View style={s`flex`} entering={BounceInDown.duration(1000)} exiting={FadeOut} >
                <View pointerEvents={disableFields ? 'auto' : 'none'} style={[s`z-0 flex-row rounded-md border-blue-300 p-0 justify-between items-center`, styles.InputViewDOB]}>

                  <View style={[s`flex-row justify-around items-center`, { width: '30%' }]}>
                    <Icon name='calendar-day' color={'grey'} />
                    <Text style={s`text-grey-100`}>D.O.B</Text>
                  </View>

                  <TouchableOpacity style={[s`flex-row `, { width: '85%' }]} onPress={() => setOpen(true)}>
                    <View style={[s`justify-right items-center `, { width: '75%' }]}>
                      <TextInput
                        placeholderTextColor={'gray'}
                        style={s`text-black`}
                        value={dateOfBirth || formattedDate} />
                    </View>

                    <View style={[s` justify-center items-center`, { width: '30%' }]}>
                      <Icon name='calendar' color={'grey'} />
                      <DatePicker
                        open={open}
                        modal
                        textColor='red'
                        date={date} mode='date'
                        testID='dob'
                        onDateChange={setDate}
                        onConfirm={(date) => {
                          setDateError(date)
                        }}
                        onCancel={() => setOpen(false)}
                      />

                    </View>
                  </TouchableOpacity>

                </View>
                {/* {errors?.dateOfBirthtype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.dateOfBirth}</Text> : null} */}
              </Animated.View>
            </View>

            {/* Registration Button */}
            <View style={s`w-full justify-center items-center`}>

              {/* If loading is true  show a spinner instead of the button */}
              <Animated.View style={s`flex`} entering={BounceInDown.duration(1600)} exiting={FadeOut} >
                {loading ?
                  (
                    <View style={s`bg-red-600 px-4 mt-8 w-36`}>
                      <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                  )
                  :
                  (
                    <View style={s`w-36 mt-8`}>
                      <TouchableOpacity
                        disabled={isButtonDisable() || disableForEmpty()}
                        onPress={handleRegister}
                        style={[s`rounded p-2  items-center`,
                        { paddingHorizontal: Dimensions.get('window').height < 804 ? 16 : 20, backgroundColor: isButtonDisable() || disableForEmpty() ? 'lightgray' : '#313594', elevation: 10, width: '100%' }]}>
                        <Text style={[s`font-bold italic`, { color: 'white', fontSize: Dimensions.get('window').height < 804 ? 12 : 16 }]}>
                          Register
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                }
              </Animated.View>

            </View>

          </View>

          <View>
            <Footer />
          </View>

        </GestureHandlerRootView>
      </View>
    </KeyboardAwareScrollView>

  );
}

const styles = StyleSheet.create({
  ScreenContainer: {

    flex: 1,
    backgroundColor: '#ffffff',

  },
  Header: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 8,
    justifyContent: "flex-start"
  },
  Registration: {
    color: 'black',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // gap: 28,
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
    width: Dimensions.get('screen').width <= 600 ? "85%" : "50%",
  },
  InputViewNum: {
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowRadius: 50,
    shadowOffset: {
      width: 10,
      height: 50,
    },
    shadowOpacity: 1,
    elevation: 15,
    width: Dimensions.get('screen').width <= 600 ? "85%" : "50%",
  },
  InputViewDOB: {
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowRadius: 50,
    shadowOffset: {
      width: 10,
      height: 50,
    },
    shadowOpacity: 1,
    elevation: 15,
    width: Dimensions.get('screen').width <= 600 ? "74%" : "50%",
  },
  // InputViewMr : {

  //     width : '22%',
  //     shadowColor : 'black',
  //     backgroundColor : 'white',
  //     shadowRadius : 50,
  //     shadowOffset : {
  //       width : 10 ,
  //       height : 50,
  //     },
  //     shadowOpacity : 1,
  //     elevation : 15

  // },
  InputBox: {
    gap: 14,
    // justifyContent: 'center',
    width: '100%',
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
    color: 'red',
    marginTop: 10,
  },
  footerImg: {
    width: 250,
    height: 150,
    position: 'absolute',
    bottom: 0,
  },
});
