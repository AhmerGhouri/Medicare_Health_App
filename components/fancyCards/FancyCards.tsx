import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FancyCards() {
  return (
    <View>
      <Text style={styles.headingText}>FancyCards</Text>

            <View style={styles.card}>
                <Image
                source={{uri : 'https://reactnative.dev/img/tiny_logo.png'}} 
                style={styles.Img} />
                <Text style={styles.title}>ABC</Text>
                <Text style={styles.label}>Hugging Face</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis iusto corrupti nihil doloribus ullam odit hic impedit fuga aliquid? Quia cumque quo fuga voluptatem sapiente maiores saepe, animi aperiam. Cumque.</Text>
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
    card : {
        width : 380,
        height : 360,
        borderRadius : 6,
        marginHorizontal : 16,
        marginVertical : 12,
        // padding : 8,
        backgroundColor : 'black'
    },
    Img :{
        width : 380,
        height : 180
    },
    title :{
        fontSize : 24,
        fontWeight : 'bold',
        paddingVertical : 8,
        color : 'white',
        padding : 8
    },
    label : {
        fontSize : 16,
        paddingVertical : 4,
        color : 'white',
        padding : 8
    },
    description :{

        fontSize : 12,
        paddingVertical : 2,
        color : 'white',
        padding : 8

    }


})