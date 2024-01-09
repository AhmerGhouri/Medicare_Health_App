import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  StyleProp,
  ViewStyle,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {TextInput, Icon} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HeaderImg from '../src/assets/Ellipse.png'
import FooterImg from '../src/assets/Footer.png'
import Logo from '../src/assets/MEDICARE.png'
import axios from 'axios';
import { api, useAuth } from '../components/authContext/AuthContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../App';
import { data } from 'autoprefixer';
import { s } from 'react-native-wind';





type LoginProps = NativeStackScreenProps<RootStackParamList , 'Login'>



export default function LoginScreen({navigation}  :  LoginProps) {

  
  
  // const [ opaT_PNAME , setMobileNo] = useState('')
  const [ mobileNo , setMobileNo] = useState('')
  const [weB_PASSWORD , setPassword] = useState('')
  const {onLogin , onRegister} = useAuth()
  const [userData , setUserData] = useState()
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const baseURL = `https://local.jmc.edu.pk:82/api/Patients/GetPatientDataFromMob?mob=${mobileNo}`
  
  
  

  const fetchData = async () => {
    try {
      const baseURL = `https://local.jmc.edu.pk:82/api/Patients/GetPatientDataFromMob?mob=${mobileNo}`;
      const response = await axios.get(baseURL);
      setErrorMsg('');
      if (response.status !== 200) {
        console.log("Something Went Wrong");
      } else {
        setErrorMsg('No user found with this mobile number');
      }

      // axios({
      //   method : 'GET',
      //   baseURL : `${api}${mobileNo}`
      // })
      // .then((response) => {

      //   const data = response.data
        
      //   const getItem = (arr, toFind) => {

      //   const {Password} = toFind;

      //     return data.filter(item =>
      //       item.weB_PASSWORD === Password).length > 0
      //     };

      //   const res = getItem(data,{"Password": weB_PASSWORD})

      //   const abc = async () => {
        
      //     if (res) {
        
      //     // Set authentication 
      //     setAuth({
          
      //       token : response.data.token,
      //       authenticated : true

      //     })

      //     console.log("abc", response.data);
        
      //     // Set Authorization Token

      //     axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        
      //     await AsyncStorage.setItem(KEY , 'abc')
          
      //     return response
      
      //   }
      //   else{

      //     alert('Invalid Credentials');
        

      //   }
        
      // }

      // abc()


    } catch (error) {
      setErrorMsg('Something went wrong, please try again later');
    }
 };


  const login = async () => {

    setLoading(true);
    try {
      const result = await onLogin!(mobileNo, weB_PASSWORD);
      if (result && result.error) {
        setErrorMsg(result.msg);
      } else {
        setErrorMsg('');
        // navigation.replace('Home');
      }
    }   catch (error) {
      setErrorMsg('Something went wrong, please try again later');
    }   finally {
      setLoading(false);
    }
  
  };

  useEffect(() => {
  
    fetchData();
  
  }, [mobileNo]);


  const isButtonDisable = () => {

    return weB_PASSWORD === '' || mobileNo.trim() === ''

  }

  
  
  
  
  
    // const login = async () => {
              
    //   const result = await onLogin!(mobileNo , weB_PASSWORD)
      
      
    //   if(result && result.error){
        
    //     alert(result.msg)
        
    //   }
      
    // }
    




    // const API_URL : string = 'https://local.jmc.edu.pk:82/api/Patients/GetPatientDataFromMob?mob=03161122573'
   
    
    // const handleSubmit = async () => {

      
    //   const url = `${API_URL}`;
      
    //   const response = await axios.get(url);
    //   if (response.status === 200){

    //     const result = response.data
    //     console.log("res" , result)

    //     for (let i = 0; i < result.length; i++) {
    //       const element = result[i];

    //       if(text === element.opaT_ID){

    //         console.log("text" , text);
    //         console.log("Opat" , element.opaT_ID);
            
    //         navigation.replace('MyTabs')
            
            
            
    //       }else{
            
    //         console.log("Opat" , element.opaT_ID);
    //         console.log("text" , text);
    //         Alert.alert("Please Enter A Valid Mr #")

    //       }
          
          
    //     }
        
      
    //   }
    

    //   console.log(response)

   

    // }
    

    return (
  
      <View
      
        style={[
      
            styles.ScreenContainer,
      
            {
      
                flexDirection: 'column',
      
            },
      
        ]}>
      
        <View style={styles.Header}>
        
            <Image source={HeaderImg} />
      
        </View>

      
        <View style={styles.Credentials as StyleProp<ViewStyle>}>
        
            <View>
              
              <Image source={Logo} 
                width={10} height={10} />
                
            </View>

            <View style={styles.InputBox}>
                
                {/* <TextInput
                    style={styles.input}
                    onChangeText={(text : string) => setMobileNo(text)} 
                    value={opaT_PNAME}
                    placeholder="Enter Your Mobile #"
                    keyboardType="default"
                    maxLength={20}
                    left={<TextInput.Icon icon={'account-clock'} size={20} />}
                /> */}
                <TextInput
                    style={styles.input}
                    onChangeText={(text : string) => setMobileNo(text)} 
                    value={mobileNo}
                    placeholder="Enter Your Mobile #"
                    keyboardType="numeric"
                    maxLength={11}
                    left={<TextInput.Icon icon={'account-clock'} size={20} />}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(text : string) => setPassword(text)}
                    value={weB_PASSWORD}
                    placeholder="Enter Your Password"
                    keyboardType="default"
                    secureTextEntry={true}
                    maxLength={11}
                    left={<TextInput.Icon icon={'eye'} size={20} />}
                />
                {loading ? (
                  <View style={s`bg-red-600 px-4`}>
                    {/* color="#00ff00" */}
                    <ActivityIndicator size="large" color="white" />
                  </View>
                  ) : (

                    <Button
                    title="Login"
                    color="red"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={login}
                    disabled={isButtonDisable()}
                />
                  
                  // <TouchableOpacity style={styles.button} onPress={login}>
                  //   <Text style={[s`font-bold text-sm` , styles.buttonText]}>Login</Text>
                  // </TouchableOpacity>
                )}
                

                <Button
                    title="Registration"
                    color="skyblue"
                    accessibilityLabel="Learn more about this purple button"
                    
                    // onPress={}
                />
                {/* {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null} */}

            </View>
      
        </View>

        <View style={styles.Footer}>

            <Image source={FooterImg} />

        </View>
    
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

  Credentials: {
    color: 'black',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 28,
    zIndex : 999
  },

  InputBox: {
    gap: 16,
  },

  input: {
    borderWidth: 1,
    width: 250,
  },

  Footer: {

    alignItems: 'flex-end',
    
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
