// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import React from 'react';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import HomeScreen from '../Screens/HomeScreen';
// import { RootStackParamList } from '../App';
// import { useAuth } from '../components/authContext/AuthContext';
// import { useAppSelector } from '../app/hooks/hooks';
// import StatusScreen from '../Screens/StatusScreen';
// import { View } from 'react-native';
// import { s } from 'react-native-wind';
// import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
// import ClearAllBtn from '../components/ClearAllBtn/ClearAllBtn';
// import CartScreen from '../Screens/CartScreen';
// import HeaderBtn from '../components/HeaderBtn/HeaderBtn';
// import { useNavigation } from '@react-navigation/native';


// const Stack = createNativeStackNavigator<RootStackParamList>();

// export const TabCartScreen = () => {
//   const { cartItem } = useAppSelector(state => state.cart);
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()


//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         options={{
//           headerShown: true,
//           title: 'My Cart',
//           headerShadowVisible: true,
//           headerBlurEffect: 'extraLight',
//           headerTransparent: true,
//           headerTintColor: 'white',
//           headerTitleAlign: 'center',
//           statusBarAnimation: 'slide',
//           statusBarStyle: 'dark',
//           contentStyle: {
//             borderCurve: 'circular',
//             borderBottomEndRadius: 20,
//             borderBottomStartRadius: 20,
//             borderColor: 'red',
//           },
//           headerRight: () => {
//             return (cartItem.length > 0 ? <ClearAllBtn /> : null)
//           },
//           headerTitleStyle: {
//             fontFamily: 'Quicksand-Bold',
//           },
//           headerLeft: () => {

//             return (
//               <View>
//                 <HeaderBtn navigation={navigation} />
//               </View>
//             )

//           },
//           headerStyle: {
//             backgroundColor: '#fb4d4d',
//           }
//         }}
//         name='CartScreen'
//         component={CartScreen}
//       />
//     </Stack.Navigator>
//   );
// };
// export const HistoryScreen = () => {

//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         options={{
//           headerShown: true,
//           title: 'History',
//           headerShadowVisible: true,
//           headerBlurEffect: 'extraLight',
//           headerTransparent: true,
//           headerTintColor: 'white',
//           headerTitleAlign: 'center',
//           statusBarAnimation: 'slide',
//           statusBarStyle: 'dark',
//           contentStyle: {
//             borderCurve: 'circular',
//             borderBottomEndRadius: 20,
//             borderBottomStartRadius: 20,
//             borderColor: 'red',
//           },
//             headerStyle: {
//             backgroundColor: '#fb4d4d',
//           }
//         }}
//         name='StatusScreen'
//         component={StatusScreen}
//       />
//     </Stack.Navigator>
//   );
// };



// const Tab = createMaterialBottomTabNavigator<RootStackParamList>();



// function MyTabs() {

//   const { cartItem } = useAppSelector(state => state.cart)
//   const { authState } = useAuth()

//   return (

//     <Tab.Navigator
//       labeled={true}
//       shifting={true}
      
//       barStyle={{
//         backgroundColor: '#fb4d4d',
//         elevation: 50,
//         height : 60,
//         borderTopWidth: 1,
//         borderTopColor: 'lightgray',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 0,
//         margin: 0
//       }}
//       backBehavior='history'
//       initialRouteName='HomeScreen'
//       activeColor="black"
//       inactiveColor="white"
//     >

//       <Tab.Screen options={{
//         tabBarColor: 'red',
//         tabBarLabel: 'History',
//         tabBarIcon: ({color}) => (
//           <MaterialCommunityIcons name='history' color={color} size={25} />
//         )
//       }}
//         name="HistoryScreen"
//         component={HistoryScreen}
//         initialParams={{ user: authState?.user }}
//       />
//       <Tab.Screen options={{
//         tabBarColor: 'red',
//         tabBarLabel: 'Home',
//         tabBarIcon: ({ focused, color }) => (


//             <AntDesign name='home' style={s``} color={color} size={25} />

//         )
//       }}
//         name="HomeScreen"
//         component={HomeScreen}
//         initialParams={{ user: authState?.user }}
//       />
//       <Tab.Screen

//         options={{
//           tabBarColor: 'red',
//           tabBarLabel: 'Cart',
//           tabBarBadge: cartItem.length,
//           tabBarIcon: ({color}) => (
//             <AntDesign name='shoppingcart' color={color} size={25} />
//           )
//         }}
//         name="TabCartScreen"
//         component={TabCartScreen}
//         initialParams={{ user: authState?.user }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default MyTabs;