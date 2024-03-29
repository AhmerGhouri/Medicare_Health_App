import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { s } from 'react-native-wind'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Icon from 'react-native-vector-icons/Entypo';
import { addToCart, setOpatId } from '../../app/slices/cartSlice';
import { LabTestData, opatValuesType, testData } from '../../constants';
import { useAppDispatch } from '../../app/hooks/hooks';
import LottieView from 'lottie-react-native';



const ServicesDetail: React.FC<{ data: LabTestData[], opatValues: opatValuesType, onSetTestID: (id: testData) => void }> = ({ data, opatValues, onSetTestID }): JSX.Element => {

    const dispatch = useAppDispatch()

    const CheckBox = useCallback(({ item }) => {
        return (
            <BouncyCheckbox
                size={25}
                fillColor="red"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "red" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                key={item.ltesT_ID}
                onPress={(isChecked: boolean) => {
                    handleCheck({
                        ...item,
                        isChecked
                    })
                }}
            />
        )
    }, [])

    const handleInfo = (test: testData) => {
        onSetTestID(test);
    }

    const handleCheck = (test) => {
        dispatch(setOpatId(opatValues))
        dispatch(addToCart(test))
    };

    const renderServices = useCallback(({ item }) => {

        return (
            <>
                <View style={[s`flex-row z-1 justify-between my-4`, styles.List]}>
                    
                    <View style={{ width: "60%" }}>
                        <Text style={[s`text-blue-900 text-md`, { fontFamily: 'Quicksand-Bold' }]}>{item.ltesT_DESC}</Text>
                    </View>

                    <View style={s`flex-row items-center`}>
                        <CheckBox item={item} />
                        <Icon name='info-with-circle' color={'black'}
                            onPress={() => handleInfo(item)}
                            size={20}
                        />
                    </View>

                </View>
            </>
        )

    }, [])

    const EmptyMessage = () => {

        return(

            <>
            <View style={s` items-center mt-8`}>
            <LottieView
              style={[styles.lottie]}
              source={require('../../src/animations/emptyCart.json')}
              autoPlay
              loop
            />
                <Text style={{fontFamily : 'Quicksand-Bold'}}>
                    No Data Found.
                    </Text>
            </View>
            </>

        )

    }

    return (

        <>
            <FlatList
                numColumns={1}
                data={data}
                renderItem={renderServices}
                keyExtractor={item => item.ltesT_ID}
                removeClippedSubviews={true}
                initialNumToRender={10}
                windowSize={21}
                ListEmptyComponent={EmptyMessage}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ borderWidth: 1, borderColor: 'lightgray' }}></View>
                    )
                }}
            />
        </>

    )
}

const styles = StyleSheet.create({

    List: {
        width: '100%',
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 8
        },
        shadowOpacity: 1,
        elevation: 50
    },
    lottie: {

        width: 200,
        height: 200,
        zIndex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    
      },

})

export default ServicesDetail