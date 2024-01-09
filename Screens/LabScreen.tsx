import { Labtests, timeSlotData } from '../DummyData/LabTests';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, FlatList, Pressable, BackHandler } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { s } from 'react-native-wind'
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import Modal from 'react-native-modal'
import { selectedTest } from '../constants';
import { testData } from '../constants';
import { timeSlots } from '../constants';







const LabScreen = ({navigation}) => {



  // All State Which Manages

  const [date, setDate] = useState(new Date());
  const date_to_string = date.toDateString()
  const [testsData , setTestData] = useState<any>({})
  const [open, setOpen] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [value, setValue] = useState(null);
  const [checked , setisChecked] = useState(false)
  const [isButtonVisible , setButtonVisible] = useState(false)
  const [paymentAmount , setPaymentamount] = useState()
  const [totalAmount , setTotalAmount] = useState(0)
  const [selectedTests , setSelectedTests] = useState<selectedTest[]>([])
  const [timeSlot, setTimeSlot] = useState<timeSlots[]>(timeSlotData);
  const [testID , setTestId] = useState<testData>()
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // Modal States
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPaymentModalVisible , setPaymentModalVisible] = useState(false) 
  
  // Fetch Data from API
  const fetchData = async () => {

    // const API = 'https://local.jmc.edu.pk:82/api/LabTest/GetAllLabTests'

    // const result = await axios.get(API)

    // const data = await result.data
       const data = await Labtests

    console.log("data" , data);
    
    setTestData(data)

  }


  useEffect(() => {

    fetchData()

  } , [])


  
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // variables
  const snapPoints = useMemo(() => ['1%' , '25%'  , '50%' ], []);


  // callbacks
  const handleSheetChanges = useCallback((index: number) => {

    console.log('handleSheetChanges', index);

  }, []);


  // BackDrop
  const renderBackdrop = useCallback(

    (props : any) => <BottomSheetBackdrop {...props} disappearsOnIndex={1} appearsOnIndex={2}/> 
    ,[] 
  )


  function handleFilter(searchparams : string) {

    setTestData(
  
      Labtests.filter(({unique_id , test_code , test_name , test_short_name , test_description}) =>

      test_name.toUpperCase().includes(searchparams.toUpperCase())

    ))

    console.log(testsData);
      

  }
    

  const handleCheck = (test: selectedTest) => {

    const index = selectedTests.findIndex(

      (item) => item.unique_id === test.unique_id

    );
     
    if (index === -1) {

      setSelectedTests((prev) => [...prev, test]);

    } else {

      setSelectedTests((prev) =>

      prev.filter((item) => item.unique_id !== test.unique_id))
      
    }
  
  };

    
  let amount

  const handleSubmit = () => {

    setModalVisible(false)

      let sum = 0

      selectedTests.map((tests) => {

        tests.test_amount += amount
        sum += (tests || []).test_amount || 0
        
      })

      setTotalAmount(sum)
      setPaymentamount(amount)
      setPaymentModalVisible(true)
      
    }


   





  return (

    <View style={styles.container}>
      <GestureHandlerRootView style={{flex : 1}}>
          <View style={s`flex-1 bg-red-50 p-8`}>

          <View style={s`m-2`}>
          
          <Text style={s`text-black font-bold pb-2`}>Date</Text>
        
          <TextInput
          
            style={styles.input}
            value={date_to_string}
            placeholder="Select Date"
            showSoftInputOnFocus={false}
            right={<TextInput.Icon onPress={() => setOpen(true)} icon={'calendar-range'} size={20} />}
        
          />

          <DatePicker 
            open={open}
            modal
            textColor='red' 
            date={date} mode='date' 
            onDateChange={setDate}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => setOpen(false)} 
          />
 

        </View>

        <View style={s`m-2`}>

          <Text style={s`text-black font-bold pb-2`}>Time Slot</Text>

          <DropDownPicker
            open={openPicker}
            value={value}
            items={timeSlot}
            showArrowIcon={true}
            ActivityIndicatorComponent={() => {

              return(

                <ActivityIndicator color="#999" animating={true}/>

              )
            }}
            setOpen={setOpenPicker}
            setValue={setValue}
            setItems={setTimeSlot}
          />
 

        </View>

        <View style={s`m-2`}>

          

          <Text style={s`text-black font-bold pb-2 text-center text-md`}>Lab Tests</Text>

          <View>
            <TextInput
            onChangeText={(text) => handleFilter(text)}
            placeholder='Search Lab Test'/>
          </View>

          <FlatList 
            numColumns={1}
            data={testsData}
            keyExtractor={item=> item.unique_id}
            renderItem={({item})=> (

              

               <ScrollView 
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              > 
    
                <Pressable  style={[s`flex-row z-1 justify-between my-4` , styles.List]}>
      
                  <View style={{width:"60%"}}>

                    <Text style={s`text-blue-900 font-medium`}>{item.test_name}</Text>
      
                  </View>

                  <View style={s`flex-row`}>

                    <BouncyCheckbox 
                      size={25}
                      fillColor="red"
                      unfillColor="#FFFFFF"
                      iconStyle={{ borderColor: "red" }}
                      innerIconStyle={{ borderWidth: 2 }}
                      textStyle={{ fontFamily: "JosefinSans-Regular" }}
                      key={item.unique_id}
                      onPress={(isChecked: boolean) => {
                        isChecked ? setButtonVisible(true) : setButtonVisible(false)
                        handleCheck({
                          unique_id : item.unique_id,
                          test_short_name : item.test_short_name,
                          test_amount : item.test_amount,
                          test_name : item.test_name,
                          isChecked
                        }) 
                        
                        
                      }}
                    />
                  
                    <Icon name='info-with-circle' color={'black'} onPress={ () => {
                      setTestId({
                        unique_id : item.unique_id,
                        test_code : item.test_code,
                        test_short_name : item.test_short_name,
                        test_name : item.test_name,
                        test_description : item.test_description
                      }
                      )
                      bottomSheetRef.current?.expand()
                      }} size={20}/>
                  
                  </View>
            
                </Pressable>
        
               </ScrollView>
          )}

        />


      </View>


          </View>
          
      <Modal 
      isVisible={isModalVisible}
      animationInTiming={300}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      coverScreen={true}
      >

          <View 
          style={{height : '40%' ,justifyContent : 'center' , alignItems : 'center' , backgroundColor: 'white' }}
          >
          <ScrollView scrollEnabled={true} contentContainerStyle={{flex : 1 , justifyContent : 'center'}}>
          {selectedTests.map((tests) => {

            return(


                <View style={s`w-80 p-4 justify-center`}>

                  <View style={s`flex-row justify-between`}>

              
                    {/* <Text style={s`text-black`}>{tests.test_name}</Text> */}
                    <Text style={s`text-black`}>{tests.unique_id}</Text>
                    <Text style={s`text-blue-900 font-bold `}>{tests.test_short_name}</Text>
                    <Text style={s`text-red-900 font-bold `}>Rs. {tests.test_amount}</Text>

                  </View>
              
                </View>


              )
          })}
                       
          

                       </ScrollView>

        
          <View style={s`flex-row p-4 w-full justify-between`}>

            <View>

              <Button title="Close" color={'red'} onPress={toggleModal} />

            </View>

            <View>

              <Button title="Submit Request" color={'green'} onPress={handleSubmit} />

            </View>

          </View>
        </View>
      </Modal>





      {/* --------------------------- Payment Submit Modal--------------------------------------- */}

      <Modal 
      isVisible={isPaymentModalVisible}
      animationInTiming={300}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      coverScreen={true}
      >

          <View 
          style={{height : '40%' ,justifyContent : 'center' , alignItems : 'center' , backgroundColor: 'white' }}
          >

            <Text style={s`text-black`}>Thank You </Text>
            
            <Text style={s`text-black`}>Our Contact Person Will Contact You Soon </Text>
          
            
              {/* <Text style={s`text-red-900 font-bold `}>Rs. {totalAmount}</Text> */}

        
              <Button title="Close"  onPress={() => setPaymentModalVisible(false)} />

           

          </View>
      </Modal>




      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        >
        <View style={styles.contentContainer}>
          <Text style={s`text-black`}>{testID?.test_code} 🎉</Text>
          <Text style={s`text-black`}>{testID?.test_short_name} 🎉</Text>
          <Text style={s`text-black`}>{testID?.test_description} 🎉</Text>
        </View>
      </BottomSheet>

      <View style={[s`justify-center items-center absolute bottom-0 z-999 -left-0` , {width : '100%'}]}>

        {isButtonVisible ?

          <TouchableOpacity 
            onPress={toggleModal}
            style={[s`bg-red-500 items-center justify-center m-4 p-4` , {width : '100%' , borderRadius : 100}]}>

            <Icon name='forward' color={'white'} size={25} />

          </TouchableOpacity> : ''

        }

      </View>


          </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  contentContainer: {

    padding : 10,
    alignItems: 'center',
    justifyContent : 'center'
  },

  InputBox: {
    gap: 16,
  },


  input: {
    borderWidth: 0,
    width: '100%',
    textAlign : 'center'
  },

  List :{

    width : '100%',
    shadowColor : 'black',
    shadowOffset : {
      width : 4 ,
      height : 8
    },
    shadowOpacity : 1,
    elevation : 50

  },

  Footer: {
    alignItems: 'flex-end',
  },
});

export default LabScreen;


