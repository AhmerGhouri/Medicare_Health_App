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



type RegistrationProps = NativeStackScreenProps<RootStackParamList , "Registration">




export default function Registraion({ navigation } : RegistrationProps ) {

  // const navi = useNavigation<NativeStackScreenProps<RootStackParamList>>

  const [mobileNo, setMobileNo] = useState<string>()
  const [weB_PASSWORD, setPassword] = useState<string>()
  const [fullName, setFullName] = useState<string>()
  const [fatherName, setFatherName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const { onLogin, onRegister } = useAuth();
  const [openPicker, setOpenPicker] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [selectedId, setSelectedId] = useState<string | undefined>();
  let formattedDate = date.getDate() + '-' + date.toLocaleString("en-US", { month: 'short' }) + '-' + date.getFullYear();
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
  const currentDate = new Date()
  let currentDateformat = currentDate.getDate() + '-' + currentDate.toLocaleString("en-US", { month: 'short' }) + '-' + currentDate.getFullYear();
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

    console.log("User Reg Data Mobile", mobileNo);


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

      // const [acct, perm] = await Promise.all([getUserFromOPAT(), getUserFromREG()]);

      // OR
      // console.log("OPAT", acct.data);
      // console.log("REG", perm.data);


      return Promise.all([getUserFromOPAT(), getUserFromREG()])
        .then(function ([opat, reg]) {
          // ...
          const opat_data = opat.data
          const reg_data = reg.data

          console.log("acct", opat_data);
          console.log("perm", reg_data);

          if (reg_data !== null) {

            // if (reg_data.length > 1) {

            console.log("chalana paradha ga", reg_data.length);


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


            // }
            // setDate(reg_data[0].dob)
            // setFullName(opat_data[0].opaT_PNAME)
            console.log("Full Nam", fullName);


          } if (opat_data !== null) {




            if (opat_data.length > 1) {

              const getItem = () => {

                return opat_data.filter(item =>
                  item.weB_PASSWORD !== null).length > 0

              };

              const res = getItem()

              console.log("GET ITEM PASS", res);

              console.log("chalana paradha ga", opat_data.length);
              // opat_data.map((opat_user) => {

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
                console.log("Full Nam", fullName);


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

  console.log("mobile", mobileNo);
  console.log("fullName", fullName);
  console.log("fatherName", fatherName);
  console.log("weB_PASSWORD", weB_PASSWORD);
  console.log("selectedId", selectedId);
  console.log(" date_format", formattedDate);
  console.log("Type date_format", typeof formattedDate);


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

  // const onDismissSnackBar = () => setVisible(false);



  return (

    // <KeyboardAwareScrollView >


    <View
      style={[

        styles.ScreenContainer,

        {

          flexDirection: 'column',

        },

      ]}
    >

      <GestureHandlerRootView style={s`flex-1`}>

        <View style={styles.Header}>

          <Image source={HeaderImg} />

        </View>


        {/* <ScrollView scrollEnabled={false} style={s`flex-1 h-full`}> */}

        <View style={styles.Registration as StyleProp<ViewStyle>}>

          {/* Registration Heading */}
          <View style={s`my-6 w-full items-center`}>

            <Text style={s`font-bold text-2xl tracking-wider text-blue-800 italic`}>Registration</Text>
            {/* <Image source={Logo} 
                            width={20} height={20} /> */}

          </View>

          <View style={styles.InputBox}>

            {/* Mobile No Input Field */}
            <View style={s`flex-row w-full justify-center`}>

              <View style={[s`flex z-0 flex-row rounded-md border-2 p-1 border-blue-300 justify-around items-center`, styles.InputViewNum, error ? { borderColor: 'red' } : { borderColor: 'skyblue' }]}>

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
            {error ? <Text style={s`text-red-600 text-sm`}>{numError}</Text> : ''}
 
            {/*  Full Name Input Field */}
            <View style={[s`flex z-0 flex-row rounded-md border-2 border-blue-300 p-1 justify-around items-center`, styles.InputView]}>

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
            {errors?.nametype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.name}</Text> : null}

            {/* Father Name Input Field */}
            <View style={[s`flex z-0 flex-row rounded-md border-2 border-blue-300 p-1 justify-around items-center`, styles.InputView]}>

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
            {errors?.father_nametype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.father_name}</Text> : null}

            {/* Password Input Field */}
            <View style={[s`flex z-0 flex-row rounded-md border-2 border-blue-300 p-1 justify-around items-center`, styles.InputView]}>

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
            {errors?.passwordtype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.password}</Text> : null}

            {/* Gender Radio Buttons*/}
            <View pointerEvents={disableFields ? 'auto' : 'none'} style={[s`flex z-0 flex-row rounded-md border-2 border-blue-300 p-2 justify-around items-center`, styles.InputView]}>

              <View style={[s`items-center`, { width: '30%' }]}>
                <Icon name='restroom' color={'grey'} />
              </View>

              <View style={[s`items-left`, { width: '60%' }]}>
                <TouchableOpacity
                  style={s`flex-column`}
                  disabled={disableFields ? false : true}
                  onBlur={() => selectedId !== '' ? setErrors({ ...errors, gendertype: false }) : setErrors({ gendertype: true })}
                >

                  <RadioGroup
                    containerStyle={{
                      flexDirection: 'row',
                      borderColor: 'lightblue',
                      
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
            {errors?.gendertype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.gender}</Text> : null}

            {/* Date Of Birth Date Picker */}
            <View pointerEvents={disableFields ? 'auto' : 'none'} style={[s`flex z-0 flex-row rounded-md border-2 border-blue-300 p-1 justify-between items-center`, styles.InputView]}>


              <View style={[s`flex-row justify-around items-center `, { width: '25%' }]}>
                <Icon name='calendar-day' color={'grey'} />
                <Text style={s`text-grey-100`}>D.O.B</Text>
              </View>
  
              <TouchableOpacity style={[s`flex-row`, { width: '85%' }]} onPress={() => setOpen(true)}>
                <View style={[s`justify-right items-center pl-10`, { width: '80%' }]}>
                  <TextInput 
                    placeholderTextColor={'gray'}
                    style={s`text-black`}
                    value={dateOfBirth || formattedDate} />
                </View>
              </TouchableOpacity>

              <View style={[s` justify-center items-left`, { width: '30%' }]}>
                <Icon name='calendar' color={'grey'} />
                <DatePicker
                  open={open}
                  modal
                  textColor='red'
                  date={date} mode='date'
                  testID='dob'
                  onDateChange={setDate}
                  // editable={disableFields}
                  onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    // setErrors({ ...errors, dateOfBirthtype: false })
                    formattedDate === currentDateformat ? setErrors({ ...errors, dateOfBirthtype: true }) : setErrors({ ...errors, dateOfBirthtype: false })
                  }}
                  onCancel={() => setOpen(false)}
                />

              </View>

            </View>
            {errors?.dateOfBirthtype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.dateOfBirth}</Text> : null}

          </View>

          {/* Registration Button */}
          <View style={s`w-full justify-center items-center`}>
            
            {/* If loading is true  show a spinner instead of the button */}
            {loading ? 
              (
              <View style={s`bg-red-600 px-4 mt-8 w-36`}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
              ) 
              : 
              (

              <View style={s`w-36 mt-8`}>
                <Button
                  title="Register"
                  color="skyblue"
                  accessibilityLabel="Learn more about this purple button"
                  onPress={handleRegister}
                  disabled={isButtonDisable() || disableForEmpty()}
                />
              </View>

              )
            }

          </View>

        </View>


        {/* </ScrollView> */}
        <View style={styles.Footer}>

          <Image source={FooterImg} />

        </View>

      </GestureHandlerRootView>
    </View>
    //  </KeyboardAwareScrollView> 

  );
}

const styles = StyleSheet.create({
  ScreenContainer: {

    flex: 1,
    backgroundColor: '#ffffff',

  },

  Header: {
    //   flex: 1,
  },

  Registration: {

    color: 'black',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 28,

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
    width: Dimensions.get('screen').width <= 600 ? "80%" : "50%",

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
    width: Dimensions.get('screen').width <= 600 ? "80%" : "50%",

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
    justifyContent: 'center',
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
