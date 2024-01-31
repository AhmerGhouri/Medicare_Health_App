import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  LogBox,
  ScrollView,
  Dimensions,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { s } from 'react-native-wind';
import EntyPo from 'react-native-vector-icons/FontAwesome';
import { ChildProps } from 'postcss';
import { modalService, servicesData } from '../../constants'
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import ElevatedCards from '../elevatedCards/ElevatedCards';
import { useNavigation } from '@react-navigation/native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';







export default function Services({ navigation, mob, bottomSheetRef, handleSetBottomSheetData }: any) {


  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigations = useNavigation()
  const [services, setServices] = useState<servicesData[]>()
  const [modalContent, setModalContent] = useState<modalService>();
  console.log("Service user", mob);


  // API
  const baseURL = 'https://local.jmc.edu.pk:82/api/OnlineServices'
  const OPAT_API_URL = `https://local.jmc.edu.pk:82/api/Patients/GetPatientDataFromMob?mob=${mob}`





  // Fetching Data From API

  useEffect(() => {

    setLoading(true)
    fetchUser(baseURL)

  }, [])

  const fetchUser = async (baseURL1) => {

    axios({
      method: 'GET',
      baseURL: `${baseURL1}`
    })
      .then((response) => {

        setServices(response.data)
        setLoading(false)
        console.log("ABC", response.data);


      })
      .catch((err) => {

        setError(err)
        // setLoading(false)
        console.log(err)

      })

  };

  console.log("abc", services);


  const opat_data = async () => {

    try {

      const response = await axios.get(OPAT_API_URL)
      const result = response.data
      console.log("Service Opat Result", result);
      handleSetBottomSheetData(result)
      return result;



    } catch (err) {

      console.error('Something went wrong!', err)

    }

  }

  useEffect(() => {

    bottomSheetRef.current?.close()
    LogBox.ignoreLogs(["`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.Consider using `numColumns` with `FlatList` instead."])

  }, [])


  const handleServicePress = async (service) => {

    const userOpatData = await opat_data()
    console.log("Before user Opat Data", userOpatData);

    if (userOpatData && service.servicE_DESC === 'Lab Test Request') {

      console.log("user Opat Data", userOpatData);
      bottomSheetRef.current?.snapToIndex(2)

      // Alert.alert("Select Your Mr #" , )


    } else if (!userOpatData && service.servicE_DESC === 'Lab Test Request') {

      console.log("user Opat Data", userOpatData);
      bottomSheetRef.current?.snapToIndex(2)



    }
    else {

      Alert.alert('Service', `Coming Soon: ${service.servicE_DESC}`)

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


  if (isLoading) {

    return (

      <ActivityIndicator size={50} color={'red'} />
    )

  }



  return (

              <ScrollView scrollEnabled={true}
              showsVerticalScrollIndicator={false} 
              contentContainerStyle={{ flexGrow : 0 , flexShrink : 1}}>
    <SafeAreaView>



        <View>

          <View>

            <View style={s`flex-row z-1 w-full flex-wrap py-2 pb-20 justify-center items-center `}>

              <FlatList
                // numColumns={3}
                data={services}
                scrollEnabled={true}
                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}
                keyExtractor={item => item.servicE_ID.toString()}
                renderItem={({ item }) => (
                // <ScrollView scrollEnabled={true} 
                // showsVerticalScrollIndicator={true}
                // contentContainerStyle={{}}>

                  <TouchableOpacity

                    style={s`justify-center items-center`}
                    activeOpacity={0.8}
                    key={item.servicE_ID}
                    onPress={() => {

                      handleServicePress(item)
                      setShowModal(true);


                    }}>

                    {/* <View
                    style={[
                      s`shadow-2xl py-6 px-2 flex-column w-28 h-28 bg-white justify-center items-center rounded-3xl m-2`,
                      styles.box,
                    ]}> */}
                    <View
                      style={[
                        s`shadow-2xl py-6 px-2 flex-column bg-white justify-center items-center rounded-3xl m-2`,
                        styles.box,
                      ]}>
                      <Icon name={item.icon} size={Dimensions.get('window').height <= 592 ? 25 : 30} color={'red'} />
                      <Text style={s`pt-2 text-blue-800 font-bold`}>
                        {item.servicE_DESC}
                      </Text>
                    </View>

                  </TouchableOpacity>
                  //  </ScrollView>

                )}


              />

              {error ? <Text style={styles.errorMsg}>{error}</Text> : null}





            </View>
          </View>

        </View>


    </SafeAreaView>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  blurView: {

    // flex : 1,
    // justifyContent : 'center',
    // alignItems : 'center',


  },
  contentContainer: {

    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },


  modalContainer: {

    // flex : 1,

  },

  box: {
    elevation: 5,
    borderWidth: 1,
    borderColor: 'red',
    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    width: Dimensions.get('window').height <= 592 ? 90 : 110,
    height: Dimensions.get('window').height <= 592 ? 90 : 110
  },
  // box: {
  //   elevation: 5,
  //   borderWidth: 1,
  //   borderColor: 'red',
  //   shadowColor: '#000000',
  //   shadowOffset: {
  //     width: 10,
  //     height: 10,
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 0,
  // },
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



