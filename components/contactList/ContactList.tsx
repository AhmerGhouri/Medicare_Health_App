import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, FlatList, Pressable } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { s } from 'react-native-wind'
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/Entypo';


interface Props {
  title: string;
}
type Ref = BottomSheet


const ContactList = forwardRef<Ref , Props>((props , ref) => {


  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%'  , '40%' ], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  console.log("abc" , props.title);
  

  // BackDrop
  const renderBackdrop = useCallback(
    (props : any) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1}/> , [] )

  // renders
  return (

    <View style={styles.container}>
      <GestureHandlerRootView style={{flex : 1}}>
          {/* <ScrollView> */}

          <Button title='open' onPress={() => bottomSheetRef.current?.expand()}/>
          <Button title='close' onPress={() => bottomSheetRef.current?.close()}/>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        >
        <View style={styles.contentContainer}>
          <Text>{props.title} 🎉</Text>
        </View>
      </BottomSheet>
          {/* </ScrollView> */}
          </GestureHandlerRootView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    // backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent : 'center'
  },

  InputBox: {
    gap: 16,
  },

  // container: {
  //   flex: 1,
  //   padding: 24,
  //   backgroundColor: 'grey',
  // },
  // contentContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  // },

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

export default ContactList;













// import {Image, ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
// import React from 'react';

// export default function ContactList() {
//   const contacts = [
//     {
//       uid: 1,
//       name: 'Ahmer Ghouri',
//       status: 'What you Do',
//       imageUrl: 'https://jmc.edu.pk/wp-content/uploads/2023/10/icon1.webp',
//     },
//     {
//       uid: 2,
//       name: 'Nabeel Wakeel',
//       status: 'What do you do you do',
//       imageUrl: 'https://media-mrs2-1.cdn.whatsapp.net/v/t61.24694-24/361681098_621481913431242_261915763196051037_n.jpg?ccb=11-4&oh=01_AdTh1S3GIC6oWawfgy6v1aB766DxLybYJ8fQ3Eo243_6rg&oe=657E7CB4&_nc_sid=e6ed6c&_nc_cat=105',
//     },
//     {
//       uid: 3,
//       name: 'Waseeq Ahmed',
//       status: 'What you Do',
//       imageUrl: 'https://media-mrs2-1.cdn.whatsapp.net/v/t61.24694-24/402520864_869740931222871_8472872784584186665_n.jpg?ccb=11-4&oh=01_AdQVDTYA11othhwPHJSDx5ZBOpb2k1dl7aN2uLlerz-mWw&oe=657E98C9&_nc_sid=e6ed6c&_nc_cat=108',
//     },
//     {
//       uid: 4,
//       name: 'Zain Ul Abidin',
//       status: 'What you Do',
//       imageUrl: 'https://media-mrs2-1.cdn.whatsapp.net/v/t61.24694-24/406551872_2113240212368546_4257930797905975695_n.jpg?ccb=11-4&oh=01_AdRNngiU65CvP9kq6Si8UBOPlsZoJn5GhUHf-VPT6IEOVA&oe=657E7573&_nc_sid=e6ed6c&_nc_cat=101',
//     },
//     {
//       uid: 5,
//       name: 'Junaid Mamo',
//       status: 'What you Do',
//       imageUrl: 'https://media-mrs2-1.cdn.whatsapp.net/v/t61.24694-24/383416929_860625121893682_443225428977268514_n.jpg?ccb=11-4&oh=01_AdT0RLenBY5d4Y_qnqpU0Kcn-v_3cN5_0D6zkjNuoyC_zw&oe=657E76F4&_nc_sid=e6ed6c&_nc_cat=109',
//     },
//   ];
//   return (
//     <View>
//       <Text style={styles.headingText}>Contact List</Text>
//       <ScrollView scrollEnabled={true} style={styles.Container}>
//         {contacts.map(({uid, name, status, imageUrl}) => (
            

//           <View key={uid} style={styles.listContainer}>
//             <Image 
//             source={{uri: imageUrl}} 
//             style={styles.chatImage} />
//             <View style={styles.textContainer}>
//               <Text style={styles.name}>{name}</Text>
//               <Text style={styles.status}>{status}</Text>
//             </View>
//           </View>
            
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   headingText: {
//     fontSize: 24,
//     paddingHorizontal: 8,
//     fontWeight: 'bold',
//   },
//   Container: {
//     margin: 12,
//   },
//   listContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     padding : 12
//   },
//   chatImage: {
//     width: 70,
//     height: 70,
//     borderRadius : 100
//   },
//   textContainer :{
//     display : 'flex',
//     padding : 12
//   },
//   name : {

//     fontSize : 18,
//     fontWeight : 'bold'
    
//   },
//   status : {

//     fontSize : 12

//   }
// });