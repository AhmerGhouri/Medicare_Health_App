import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import ElevatedCards from '../components/Animation/LogoAnimation';
import ActionCard from '../components/actionCard/ActionCard';
import ContactList from '../components/contactList/ContactList';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import  Entypo  from 'react-native-vector-icons/Entypo';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../Screens/HomeScreen';
import Drawer from '../components/drawer/Drawer';
import { useAuth } from '../components/authContext/AuthContext';





const Tab = createMaterialBottomTabNavigator();



function MyTabs( { route } ) {

  
  const { user } = route.params
  
  
  console.log("My Tabs" , user);

  return (

    <Tab.Navigator 
      labeled={false}
      barStyle={{padding : 0}}
      initialRouteName='Home' 
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      
      >
      
      
      {/* <Tab.Screen options={{
        
        
        tabBarIcon : () => (
          <Entypo name='lab-flask' color={'black'} size={25}/>
        )}}
        
        name="Lab" 
        component={ElevatedCards} 
        /> */}

{/* 
      <Tab.Screen options={{
        
        tabBarIcon : () => (
          <MaterialCommunityIcons name='radioactive-circle-outline' color={'black'} size={25}/>
        )}} 
        name="Drawer" 
        component={Drawer} 
        /> */}

      <Tab.Screen options={{
        
        tabBarIcon : () => (
          <AntDesign name='home' color={'black'} size={25}/>
        )
      }} 
      name="HomeScreen" 
      component={HomeScreen}
      initialParams={{ user : user }} 
      />

      {/* <Tab.Screen options={{
        
        tabBarIcon : () => (
          <AntDesign name='hearto' color={'black'} size={25}/>
        )
      }} 
      name="Detail" 
      component={ActionCard} 
      /> */}

      {/* <Tab.Screen options={{
        tabBarIcon : () => (
          <AntDesign name='contacts' color={'black'} size={25}/>
        )}}
       name="Contact List" 
       component={ContactList} 
       /> */}

    </Tab.Navigator>
  );
}

export default MyTabs;