import { StyleSheet, Text, View , Image, ImageSourcePropType, ViewStyle, ImageStyle, StyleProp, Dimensions} from 'react-native'
import React, { PropsWithChildren } from 'react'
import { s } from 'react-native-wind'
import Man from '../../src/assets/man.png'


type imgTypeCheck = PropsWithChildren<{
  ImageUrl : ImageSourcePropType
  width : number,
  height : number
}>
 


export default function Avatar({ImageUrl} : imgTypeCheck) {
  return (
    <View>
        {/* <Image source={require('../../src/assets/man.png')} style={s`w-8 h-8`}/> */}
        <Image source={ImageUrl} style={{ width: Dimensions.get('window').height < 704 ? 28 : 40, height: Dimensions.get('window').height <= 704 ? 28 : 40 }}/>
    </View>
  )
}


const styles = StyleSheet.create({})