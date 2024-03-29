import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { s } from 'react-native-wind';
import { useAppDispatch } from '../../app/hooks/hooks';
import { removeAllFromCart } from '../../app/slices/cartSlice';

export default function ClearAllBtn() {

    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch()

    const ClearCart = () => {
        setModalVisible(false)
        setTimeout(() => {
            dispatch(removeAllFromCart()) 
        } , 500)
    }

    return (
        <>
            <Pressable onPress={() => setModalVisible(true)}>
                <Text style={{ fontFamily: 'Quicksand-Bold' , color : 'white'}}>Clear All</Text>
            </Pressable>

            <Modal
                isVisible={isModalVisible}
                animationInTiming={300}
                animationIn={'zoomIn'}
                animationOut={'zoomOut'}
                coverScreen={true}

            >

                <View
                    style={[s`flex-column`, { height: '30%', backgroundColor: 'white', borderTopWidth: 8, borderTopColor: 'blue' }]}
                >

                    <View style={[s`flex shrink-0 pt-6 w-full items-center`]}>

                        <Text style={[s`text-lg text-black`, { fontFamily: 'Quicksand-Bold' }]}>Delete From Cart</Text>

                    </View>

                    <View style={[s`flex-row justify-center items-center w-full` , {height : '55%'}]}>

                        <View style={[s`items-center`]}>
                            <Text style={{fontFamily : 'Quicksand-Regular' , color : 'gray'}}>Are you sure you want to clear all items?</Text>
                        </View>

                    </View>

                    <View style={[s`flex-row justify-end items-center px-4 w-full`]}>

                        <Pressable onPress={ClearCart} style={[s`items-center px-4 py-2`]}>
                            <Text style={{fontFamily : 'Quicksand-Bold' , color : '#313594'}}>Yes</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)} style={[s`items-center px-4 py-2`]}>
                            <Text style={{fontFamily : 'Quicksand-Bold' , color : 'red'}}>No</Text>
                        </Pressable>

                    </View>


                </View>

            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    
    
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 999,
    },

})