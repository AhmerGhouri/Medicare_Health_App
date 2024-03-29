import { Dimensions, View , Image} from 'react-native'
import HeaderImg from '../../src/assets/Ellipse.png'
import React from 'react'

export default function Header() {
  return (
    <View>
      <Image source={HeaderImg} style={{ width: Dimensions.get('window').height < 804 ? 260 : 350, height: Dimensions.get('window').height < 804 ? 100 : 120 }} />
    </View>
  )
}
