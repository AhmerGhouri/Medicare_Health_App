import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { s } from 'react-native-wind'
import { useAppDispatch } from '../../app/hooks/hooks'
import { closeModal } from '../../app/slices/cartSlice'
import Icon from 'react-native-vector-icons/Ionicons'

export default function SelectedTestsModals({ visible, navigation }) {

    const dispatch = useAppDispatch()

    return (
        <>
            <Modal
                isVisible={visible}
                animationInTiming={300}
                animationIn={'zoomIn'}
                animationOut={'zoomOut'}
                coverScreen={true}

            >

                <View style={[s`bg-white` , {height : '30%' ,borderTopWidth: 8, borderTopColor: 'blue'}]}>

                    <Pressable onPress={() => dispatch(closeModal())} style={[s`items-end p-4`, {height : '25%'}]}>
                        <Icon name='close-outline' size={20} color={'black'}/>
                    </Pressable>

                    <View style={{ justifyContent: 'center', height: '50%', backgroundColor: 'white'}}
                    >
                        <View style={[s`flex w-full justify-center items-center`]}>
                            <Text style={[s`text-center text-black`, { fontFamily: 'Quicksand-Regular' }]}>This Service is already in Your Cart. Kindly Check Your Cart and proceed further</Text>
                        </View>
                    </View>
                </View>

                <View style={s`flex justify-between`}>

                    <Button title="Go To Cart" onPress={() => {
                        dispatch(closeModal())
                        setTimeout(() => {
                            navigation.navigate('CartScreen')
                        }, 1000)
                    }} />

                </View>

            </Modal>
        </>
    )
}
