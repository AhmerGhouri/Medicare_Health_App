import { Button, StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import React from 'react'
import LottieView from 'lottie-react-native'
import { s } from 'react-native-wind'

const CashDeliveryModal = ({ modalVisible , onClose , navigation}) : JSX.Element => {

    const handlePress = () => {
        onClose()
        navigation.navigate('HomeScreen')
    }

    return (
        <>

            <Modal
                isVisible={modalVisible}
                animationInTiming={300}
                animationIn={'zoomIn'}
                animationOut={'zoomOut'}
                coverScreen={true}

            >


                <View
                    style={{ justifyContent : 'center' , height: '38%', backgroundColor: 'white', borderTopWidth: 8, borderTopColor: 'blue' }}
                >

                    <View style={[s`flex shrink-0 w-full items-center`, styles.lottieContainer]}>

                        <LottieView
                            style={[styles.lottie]}
                            source={require('../../src/animations/Bill.json')}
                            autoPlay

                        />

                    </View>
                    <View style={[s`flex w-full justify-center items-center`, styles.lottieContainer]}>

                        <Text style={s`text-center text-black`}>Our Contact Person will call you back in next working hours.</Text>

                    </View>


                </View>

                <View>

                    <Button title="Close" color={'red'} onPress={handlePress} />

                </View>

            </Modal>

        </>
    )
}

export default CashDeliveryModal

const styles = StyleSheet.create({

    lottieContainer: {

        zIndex: 0,

    },
    lottie: {

        width: 250,
        height: 150,
        // width: Dimensions.get('window').height <= 592 ? 300 : 400 && Dimensions.get('screen').width >= 800 && Dimensions.get('screen').width <= 1080 ? 700 : 400 && Dimensions.get('screen').width >= 1080 ? 400 : 400,
        // height: Dimensions.get('window').height <= 592 ? 300 : 400 && Dimensions.get('screen').width >= 800 && Dimensions.get('screen').width <= 1080 ? 700 : 400 && Dimensions.get('screen').width >= 1080 ? 400 : 400,

    },
})