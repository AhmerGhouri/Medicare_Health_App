import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthProps , userData} from '../../constants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'





const KEY = 'JMC-JWT'
export const api = 'https://local.jmc.edu.pk:82/api/Patients/GetPatientDataFromMob?mob=' 
export const regAPI = 'https://local.jmc.edu.pk:82/api/UserRegData/PostUserRegData' 
export const userRegAPI = 'https://local.jmc.edu.pk:82/api/UserRegData/GetUserRegData?mob=' 
const AuthContext = createContext<AuthProps>({})


export const useAuth = () => {
  return useContext(AuthContext)
}


export const AuthProvider = ({children} : any) => {

  const [userList, setUserList] = useState()
  // Setting Authentication State 
  const [authState , setAuth] = useState<{

    token : string | null | any,
    authenticated : boolean | null,
    user : userData

  }>({
    token : null,
    authenticated : null,
    user : {
      titlE_ID : null,
      address : null,
      autoid : null,
      datafrom : null,
      dob : null,
      email : null,
      fname: null,
      gender: null,
      isactive: null,
      mob: null,
      password: null,
      pname: null
    }
  })

  // Using useEffect for only load token when apps open
  // useEffect(() => {

  //   const loadToken = async () => {


  //     // Checking the login token is present or not
  //     const token = await AsyncStorage.getItem(KEY)

  //     // If token is not null it assign last generate token and session starts where left
  //     if(token){

  //       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
  //       setAuth({
  
  //         token : token,
  //         authenticated : true,
  //         user : authState.user
  
  
  //       })
         
        
  //     }
      // else{
        
      //   // If not present navigate to login screen
      //   axios.defaults.headers.common['Authorization'] = ''
        
      //   setAuth({
  
      //     token : null,
      //     authenticated : null
      //   })
        
      // }

  //     return token
            
  //   }
  //   loadToken()
  // } , []) 


  // Method for registering Users

  const register = async (
    mobileNo : string, 
    weB_PASSWORD : string ,
    title?  : string,
    email? : string ,
    fullName? : string ,
    fatherName? : string,
    gender? : string,
    dateofbirth? : string,
  ) => {

    try {
      
            console.log("title" , title , "type" , typeof title);
            console.log("mobile" , mobileNo , "type" , typeof mobileNo);
            console.log("Name" , fullName , "type" , typeof fullName);
            console.log("father" , fatherName , "type" , typeof fatherName);
            console.log("email" , email , "type" , typeof email);
            console.log("gender" , gender , "type" , typeof gender);
            console.log("date" , dateofbirth , "type" , typeof dateofbirth);

      const request = await axios.post(`${regAPI}` , { 
        mob : mobileNo, 
        password : weB_PASSWORD, 
        titlE_ID : title, 
        email : email, 
        pname : fullName,
        fname : fatherName,
        gender : gender,
        dob : dateofbirth,
        datafrom : "App",
        isactive : "Yes"
      })

        // console.log("mobile" , mobileNo);
        // console.log("pass" , weB_PASSWORD);
        // console.log("title" , title);
        // console.log("email" , email);
        // console.log("name" , fullName);
        // console.log("father" , fatherName);
        // console.log("gender" , gender);
        // console.log("birth" , dateofbirth);
        
        // console.log("requests" , request)

        return request



      
    } catch (error) {

      console.log("errrr" , error);
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

      // if (error.response) {
        
      //   console.log("data", error.response.data);
      
      //   alert(error.response.data.errors["EMAIL"]);
      
      //   console.log("status", error.response.status);
      
      //   // alert(error.response.status);
      
      //   console.log("headers", error.response.headers);
      
      //   // alert(error.response.headers);
      
      // } else if (error.request) {
      
      //   alert("Network Error");
      
      // } else {
        
      //   alert("Something Went Wrong");

      // }

      // console.log("error", error.response.data.errors["mob"]);

      // console.log("data", error.response.data);

      // console.log("status", error.response.status);


      // return { error : true , msg : (error as any).response.data.msg}
      
    }

  }


  const mrCreation =async (
    opaT_ID? : number,
    opaT_PNAME? : string,
    opaT_PHONE? : string,
    email? : string | null,
    weB_PASSWORD? : string | null ,
    rolE_ID? : string,
    opaT_STATUS? : string,
    opaT_CITY_ID?: string,
    opaT_RDATE? : string,
    opaT_RENT_EMP_ID? : string | null,
    opaT_SEX? : string,
    opaT_TITLE_ID? : string,
    opaT_VISIT_NO? : null
  ) => {
    
    try {
      
      // console.log("title" , title , "type" , typeof title);
      // console.log("mobile" , mobileNo , "type" , typeof mobileNo);
      // console.log("Name" , fullName , "type" , typeof fullName);
      // console.log("father" , fatherName , "type" , typeof fatherName);
      // console.log("email" , email , "type" , typeof email);
      // console.log("gender" , gender , "type" , typeof gender);
      // console.log("date" , dateofbirth , "type" , typeof dateofbirth);

const request = await axios.post(`${regAPI}` , { 
  opaT_ID : opaT_ID,
  opaT_PNAME: opaT_PNAME,
  opaT_PHONE : opaT_PHONE,
  email : email,
  weB_PASSWORD : weB_PASSWORD ,
  rolE_ID : rolE_ID,
  opaT_STATUS : "1",
  opaT_CITY_ID: "KHI",
  opaT_RDATE : opaT_RDATE,
  opaT_RENT_EMP_ID : opaT_RENT_EMP_ID,
  opaT_SEX : opaT_SEX,
  opaT_TITLE_ID : opaT_TITLE_ID,
  opaT_VISIT_NO : opaT_VISIT_NO
})

  return request




} catch (error) {

console.log("errrr" , error);
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


  // Set Login Method

  // const login = async (opaT_PNAME : string , weB_PASSWORD : string ) => {
  const login = async (mobileNo : string, weB_PASSWORD : string) => {

    try{


      // ---------------------- Checking Password authentication in OPAT table which comes from Login Screen ---------------------
      {/* const result =  await axios.get(`${api}${mobileNo}`)
      
       const data = result.data

      // ----------------------------------------------------------
      //  Check Users and Passwords from response
      // const getItem = (arr, toFind) => {

      //   const {Name, Password} = toFind;

      //   return data.filter(item => 
      //     item.opaT_PNAME === Name 
      //     && 
      //     item.weB_PASSWORD === Password).length > 0
      
      //   };

            
      // these variable "NAME" & "PASSWORD" comes from login screen inputs
      // const res = getItem(data,{"Name": opaT_PNAME,"Password": weB_PASSWORD})
      // ----------------------------------------------------------------------
      
      
      
       const getItem = (arr, toFind) => {

         const {Password} = toFind;

         return data.filter(item =>
           item.weB_PASSWORD === Password).length > 0
      
         };

            
       // these variable "NAME" & "PASSWORD" comes from login screen inputs
        const res = getItem(data,{"Password": weB_PASSWORD}) */}
      // --------------------------------------------------------------------------------------------------------------------------


        const result = await axios.get(`${userRegAPI}${mobileNo}`)

        const data = result.data

        
        console.log("data auth" , data[0]);

        const userAuthData = data[0]

        const getItem = (arr , toFind) => {

          const {Password} = toFind;
 
          return data.filter(item =>
            item.password === Password).length > 0
       
          };

          const res = getItem(data,{"Password" : weB_PASSWORD})
        

          console.log("Result Token" , result.data.token);

      
        // Checking is Credentials
        if (res) {

          // Set authentication 
          setAuth({

            token : result.data.token,
            authenticated : true,
            user : userAuthData

          })

          
          
          // Set Authorization Token
          axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`
          await AsyncStorage.setItem(KEY , userAuthData.pname)
          return result

        }


        else{
  
          Alert.alert('Invalid Credentials' , 'Password is incorrect!');
          
  
        }


      }catch (error) {
        
        if (error.response) {
        
          console.log("data", error.response.data);
        
          alert(error.response.data.errors["mob"]);
        
          console.log("status", error.response.status);
        
          // alert(error.response.status);
        
          console.log("headers", error.response.headers);


        
          // alert(error.response.headers);
        
        } else if (error.request) {
        
          alert("Network Error");
        
        } else {
          
          alert("Something Went Wrong");

        }

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

        console.log("error", error.response.data.errors["mob"]);

        console.log("data", error.response.data);

        console.log("status", error.response.status);

      }}

  // Set Log Out Method

  
  const logout = async () => {

    // Removing token which is stored in async storage

    try {
      await AsyncStorage.removeItem(KEY)
      console.log('AsyncStorage item removed successfully.');
      
    } catch (error) {

      // Is not remove successfully
      console.log('Error removing AsyncStorage item: ', error.message);
      
    }


    // removing token from axios headers for request which is set when login method call
    axios.defaults.headers.common['Authorization'] = ''

  //  set Auth status to null. Now, when user open app it will relogin with their credentials
    setAuth({
    
      token : null,
      authenticated : null,
      user : {
      titlE_ID : null,
      address : null,
      autoid : null,
      datafrom : null,
      dob : null,
      email : null,
      fname: null,
      gender: null,
      isactive: null,
      mob: null,
      password: null,
      pname: null
    }
    
    })

     
  }


  // values which pass through Auth Provider where all the methods are perform
  const value: AuthProps = {
    onLogin: login,
    onLogout: logout,
    onRegister : register,
    onMrCreation : mrCreation,
    authState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>



}





export default AuthContext

