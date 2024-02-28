import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { s } from 'react-native-wind'
import Icon from 'react-native-vector-icons/Entypo'
import { removeFromCart } from '../../app/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'



const CartItem = ({ item }) => {


    const dispatch = useAppDispatch()
    const handleRemoveFromCart = (id) => dispatch(removeFromCart(id))
    const [loader , setLoader] = useState<boolean>(true)



    const CartList = item

    useEffect(() => {

        setTimeout(() => {

            setLoader(false)

        } , 5000)

    } , [loader])
    


    return (


        <>



            <GestureHandlerRootView style={[s`items-center`]} key={CartList.ltesT_ID}>

                <View style={[s`flex-row mt-3 mb-3 justify-between rounded-lg items-center`,
                {
                    width: '90%',
                    padding: 18,
                    elevation: 8,
                    backgroundColor: "white"

                }]}
                >
                    {
                        loader ?
                            <SkeletonPlaceholder borderRadius={4}>
                                <SkeletonPlaceholder.Item flexDirection="row" justifyContent='space-around'
                                    gap={50} alignItems="center">
                                    <SkeletonPlaceholder.Item width={'70%'} height={30} />
                                    <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder> :
                            <>
                                <View style={{ width: '70%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: '6%' }}>
                                    <Text style={s`text-black font-bold`}>{CartList.ltesT_DESC}</Text>
                                </View>
                                <Text style={s`text-blue-600`}>Rs. {CartList.amt}</Text>

                                <View style={s`absolute -top-2 -right-2`}>
                                    <TouchableOpacity style={[s` border-2 rounded-full justify-center items-center w-6 h-6`]} 
                                    onPress={() => handleRemoveFromCart(CartList.ltesT_ID)}>
                                        <Icon
                                            name='cross'
                                            size={15}
                                            style={{}}
                                            color={'red'} />

                                    </TouchableOpacity>
                                </View>
                            </>
                    }



                </View>
            </GestureHandlerRootView>


        </>

    )
}

export default CartItem

const styles = StyleSheet.create({})