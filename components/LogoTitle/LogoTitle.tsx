import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s } from 'react-native-wind'

export default function LogoTitle({ title, tintColor, ...props }) {
  return (
    <View style={s`items-center`}>
      <Text style={[s` text-lg` , { color: tintColor , fontFamily : 'Quicksand-Bold' }]}>{title}</Text>
    </View>
  )
}
