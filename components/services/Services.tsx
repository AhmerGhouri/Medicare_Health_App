import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { s } from 'react-native-wind';
import EntyPo from 'react-native-vector-icons/FontAwesome';
import { ChildProps } from 'postcss';
import { modalService ,  servicesData} from '../../constants'
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import ElevatedCards from '../elevatedCards/ElevatedCards';
import { useNavigation } from '@react-navigation/native';







export default function Services({navigation} : any) {
  
  
  const [showModal, setShowModal] = useState(false);
  const [isLoading , setLoading] = useState(false)
  const [error , setError] = useState(null)
  const navigations = useNavigation()
  const [services , setServices] = useState<servicesData[]>()
  const [modalContent, setModalContent] = useState<modalService>();


  // API
  const baseURL = 'https://local.jmc.edu.pk:82/api/OnlineServices'
  

  // Fetching Data From API

  useEffect(() => {
    
    setLoading(true)
    fetchUser(baseURL)
    
    }, [])

    const fetchUser = async (baseURL1) => {
      
      axios({
        method : 'GET',
        baseURL : `${baseURL1}`
      })
      .then((response) => {
        
        setServices(response.data)
        setLoading(false)
        console.log("ABC" , response.data);
        

      })
      .catch((err) => {
        
        setError(err)
        // setLoading(false)
        console.log(err)
        
      })
      
    };

    console.log("abc" , services);


    const handleServicePress = (service) => {

      if (service.servicE_DESC === 'Lab Test Request') {

        navigation.navigate('Loading')
        setTimeout(()=> navigation.navigate('Lab Test Request'), 5000)
        
      }
      else{

        alert(`Coming Soon: ${service.servicE_DESC}`)

      }


    }
    
    
    // // Define a function to handle the navigation
    // const handleLabTestRequest = () => {
    
    //   // Close the modal first
    //   setShowModal(false);
    //   console.log("Modal" , showModal);
              
    //   navigation.navigate('Loading')
       
    //   // Navigate to the lab screen after a delay
    //   setTimeout(() => {
      
    //     navigation.replace('Lab Test Request');
      
    //   }, 5000);
  
    // };


    
    // Use a useEffect hook to check the modal content and call the handler
    // useEffect(() => {
      
    //   if (showModal && modalContent && modalContent.servicE_DESC === 'Lab Test Request' ) {
        
    //     handleLabTestRequest();
    //     console.log("AHMER" , showModal);
          
    //     }else{
    //       return setShowModal(true)
    //     }
        
    //   }, [showModal, modalContent]); // Add the dependencies  
      
            

  // // --------------------------------------------------------------------------------------
  
  
  // // Remove the navigation logic from the render method
  // {(
  //   <BlurView
  //     style={styles.blurView}
  //     blurType="light"
  //     blurRadius={25}
  //     blurAmount={10}
  //     reducedTransparencyFallbackColor="white">
  //     <Modal visible={showModal} animationType="slide" transparent={false}>
  //       <View style={styles.centeredView}>
  //         <View style={styles.modalView}>
  //           <Text style={styles.modalText}>{modalContent!.servicE_DESC} Not Available</Text>
  //         </View>
  //       </View>
  //     </Modal>
  //   </BlurView>
  // )}


    if(isLoading){
    
      return(
    
        <ActivityIndicator size={50} color={'red'} />
      )

    }


  return (
    
    <SafeAreaView>

      <View>


            
            
            <View>
  
              <View style={s`flex-row w-full flex-wrap py-2 pb-20 justify-center items-center `}>
       


          <FlatList 
          numColumns={3}
          data={services}
          contentContainerStyle={{justifyContent : 'center' , alignItems : 'center'}}
          keyExtractor={item => item.servicE_ID.toString()}
          renderItem={({item}) => (

            // <ScrollView scrollEnabled={true}>
                        
                  <TouchableOpacity

                    style={s`justify-center items-center`}
  
                    activeOpacity={0.8}
  
                    key={item.servicE_ID}
  
                    onPress={() => {
                      
                      handleServicePress(item)
                      // setModalContent({
                      //   servicE_ID : item.servicE_ID ,
                      //   servicE_DESC : item.servicE_DESC,
                      //   avaiL_MOBILEAPP : item.avaiL_MOBILEAPP,
                      // });
                      setShowModal(true);
  
                      
                    }}>
            
                    <View
                      style={[
                        s`shadow-2xl py-6 px-2 flex-column w-28 h-28 bg-white justify-center items-center rounded-3xl m-2`,
                        styles.box,
                      ]}>
                      <Icon name={item.icon} size={30} color={'red'} />
                      <Text style={s`pt-2 text-blue-800 font-bold`}>
                        {item.servicE_DESC}
                      </Text>
                    </View>
            
                  </TouchableOpacity>
                  // {/* </ScrollView> */}
                  
                  )}
                  
                  
                  />

                {error ? <Text style={styles.errorMsg}>{error}</Text> : null}


              


                  </View>
                </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blurView: {

    // flex : 1,
    // justifyContent : 'center',
    // alignItems : 'center',
   

  },

  modalContainer : {

      // flex : 1,

  },

  box: {
    elevation: 5,
    borderWidth : 1,
    borderColor : 'red',
    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: -50,
  },
  modalView: {
    // margin: 20,
    backgroundColor: '#ff8787',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  errorMsg: {
    color: 'red',
    marginTop: 10,
 },
});



