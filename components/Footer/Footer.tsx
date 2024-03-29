import { StyleSheet, Image, Dimensions, View } from 'react-native'
import FooterImg from '../../src/assets/Footer.png'
import React from 'react'

export default function Footer() {
    return (
        <View style={styles.Footer}>

            <Image source={FooterImg} style={{ width: Dimensions.get('window').height < 804 ? 160 : 180, height: Dimensions.get('window').height < 804 ? 205 : 250 }} />

        </View>
    )
}

const styles = StyleSheet.create({
    
    footerImg: {
        width: 250,
        height: 150,
        position: 'absolute',
        bottom: 0,
    },
    Footer: {

        alignItems: 'flex-end',
        zIndex: -1

    },
})