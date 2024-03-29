import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks/hooks';
import { s } from 'react-native-wind';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import LottieView from 'lottie-react-native';
import CartItem from '../components/cartItemList/CartItemList';
import CheckOut from '../components/Checkout/CheckOut';
import CashDeliveryModal from '../components/Modals/CashDeliveryModal';
import { removeAllFromCart } from '../app/slices/cartSlice';


type cartScreenProps = NativeStackScreenProps<RootStackParamList, 'CartScreen'>



const CartScreen = ({ route , navigation }: cartScreenProps) => {


  const { cartItem } = useAppSelector(state => state.cart);
  const [delLoading, setDelLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [cashModalVisible , setCashModalVisible] = useState(false)

  const handleClick = (value) => {

    setDelLoading(value)
    setTimeout(() => {
      setDelLoading(false)
      // navigation.popToTop()
      dispatch(removeAllFromCart())
      setCashModalVisible(true)
    } , 6000)

  }

  const handleClose = () => {

    setCashModalVisible(false)

  }
  

  return (
    <>
    {delLoading && (
                <View style={styles.overlay}>
                    {/* <ActivityIndicator size="large" color="red" /> */}
                    <LottieView
                        style={[styles.lottie]}
                        source={require('../src/animations/Delivery.json')}
                        autoPlay
                        loop
                    />
                </View>
            )}
      <GestureHandlerRootView style={s`flex-1`}>
        {cartItem.length === 0 ?
          <View style={[s`flex mt-28 shrink-0 w-full items-center`, styles.lottieContainer]}>

            <LottieView
              style={[styles.lottie]}
              source={require('../src/animations/emptyCart.json')}
              autoPlay
              loop
            />

            <Text style={[s`text-lg text-red-500` , { fontFamily : 'Quicksand-Bold' }]}>Your Cart is Empty</Text>

          </View>
          :
          <>
            <View style={s`flex-1`}>

              <View style={[s`flex-2 grow-0`, { height: '70%' }]}>


                <FlatList
                  data={cartItem}
                  keyExtractor={(item) => item.ltesT_ID!}
                  scrollEnabled={true}
                  style={s`mt-16`}
                  renderItem={({ item }) => (
                    <CartItem
                      item={item}
                    />
                  )}

                />
              </View>

              <View style={[s`flex-1 grow-0`, { height: '30%' }]}>

                <CheckOut handleClick={handleClick}/>

              </View>

            </View>

          </>
        }
        <CashDeliveryModal modalVisible={cashModalVisible} onClose={handleClose} navigation={navigation}/>

      </GestureHandlerRootView>
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({

  lottieContainer: {

    zIndex: 0,
    width: '100%',


  },
  lottie: {

    // width: 400,
    // height: 400,
    width: Dimensions.get('window').height <= 592 ? 300 : 400 && Dimensions.get('screen').width >= 800 && Dimensions.get('screen').width <= 1080 ? 900 : 400 && Dimensions.get('screen').width >= 1080 ? 400 : 400,
    height: Dimensions.get('window').height <= 592 ? 300 : 400 && Dimensions.get('screen').width >= 800 && Dimensions.get('screen').width <= 1080 ? 900 : 400 && Dimensions.get('screen').width >= 1080 ? 400 : 400,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center'

  },

  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 999,
  },

})