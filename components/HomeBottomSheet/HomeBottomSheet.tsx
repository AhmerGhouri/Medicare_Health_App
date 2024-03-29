// import { Dimensions, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useCallback, useMemo } from 'react'
// import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet'
// import { s } from 'react-native-wind'
// import { Button, IconButton, MD3Colors, RadioButton } from 'react-native-paper'
// import Icon from 'react-native-vector-icons/FontAwesome6';

// export default function HomeBottomSheet({ user }) {

//     const snapPoints = useMemo(() => ['1%', '25%', '50%'], []);

//     // callbacks
//     const handleSheetChanges = useCallback((index: number) => {

//         console.log('handleSheetChanges', index);

//     }, []);

//     // BackDrop
//     const renderBackdrop = useCallback(

//         (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={2} />
//         , []
//     )

//     return (
//         <View>
//             <BottomSheet
//                 ref={bottomSheetRef}
//                 style={s`z-999`}
//                 snapPoints={snapPoints}
//                 onChange={handleSheetChanges}
//                 enablePanDownToClose={true}
//                 backdropComponent={renderBackdrop}
//             >

//                 <View style={s`mb-4`}>
//                     {
//                         bottomSheetData == 0 ?
//                             (
//                                 <Text style={[s`text-sm font-medium m-12 items-center justify-center italic text-center text-black`]}>
//                                     No MR Number is Registered with this Mobile Number! Please Click below button to create MR #.
//                                 </Text>
//                             )
//                             :
//                             (
//                                 <Text style={[s`text-sm font-medium mx-4 italic text-center text-black`]}>
//                                     Following MR # are registered on your mobile number kindly select one for service.
//                                 </Text>
//                             )
//                     }
//                 </View>

//                 {/* <View style={styles.contentContainer}> */}
//                 <BottomSheetScrollView nestedScrollEnabled={true} contentContainerStyle={styles.contentContainer}>
//                     {/* <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.contentContainer}> */}
//                     <FlatList
//                         numColumns={1}
//                         data={bottomSheetData}
//                         //             ListHeaderComponent={() => (
//                         //               <View style={s`fixed top-0`}>
//                         //                 <Text style={[s`text-sm italic text-center text-black`]}>
//                         //                   Following MR # are registered on your mobile number kindly select one for service. 
//                         //                 </Text>
//                         //               </View>
//                         // )}
//                         // nestedScrollEnabled={true}
//                         // scrollEnabled={true}
//                         removeClippedSubviews={false}
//                         keyExtractor={item => item.opaT_ID}
//                         renderItem={({ item }) => (

//                             <Pressable style={[s`flex-row z-1  justify-between items-center my-4 mx-2`, styles.List]}>

//                                 <View style={[s`flex-row justify-between`, {}]}>

//                                     <Text style={s`text-blue-900 font-medium`}>{item.opaT_ID}</Text>

//                                 </View>
//                                 <View style={[s`flex-row justify-between`, {}]}>

//                                     <Text style={s`text-blue-900 font-medium`}>{item.opaT_PNAME}</Text>

//                                 </View>

//                                 <View style={s`flex-row`}>

//                                     <RadioButton
//                                         value={item.opaT_ID}
//                                         status={checked === item.opaT_ID ? 'checked' : 'unchecked'}
//                                         onPress={() => handleCheckedData(item)}
//                                     />

//                                 </View>

//                             </Pressable>

//                         )}

//                     />

//                 </BottomSheetScrollView>
//                 {/* </ScrollView> */}
//                 {/* </View> */}

//                 <View>

//                     {checkedData && (

//                         <View style={s`absolute bottom-0 right-0 p-4`}>

//                             <IconButton
//                                 icon="send"
//                                 animated={true}
//                                 mode={'contained'}
//                                 iconColor={MD3Colors.error50}
//                                 size={20}
//                                 onPress={() => handleNavigateToLabScreen(checkedData)}
//                             />
//                         </View>

//                     )
//                     }

//                 </View>

//                 <View style={s`flex-column w-full border-t-2 border-gray-300 `}>

//                     <TouchableOpacity
//                         onPress={() => navigation.push('MRScreen', { user })}
//                         style={s`flex-row p-4 items-center bg-blue-600 justify-around w-full `}>

//                         <View style={[s` items-center`, { width: '30%' }]}>
//                             <Icon name='plus' color={'white'} size={20} />

//                         </View>
//                         <View style={[s`pl-8`, { width: Dimensions.get('window').width <= 600 ? '70%' : '60%' }]}>

//                             <Text style={s`text-white text-medium italic font-semibold`}>

//                                 Create New MR #

//                             </Text>
//                         </View>


//                     </TouchableOpacity>

//                 </View>



//             </BottomSheet>
//         </View>
//     )
// }

// const styles = StyleSheet.create({})