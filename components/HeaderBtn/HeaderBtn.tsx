import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s } from 'react-native-wind'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'




const HeaderBtn = ({navigation}) => {

  const navigateToHomeScreen = () => {

    navigation.goBack()

  }

  return (
      
      <GestureHandlerRootView>
        <TouchableOpacity>
      <Icon name='left' size={20} 
      style={{marginRight : 20 , marginTop : 4 , padding : 4 , justifyContent : 'center' , alignItems : 'center'}} color={'white'} 
      onPress={navigateToHomeScreen} />
    </TouchableOpacity>
    </GestureHandlerRootView>
  )
}


export default HeaderBtn

const styles = StyleSheet.create({})