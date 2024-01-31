import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { s } from 'react-native-wind'
import Avatar from '../Avatar/Avatar';
import Man from '../../src/assets/man.png'
import Woman from '../../src/assets/woman.png'

export default function UserDrawer({user}) {
  const [open, setOpen] = React.useState(false);

  console.log("user " , user);
  


  return (

    <>
      
      <View style={s`flex-1 pt-32 justify-top items-center`}>

      <View style={s``}>

        <Avatar ImageUrl={user.gender === 'M' ? Man : Woman} width={50} height={50}/>

      </View>

      <View style={s`justify-center items-center `}>

        <Text style={s`text-black p-2`}>{user.pname}</Text>
        <Text style={s`text-black p-2`}>{user.fname}</Text>
        <Text style={s`text-black p-2`}>{user.mob}</Text>

      </View>
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