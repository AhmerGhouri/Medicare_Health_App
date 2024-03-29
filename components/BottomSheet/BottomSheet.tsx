import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { s } from 'react-native-wind';

const BottomSheetComponent = ({ testID }) => {

  return (

    <View style={styles.contentContainer}>
      <View style={s`flex-row justify-between w-full p-4`}>
        <Text style={s`text-white italic`}>{testID?.ltesT_ID} </Text>
        <Text style={s`text-white font-bold `}>Rs. {testID?.amt}</Text>
      </View>
      <Text style={s`text-black text-lg font-bold italic text-white`}>{testID?.ltesT_DESC}</Text>
      <Text style={s`text-white`}>{testID?.tesT_DESCRIPTION} 🎉</Text>
    </View>

  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomSheetComponent;

