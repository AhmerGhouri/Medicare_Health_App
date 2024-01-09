import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FlatCards() {
  return (
    <View>
      <Text style={styles.headingText}>FlatCards</Text>
      
        
      <View style={styles.container}>
        <View style={[styles.card , styles.cardOne]}>
            <Text>
                Lab
            </Text>
        </View>
        <View style={[styles.card , styles.cardTwo]}>
            <Text>
                Radiology
            </Text>
        </View>
        <View style={[styles.card , styles.cardThree]}>
            <Text>
                BRC
            </Text>
        </View>
        <View style={[styles.card , styles.cardThree]}>
            <Text>
                BRC
            </Text>
        </View>
        <View style={[styles.card , styles.cardThree]}>
            <Text>
                BRC
            </Text>
        </View>
        <View style={[styles.card , styles.cardThree]}>
            <Text>
                BRC
            </Text>
        </View>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({

    headingText :{
        fontFamily : 'Poppins',
        fontSize : 24,
        fontWeight : 'bold',
        padding : 8
    },
    container :{

        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        // flexWrap : 'wrap'

    },
    card :{
        
        width : 90,
        height : 100,
        justifyContent : 'center',
        alignItems : 'center',
        margin : 8,
        borderRadius : 10,

    },
    cardOne : {

        backgroundColor : 'red',

    },    
    cardTwo : {

        backgroundColor : 'blue',


    },
    cardThree : {

        backgroundColor : 'orange',

    }
})