import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthProps } from '../../constants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'




const KEY = 'JMC-JWT'
export const api = 'https://local.jmc.edu.pk:82/api/Patients/GetPatientDataFromMob?mob=' 
const AuthContext = createContext<AuthProps>({})




export const useAuth = () => {
  return useContext(AuthContext)
}


export const AuthProvider = ({children} : any) => {

  // Setting Authentication State 
  const [authState , setAuth] = useState<{

    token : string | null | any,
    authenticated : boolean | null

  }>({
    token : null,
    authenticated : null
  })

  // Using useEffect for only load token when apps open
  useEffect(() => {

    const loadToken = async () => {


      // Checking the login token is present or not
      const token = await AsyncStorage.getItem(KEY)

      // If token is not null it assign last generate token and session starts where left
      if(token){

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        setAuth({
  
          token : token,
          authenticated : true
  
  
        })
         
        
      }
      // else{
        
      //   // If not present navigate to login screen
      //   axios.defaults.headers.common['Authorization'] = ''
        
      //   setAuth({
  
      //     token : null,
      //     authenticated : null
      //   })
        
      // }

      return token
            
    }
    loadToken()
  } , []) 


  // Method for registering Users

  const register = async (opaT_PNAME : string , weB_PASSWORD : string) => {

    try {

      return await axios.post(`${api}` , {opaT_PNAME , weB_PASSWORD})

      
    } catch (error) {

      return { error : true , msg : (error as any).response.data.msg}
      
    }

  }


  // Set Login Method

  // const login = async (opaT_PNAME : string , weB_PASSWORD : string ) => {
  const login = async (mobileNo , weB_PASSWORD) => {

    // const [result , setResult] = useState()

    // try {

    //   // Get User From API

    //   axios({
    //     method : 'GET',
    //     baseURL : `${api}${mobileNo}`
    //   })
    //   .then((response) => {
        
        

    //   const data = response.data
    //     // setResult(response.data)
        
    //   const getItem = (arr, toFind) => {

    //     const {Password} = toFind;

    //     return data.filter(item =>
    //       item.weB_PASSWORD === Password).length > 0
      
    //     };

            
    //   // // these variable "NAME" & "PASSWORD" comes from login screen inputs
    //   // // const res = getItem(data,{"Name": opaT_PNAME,"Password": weB_PASSWORD})
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
    //   })
    //   .catch((error) => {
        
    //     if (error.response) {
    //       console.log("data" ,error.response.data);
    //       alert(error.response.data.errors["mob"]);
    //       // console.log( "status" , error.response.status);
    //       // alert(error.response.status);
    //       // console.log( "headers" , error.response.headers);
    //       // alert(error.response.headers);
          
    //     }else if (error.request){

    //       console.log(error.request);
    //       alert(error.request);

    //     }else{
    //       console.log('Error', error.message);
    //       alert(error.message);
    //     }
      
        
    //   })
    try{

      const result =  await axios.get(`${api}${mobileNo}` )

      if(result.status !== 200){

        alert("Something Went Wrong")


      }else{

        alert("kuch nhi hwa")

      }


      const data = result.data

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
      
      
      
      const getItem = (arr, toFind) => {

        const {Password} = toFind;

        return data.filter(item =>
          item.weB_PASSWORD === Password).length > 0
      
        };

            
      // these variable "NAME" & "PASSWORD" comes from login screen inputs
      const res = getItem(data,{"Password": weB_PASSWORD})
      
        // Checking is Credentials
        if (res) {

        
          // Set authentication 
          setAuth({
            token : result.data.token,
            authenticated : true
          })

          console.log("abc", result.data);
          
          // Set Authorization Token
          axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`
          
          await AsyncStorage.setItem(KEY , 'abc')
          return result

        }

        else{
  
          alert('Invalid Credentials');
          
  
        }

            
    } catch (error) {

      console.log("error" , error.response.data.errors["mob"]);
      console.log("data" ,error.response.data);
      console.log("status" , error.response.status);

      if(error.response.status >= 400){

        alert("Check Your Internet Connection")

      }

      console.log( "headers",error.response.headers);
      
      // alert(error.response.data)

      // return { error : true , msg : error}
      
  //     return { error : true , msg : (error as any).response.data.msg}
      
    }

  }


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
      authenticated : null
    
    })

     
  }


  // values which pass through Auth Provider where all the methods are perform
  const value: AuthProps = {
    onLogin: login,
    onLogout: logout,
    onRegister : register,
    authState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>



}





export default AuthContext

const styles = StyleSheet.create({})