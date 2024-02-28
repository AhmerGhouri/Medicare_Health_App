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
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
import { borderStyles } from 'react-native-wind/dist/styles/view/border-style';
import Foundation from 'react-native-vector-icons/Foundation'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';




type MRProps = NativeStackScreenProps<RootStackParamList , "MRScreen">




export default function MRCreateScreen({ navigation , route } : MRProps) {


  const { user } = route.params

  console.log("MR user", user);

  const [mobileNo, setMobileNo] = useState<string>()
  const [weB_PASSWORD, setPassword] = useState<string>()
  const [fullName, setFullName] = useState<string>()
  const [fatherName, setFatherName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const { onMrCreation } = useAuth();
  const [title, setTitle] = useState<string>();
  const [date, setDate] = useState(new Date());
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const date_to_string = date.toLocaleDateString('en-UK', { day: '2-digit', month: 'short', year: 'numeric' })
  const date_string = date_to_string.toString()
  const mr_reg_date = new Date()
  let mr_formattedDate = mr_reg_date.getDate() + '-' + mr_reg_date.toLocaleString("en-US", { month: 'short' }) + '-' + mr_reg_date.getFullYear();
  const [mrNumber, setMrNumber] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false)
  const [errors, setErrors] = useState<errors>()
  const [emailErr, setEmailErr] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<error>({
    mobileno: 'Mobile Number is Required',
    password: "Password is Required",
    name: "Name is Required",
    father_name: "Father Name is Required",
    gender: "Gender is Required",
    dateOfBirth: "Date Of Birth is Required"

  });
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const [numError, setNumError] = useState<string>()
  const [disableFields, setDisableFields] = useState(true)
  const [dateOfBirth, setDateOfBirth] = useState()
  const currentDate = new Date().toLocaleDateString('en-UK', { day: '2-digit', month: 'short', year: 'numeric' })
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



  const MR_API: string = `https://local.jmc.edu.pk:82/api/Patients/GetMaxOpatId`

  console.log("ID", selectedId);



  const OnMrNumber = async () => {


    try {


      const response = await axios.get(MR_API)

      const mr_data = response.data

      console.log("mr data", mr_data[0].opaT_ID);

      setMrNumber(mr_data[0].opaT_ID)


    } catch (err) {

      console.log("Mr Error", err)

    }


  }

  useEffect(() => {

    OnMrNumber()
    if (selectedId === 'M') {
      setTitle('MR')
    } else {
      setTitle('MISS')
    }

  }, [])

  const disableForEmpty = () => {

    return fullName === '' || fatherName === '' || selectedId === '' || date_string === currentDate || error

  }


  const isButtonDisable = () => {

    return fullName === undefined || fatherName === undefined || selectedId === undefined || date_string === currentDate || error

  }


  const validateEmail = () => {

    if (reg.test(email!) === false) {


      setEmailErr('Please Enter a valid email')
      setError(true)


    }
    else {
      setEmail(email)
      setEmailErr('')
      setError(false)
    }
  }


  const MrCreation = async () => {

    setLoading(true);



    try {


      if (fullName == undefined && fatherName == undefined && selectedId == undefined && date_string === currentDate) {

        console.log("all Fields are Required");
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
          name: "Name is Required",
          father_name: "Father Name is Required",
          gender: "Gender is Required",
          dateOfBirth: "Date Of Birth is Required"

        })



      } else if (fullName == undefined && fatherName == undefined && selectedId == undefined && date_string === currentDate) {

        setErrors({
          ...errors,
          nametype: true,
          gendertype: true,
          father_nametype: true,
          dateOfBirthtype: true
        })
        setErrorMsg({
          ...errorMsg,
          name: "Name is Required",
          father_name: "Father Name is Required",
          gender: "Gender is Required",
          dateOfBirth: "Date Of Birth is Required"

        })

      }
      else if (fatherName == undefined && email == undefined && selectedId == undefined && date_string === currentDate) {

        setErrors({
          ...errors,
          gendertype: true,
          father_nametype: true,
          dateOfBirthtype: true
        })
        setErrorMsg({
          ...errorMsg,
          father_name: "Father Name is Required",
          gender: "Gender is Required",
          dateOfBirth: "Date Of Birth is Required"

        })

      }
      else if (selectedId == undefined && date_string === currentDate) {

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
      else if (selectedId == undefined && date_string === currentDate) {

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
      else if (date_string === currentDate) {

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


    } catch (error) {

      setNumError('Something went wrong, please try again later');

    } finally {

      setLoading(false);
    }

  };


  const handleMrCreation = () => {

    MrCreation()
    try {


      onMrCreation!(mrNumber!, fullName!, mobileNo!, email, weB_PASSWORD, "1", "1", "KHI", mr_formattedDate, null, selectedId, title, null)


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


    }


  }

  console.log("MR mobile", mobileNo);
  console.log("MR fullName", fullName);
  console.log("MR fatherName", fatherName);
  console.log("MR weB_PASSWORD", weB_PASSWORD);
  console.log("MR email", email);
  console.log("MR selectedId", selectedId);
  console.log("MR date_string", date_string);


  return (

    // <KeyboardAwareScrollView>

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



        <View style={styles.Registration as StyleProp<ViewStyle>}>

            {/* MR Heading */}
          <View style={s`my-6 w-full items-center`}>

            <Text style={s`font-bold text-2xl tracking-wider text-blue-800 italic`}>MR Number</Text>

          </View>


          <View style={styles.InputBox}>

            {/* MR Number & Mobile Number Input Fields */}
            <View style={s`flex-row w-full justify-center`}>

              <View style={[s`flex z-30 flex-row rounded-md mr-2 border-2 p-1 border-blue-300 justify-around items-center`, styles.InputViewMr]}>

                <View style={[s`items-center`, { width: '30%' }]}>
                  <Foundation style={s``} name='torsos-male-female' color={'grey'} />
                </View>

                <View style={[s`items-left`, { width: '60%' }]}>
                  <TextInput
                    placeholder='Mr #'
                    placeholderTextColor={'gray'}
                    style={s`text-gray-400`}
                    keyboardType='default'
                    editable={false}
                    value={mrNumber?.toString()}
                  />
                </View>

              </View>

              <View style={[s`flex z-0 flex-row rounded-md border-2 p-1 border-blue-300 justify-around items-center`, styles.InputViewNum]}>


                <View style={[s`items-center`, { width: '30%' }]}>
                  <Icon name='phone' color={'grey'} />
                </View>

                <View style={[s`items-left`, { width: '60%' }]}>
                  <TextInput
                    placeholder='Your Mobile No'
                    keyboardType='numeric'
                    editable={false}
                    placeholderTextColor={'gray'}
                    style={s`text-gray-400`}
                    testID="MobileNo"
                    maxLength={11}
                    value={user.mob}
                    returnKeyType='done'
                  />
                </View>

              </View>


            </View>

            {/* Email Input Field */}
            <View style={[s`flex z-0 flex-row rounded-md border-2 border-blue-300 p-1 justify-around items-center`, styles.InputView]}>


              <View style={[s`items-center`, { width: '30%' }]}>
                <Entypo name='email' color={'grey'} />
              </View>

              <View style={[s`items-left`, { width: '60%' }]}>
                <TextInput
                  placeholder='Enter Your email address'
                  keyboardType='default'
                  testID='email'
                  placeholderTextColor={'gray'}
                  style={s`text-black`}
                  secureTextEntry={false}
                  editable={disableFields}
                  onBlur={validateEmail}
                  onChangeText={(text: string) => setEmail(text)}
                  value={weB_PASSWORD}
                />
              </View>

            </View>
            {error ? <Text style={s`text-red-600 text-sm`}>{emailErr}</Text> : null}

            {/* Full Name Input Field */}
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
                  placeholderTextColor={'gray'}
                  style={s`text-black`}
                  testID="FatherName"
                  onBlur={() => fatherName !== '' ? setErrors({ ...errors, father_nametype: false }) : setErrors({ father_nametype: true })}
                  onChangeText={(text: string) => setFatherName(text)}
                  editable={disableFields}
                  value={fatherName}
                />
              </View>

            </View>
            {errors?.father_nametype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.father_name}</Text> : null}

            {/* Gender Radio Button */}
            <View pointerEvents={disableFields ? 'auto' : 'none'} style={[s`flex z-0 flex-row rounded-md border-2 border-blue-300 p-1 justify-around items-center`, styles.InputView]}>

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
                      borderColor: 'lightblue'
                    }}
                    accessibilityLabel='blue'
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    testID='Radio'
                    selectedId={selectedId}

                  />

                </TouchableOpacity>

              </View>

            </View>
            {errors?.gendertype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.gender}</Text> : null}

            {/* Date Of Birth Input Field */}
            <View pointerEvents={disableFields ? 'auto' : 'none'} style={[s`flex z-0 flex-row rounded-md border-2 border-blue-300 p-1 justify-between items-center`, styles.InputView]}>

              <View style={[s`flex-row justify-around items-center `, { width: '25%' }]}>
                <Icon name='calendar-day' color={'grey'} />
                <Text>D.O.B</Text>
              </View>

              <TouchableOpacity style={[s`flex-row`, { width: '85%' }]} onPress={() => setOpen(true)}>
                <View style={[s`justify-right items-center pl-10`, { width: '80%' }]}>
                  <TextInput
                    placeholderTextColor={'gray'}
                    style={s`text-black`}
                    value={dateOfBirth || date_to_string} />
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
                  maximumDate={new Date()}
                  // editable={disableFields}
                  onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    // setErrors({ ...errors, dateOfBirthtype: false })
                    date_to_string === currentDate ? setErrors({ ...errors, dateOfBirthtype: true }) : setErrors({ ...errors, dateOfBirthtype: false })
                  }}
                  onCancel={() => setOpen(false)}
                />

              </View>


            </View>
            {errors?.dateOfBirthtype ? <Text style={s`text-red-600 text-sm`}>{errorMsg!.dateOfBirth}</Text> : null}

          </View>

          {/* MR Create Button */}
          <View style={s`w-full justify-center items-center`}>

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
                    title="Create"
                    color="skyblue"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={handleMrCreation}
                    disabled={isButtonDisable() || disableForEmpty()}
                  />
                </View>

              )
            }

          </View>

        </View>

        <View style={styles.Footer}>

          <Image source={FooterImg} />

        </View>


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
    width: "75%"

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
    width: '50%'

  },
  InputViewMr: {

    width: '25%',
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowRadius: 50,
    shadowOffset: {
      width: 10,
      height: 50,
    },
    shadowOpacity: 1,
    elevation: 15

  },
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
