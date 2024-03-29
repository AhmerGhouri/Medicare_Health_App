import {ScrollView, StyleSheet, Text, View , Image} from 'react-native';
import React, { useEffect } from 'react';
import { s } from 'react-native-wind';
import Logo from '../../src/assets/MEDICARE.png'
import Animated , { useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';





export default function LogoAnimation() {

  const ring1padding = useSharedValue(0)
  const ring2padding = useSharedValue(0)

  useEffect(() => {

    ring1padding.value = 0
    ring2padding.value = 0

    setTimeout(() => ring1padding.value = withRepeat(withTiming((withSpring(ring1padding.value+ 40) , 60), { duration: 1500 }),-1,true))
    setTimeout(() => ring2padding.value = withRepeat(withTiming((withSpring(ring2padding.value+ 50), 150), { duration: 1500 }),-1,true))
    // setTimeout(() => ring1padding.value = withSpring(ring1padding.value+ 40) , 5)
    // setTimeout(() => ring2padding.value = withSpring(ring2padding.value+ 50) , 5)


  }, [])

  return (
    
    <View style={s`flex-1 justify-center items-center bg-white`}>

    <Animated.View style={[s`bg-red-400  rounded-full  justify-center`,  { margin : ring2padding}]}>
      <Animated.View style={[s`bg-red-100 w-72 h-72 rounded-full items-center  justify-center ` , { margin : ring1padding}] }>

        <Image  source={Logo} style={s`m-8`} width={80} height={90}/>

      </Animated.View>
      </Animated.View>

    </View>

  );
}

const styles = StyleSheet.create({
  headingText: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 8,
  },
  container: {
    padding : 8
  },
  card: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 10,
  },
  cardElevated : {
    backgroundColor: 'red',
    elevation : 1,
    shadowOffset :{
        width : 1,
        height : 1
    },
    shadowColor : 'black'

  }

});
