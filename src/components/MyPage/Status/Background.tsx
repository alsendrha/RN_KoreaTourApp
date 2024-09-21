import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {iHeight} from '../../../../globalStyle';

const Background = () => {
  return (
    <>
      <View style={styles.topBackground} />
      <View style={styles.bottomBackground} />
    </>
  );
};

export default Background;

const styles = StyleSheet.create({
  topBackground: {
    height: iHeight * 150,
    backgroundColor: '#E07039',
  },
  bottomBackground: {
    height: '100%',
    backgroundColor: '#F7F7F7',
  },
});
