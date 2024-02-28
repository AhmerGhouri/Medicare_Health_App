import 'react-native-gesture-handler'
import { StatusBar, Button } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './Navigator/Navigator';
import SplashScreen from 'react-native-splash-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './Screens/LoginScreen';
import { AuthProvider, useAuth } from './components/authContext/AuthContext';
import LabScreen from './Screens/LabScreen';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import ElevatedCards from './components/Animation/LogoAnimation';
import HeaderBtn from './components/HeaderBtn/HeaderBtn';
import Registration from './Screens/Registration';
import { checkedData, userData } from './constants';
import HomeScreen from './Screens/HomeScreen';
import MRCreateScreen from './Screens/MRCreateScreen';
import { Provider } from 'react-redux';
import { store } from './app/Store/Store';
import CartBtn from './components/CartBtn/CartBtn';
import CartScreen from './Screens/CartScreen';




// function Home() {

//   const Tab = createBottomTabNavigator()

//   return(

//     <Tab.Navigator>
//       <Tab.Screen name="MyTabs" component={MyTabs} />
//     </Tab.Navigator>

//   )


// }


export type RootStackParamList = {
  HomeScreen: {
    user: userData,
  };
  Login: any,
  Registration: any;
  Loading: any;
  LabTestRequest: checkedData;
  MRScreen: {
    user: userData
  },
  // CartScreen : {
  //   opatValues : opatValuesType
  // }
  CartScreen : any
};



export default function App() {

  useEffect(() => {

    SplashScreen.hide();

  });

  return (


    <AuthProvider>
      <Provider store={store}>
        <Layout></Layout>
      </Provider>
    </AuthProvider>


    // <SafeAreaView>
    //   <ScrollView>
    // <NavigationContainer>
    //       <StatusBar barStyle={'light-content'} backgroundColor='#fb4d4d'/>
    //       <Stack.Navigator screenOptions={{headerShown : false}} >
    //         <Stack.Screen name="Login" component={LoginScreen} />
    //         <Stack.Screen name="MyTabs" component={MyTabs} />
    //       </Stack.Navigator>
    //     </NavigationContainer>
    //   </ScrollView>
    // </SafeAreaView>

  );

}

export const Layout = () => {

  const Stack = createNativeStackNavigator<RootStackParamList>();

  const { authState, onLogout } = useAuth()

  return (

    <NavigationContainer>

      <StatusBar barStyle={'light-content'} backgroundColor='#fb4d4d' />

      <Stack.Navigator screenOptions={{ headerShown: false }} >

        {authState?.authenticated ?

          <Stack.Screen
            // options={{
            //   headerRight: ()=><Button title='SignOut' onPress={onLogout} color='red'/>
            // }}
            name="HomeScreen"
            component={HomeScreen}
            initialParams={{ user: authState.user }}
          />

          :

          <Stack.Screen name="Login" component={LoginScreen} />

        }
        <Stack.Screen options={{ headerShown: false }} name='Loading' component={ElevatedCards} />

        <Stack.Screen
          name="LabTestRequest"
          component={LabScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Request Lab Test",
            headerShown: true,
            // headerStyle : {backgroundColor : '#b4bcff'},
            // headerTitle: (props) => <LogoTitle {...props} />,
            // Add a placeholder button without the `onPress` to avoid flicker
            headerRight: () => (
              <CartBtn />
            ),
            headerLeft: () => (
              <HeaderBtn navigation={navigation} />
            ),
          })}
        />

        <Stack.Screen options={{
          headerShown: true,
          title: 'My Cart',
          headerShadowVisible : true,
          headerBlurEffect : 'extraLight' ,
          headerTransparent: true,
          headerTintColor: 'black',
          headerTitleAlign : 'center',
          statusBarAnimation : 'slide',
          statusBarStyle : 'dark',
          contentStyle : {
            borderCurve : 'circular',
            borderBottomEndRadius : 20,
            borderBottomStartRadius : 20,
            borderColor : 'red'
          },
          headerStyle : {
            backgroundColor : 'rgba(255, 255, 255, 0.8)',                      
          }
        }} name='CartScreen' component={CartScreen} />


        {/* <Stack.Screen
          name="Nursing Service"
          component={NursingScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Nursing Service",
            headerShown: true,
            headerStyle: { backgroundColor: '#b4bcff' },
            // headerTitle: (props) => <LogoTitle {...props} />,
            // Add a placeholder button without the `onPress` to avoid flicker
            headerLeft: () => (
              <HeaderBtn navigation={navigation} />
            ),
          })}
        /> */}

        {/* <Stack.Screen name='HeaderBtn' component={HeaderBtn} /> */}

        <Stack.Screen
          name='Registration'
          component={Registration}
          options={{
            headerShown: true,
            title: '',
            headerTransparent: true,
            headerTintColor: 'white'
          }}
        />

        <Stack.Screen options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
          headerTintColor: 'white'
        }} name='MRScreen' component={MRCreateScreen} />
   
        {/* <Stack.Screen name='Lab Test Request' component={LabScreen} /> */}

      </Stack.Navigator>

    </NavigationContainer>


  )

}
