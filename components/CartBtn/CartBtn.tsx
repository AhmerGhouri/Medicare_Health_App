import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { s } from 'react-native-wind'
import Icon from 'react-native-vector-icons/AntDesign'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import { useAppSelector } from '../../app/hooks/hooks'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'


type cartScreenProps = NativeStackScreenProps<RootStackParamList , 'CartScreen'>



const CartBtn = () => {

    
    const { cartItem } = useAppSelector(state => state.cart);
    // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    // const navigateToCartScreen = () => {
    //     return  navigation.push('CartScreen' , { })
    // }

    useEffect(() => {
        // No specific action needed here, as the component will re-render
        // with the updated cartItem value
      }, [cartItem]);
    


    return (

        <GestureHandlerRootView>
            {/* <TouchableOpacity onPress={navigateToCartScreen}> */}
            <TouchableOpacity >
                <View>
                    <View  style={s`absolute right-4 bg-white w-4 items-center rounded-full`}>
                        <Text style={s`text-xs text-red-800`}>{cartItem.length}</Text>
                    </View>
                    <Icon name='shoppingcart' size={20} style={{ marginRight: 20, marginTop: 4, padding: 4, justifyContent: 'center', alignItems: 'center' }} color={'white'} />
                </View>
            </TouchableOpacity>
        </GestureHandlerRootView>
    )
}


export default CartBtn
