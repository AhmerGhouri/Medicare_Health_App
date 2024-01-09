import 'react-native-gesture-handler'
import { StatusBar , Button } from 'react-native';
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
import ElevatedCards from './components/elevatedCards/ElevatedCards';
import HeaderBtn from './components/HeaderBtn/HeaderBtn';




// function Home() {

//   const Tab = createBottomTabNavigator()

//   return(

//     <Tab.Navigator>
//       <Tab.Screen name="MyTabs" component={MyTabs} />
//     </Tab.Navigator>

//   )


// }


export type RootStackParamList = {
  Login: any,
  HomeScreen : { 
    opaT_PNAME: string,
    };
};



export default function App() {

  useEffect(() => {

    SplashScreen.hide();

  });

  return (
   
   
    <AuthProvider>
      <Layout></Layout>
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

  const Stack = createNativeStackNavigator();

  const { authState , onLogout } = useAuth()

  return(

    <NavigationContainer>
          
      <StatusBar barStyle={'light-content'} backgroundColor='#fb4d4d'/>
      
      <Stack.Navigator screenOptions={{headerShown : false}} >
      
        {authState?.authenticated ? 
      
          <Stack.Screen
            // options={{
            //   headerRight: ()=><Button title='SignOut' onPress={onLogout} color='red'/>
            // }}
            name="MyTabs" component={MyTabs} 
          /> 
          
          :
          
          <Stack.Screen name="Login" component={LoginScreen} />
          
        }
        <Stack.Screen options={{headerShown : false}} name='Loading' component={ElevatedCards} />

        <Stack.Screen
          name="Lab Test Request"
          component={LabScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Request Lab Test",
            headerShown: true,
          // headerTitle: (props) => <LogoTitle {...props} />,
             // Add a placeholder button without the `onPress` to avoid flicker
          headerLeft: () => (
              <HeaderBtn navigation={navigation}/>
            ),
          })}
        />

        <Stack.Screen name='HeaderBtn' component={HeaderBtn} />

          
        {/* <Stack.Screen name='Lab Test Request' component={LabScreen} /> */}



      </Stack.Navigator>

    </NavigationContainer>


  )

}
