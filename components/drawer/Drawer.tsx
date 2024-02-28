import * as React from 'react';
import { Button, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { s } from 'react-native-wind'
import Avatar from '../Avatar/Avatar';
import Man from '../../src/assets/man.png'
import Woman from '../../src/assets/woman.png'
import { useAuth } from '../authContext/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign'
import CartBtn from '../CartBtn/CartBtn';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { RotateInDownLeft } from 'react-native-reanimated';

export default function UserDrawer({ user }) {
  const [open, setOpen] = React.useState(false);
  const { onLogout } = useAuth()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  console.log("user ", user);
  const navigateToCart = () => {
    // Call this function to navigate to the cart screen
    // You can pass any data if needed in props
    navigation.navigate('CartScreen')

  }


  return (

    <>

      <View style={s`flex-1 pt-8 justify-top items-center`}>

        <View style={s`flex-1  w-full`}>

          <View style={s`flex-row justify-between p-8`}>


            <View style={s``}>

              <Avatar ImageUrl={user.gender === 'M' ? Man : Woman} width={50} height={50} />

            </View>

            <View style={s``}>

              <TouchableOpacity onPress={navigateToCart}>
                <CartBtn />
              </TouchableOpacity>

            </View>

          </View>

          <View style={s`justify-center items-center mt-12`}>

            <Text style={s`text-black p-2`}>{user.pname}</Text>
            <Text style={s`text-black p-2`}>{user.fname}</Text>
            <Text style={s`text-black p-2`}>{user.mob}</Text>

          </View>
        </View>

        <TouchableOpacity style={s`flex-2 w-full p-4 bg-blue-500 items-center`} onPress={onLogout}>
          <View style={s`flex-row items-center`}>


            <View style={s`pr-4 `}>
              <Icon name='logout' size={18} color={'white'} />
            </View>
            <View>
              <Text style={s`text-white italic font-bold pt-1`}>Sign Out</Text>
            </View>

          </View>
        </TouchableOpacity>

      </View>
    </>

    // <Drawer
    //   open={open}
    //   onOpen={() => setOpen(true)}
    //   onClose={() => setOpen(false)}
    //   renderDrawerContent={() => {
    //     return <Text>Drawer content</Text>;
    //   }}
    // >
    //   <Button
    //     onPress={() => setOpen((prevOpen) => !prevOpen)}
    //     title={`${open ? 'Close' : 'Open'} drawer`}
    //   />
    // </Drawer>
  );
}
























// import React, {useRef, useState} from 'react';
// import {
//   Button,
//   DrawerLayoutAndroid,
//   Text,
//   StyleSheet,
//   View,
// } from 'react-native';

// const App = () => {
//   const drawer = useRef<DrawerLayoutAndroid>(null);
//   const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
//     'left',
//   );
//   const changeDrawerPosition = () => {
//     if (drawerPosition === 'left') {
//       setDrawerPosition('right');
//     } else {
//       setDrawerPosition('left');
//     }
//   };

//   const navigationView = () => (
//     <View style={[styles.container, styles.navigationContainer]}>
//       <Text style={styles.paragraph}>I'm in the Drawer!</Text>
//       <Button
//         title="Close drawer"
//         onPress={() => drawer.current?.closeDrawer()}
//       />
//     </View>
//   );

//   return (
//     <DrawerLayoutAndroid
//       ref={drawer}
//       drawerWidth={300}
//       drawerPosition={drawerPosition}
//       renderNavigationView={navigationView}>
//       <View style={styles.container}>
//         <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
//         <Button
//           title="Change Drawer Position"
//           onPress={() => changeDrawerPosition()}
//         />
//         <Text style={styles.paragraph}>
//           Swipe from the side or press button below to see it!
//         </Text>
//         <Button
//           title="Open drawer"
//           onPress={() => drawer.current?.openDrawer()}
//         />
//       </View>
//     </DrawerLayoutAndroid>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   navigationContainer: {
//     backgroundColor: '#ecf0f1',
//   },
//   paragraph: {
//     padding: 16,
//     fontSize: 15,
//     textAlign: 'center',
//   },
// });

// export default App;