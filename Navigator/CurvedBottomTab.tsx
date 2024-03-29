import { Alert, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import CartScreen from '../Screens/CartScreen';
import StatusScreen from '../Screens/StatusScreen';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useAppSelector } from '../app/hooks/hooks';
import ClearAllBtn from '../components/ClearAllBtn/ClearAllBtn';
import HeaderBtn from '../components/HeaderBtn/HeaderBtn';
import { useAuth } from '../components/authContext/AuthContext';


export const TabCartScreen = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const { cartItem } = useAppSelector(state => state.cart);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  
  
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'My Cart',
            headerShadowVisible: true,
            headerBlurEffect: 'extraLight',
            headerTransparent: true,
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            statusBarAnimation: 'slide',
            statusBarStyle: 'dark',
            contentStyle: {
              borderCurve: 'circular',
              borderBottomEndRadius: 20,
              borderBottomStartRadius: 20,
              borderColor: 'red',
            },
            headerRight: () => {
              return (cartItem.length > 0 ? <ClearAllBtn /> : null)
            },
            headerTitleStyle: {
              fontFamily: 'Quicksand-Bold',
            },
            headerLeft: () => {
  
              return (
                <View>
                  <HeaderBtn navigation={navigation} />
                </View>
              )
  
            },
            headerStyle: {
              backgroundColor: '#fb4d4d',
              // borderBottomEndRadius: 20,
              // borderBottomStartRadius: 20,
              // borderColor: 'red',
            }
          }}
          name='CartScreen'
          component={CartScreen}
        />
      </Stack.Navigator>
    );
  };
const HistoryScreen = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const { cartItem } = useAppSelector(state => state.cart);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  
  
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'History',
            headerShadowVisible: true,
            headerBlurEffect: 'extraLight',
            headerTransparent: true,
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            statusBarAnimation: 'slide',
            statusBarStyle: 'dark',
            contentStyle: {
              borderCurve: 'circular',
              borderBottomEndRadius: 20,
              borderBottomStartRadius: 20,
              borderColor: 'red',
            },
              headerStyle: {
              backgroundColor: '#fb4d4d',
            }
          }}
          name='StatusScreen'
          component={StatusScreen}
        />
      </Stack.Navigator>
    );
  };


  const HomeScreenComponent = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const { cartItem } = useAppSelector(state => state.cart);
    const { authState } = useAuth()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  
  
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
            title: 'Home',
            headerShadowVisible: true,
            headerBlurEffect: 'extraLight',
            headerTransparent: true,
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            statusBarAnimation: 'slide',
            statusBarStyle: 'dark',
            contentStyle: {
              borderCurve: 'circular',
              borderBottomEndRadius: 20,
              borderBottomStartRadius: 20,
              borderColor: 'red',
            },
          }}
          name='HomeScreen'
          component={HomeScreen}
          initialParams={{ user: authState?.user }}
        />
      </Stack.Navigator>
    );
  };



export default function CurvedBottomTab() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { authState } = useAuth()
  const _renderIcon = (routeName, selectedTab) => {
        let icon = '';

        switch (routeName) {
            case 'HomeScreen':
                icon = 'home-outline';
                break;
            case 'TabCartScreen':
                icon = 'cart-outline';
                break;
        }

        return (
            <Ionicons
                name={icon}
                size={25}
                color={routeName === selectedTab ? 'black' : 'gray'}
            />
        );
    };
    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
        return (
            <TouchableOpacity
                onPress={() => navigate(routeName)}
                style={styles.tabbarItem}
            >
                {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
        );
    };

    return (
            <CurvedBottomBar.Navigator
                type="UP"
                style={styles.bottomBar}
                shadowStyle={styles.shawdow}
                height={55}
                circleWidth={50}
                bgColor="white"
                initialRouteName="HomeScreen"
                borderTopLeftRight
                renderCircle={({ selectedTab, navigate }) => (
                    <Animated.View style={styles.btnCircleUp}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('HistoryScreen')}
                        >
                            <Ionicons name={'timer-outline'} color="gray" size={25} />
                        </TouchableOpacity>
                    </Animated.View>
                )}
                tabBar={renderTabBar}
                
            >
                <CurvedBottomBar.Screen
                    name="HomeScreen"
                    position="LEFT"
                    options={{
                        headerShown : false
                    }}
                    component={HomeScreenComponent}
                    // initialParams={{ user: authState?.user }}
                    
                />
                <CurvedBottomBar.Screen
                    name="TabCartScreen"
                    options={{
                        headerShown : false
                    }}
                    component={TabCartScreen}
                    position="RIGHT"
                    
                />
               
            </CurvedBottomBar.Navigator>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    shawdow: {
        shadowColor: '#DDDDDD',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    },
    bottomBar: {},
    btnCircleUp: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        bottom: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
    },
    imgCircle: {
        width: 30,
        height: 30,
        tintColor: 'gray',
    },
    tabbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 30,
        height: 30,
    },
    screen1: {
        flex: 1,
        backgroundColor: '#BFEFFF',
    },
    screen2: {
        flex: 1,
        backgroundColor: '#FFEBCD',
    },
});