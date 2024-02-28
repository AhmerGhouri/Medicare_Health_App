import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { s } from 'react-native-wind'
import Feather from 'react-native-vector-icons/Feather';
import { searchProps } from '../../constants';




const Search = ( { onChange } : searchProps) => {


    return (

        <View style={s`m-2`}>


            <Text style={s`text-black font-bold pb-2 text-center text-md`}>Lab Tests</Text>


            <View style={[s`flex z-0 flex-row rounded-md border-2 w-full border-blue-300 p-1 items-center`, styles.InputView]}>


                <View style={[s`flex-row justify-around items-center`, { width: '30%' }]}>

                    <Feather name='search' color={'grey'} />
                    <Text>Search :</Text>
                </View>
                <TouchableOpacity style={[s`flex-row items-center`, { width: '80%' }]}>
                    <TextInput
                        style={[{ width: '100%', padding: 5, color: 'black' }]}
                        placeholder='Search Lab Test'
                        placeholderTextColor={'black'}
                        onChangeText={(text) => onChange(text)}
                    />
                </TouchableOpacity>

            </View>

        </View>

    )
}

export default memo(Search)

const styles = StyleSheet.create({

    InputView: {

        shadowColor: 'black',
        backgroundColor: 'white',
        shadowRadius: 50,
        shadowOffset: {
          width: 10,
          height: 50,
        },
        shadowOpacity: 1,
        elevation: 15,
        width: "100%"
    
      },

})