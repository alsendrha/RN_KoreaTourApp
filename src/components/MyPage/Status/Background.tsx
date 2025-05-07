import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, iHeight} from '../../../../globalStyle';

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
    backgroundColor: colors.primary,
  },
  bottomBackground: {
    height: '100%',
    backgroundColor: '#F7F7F7',
  },
});
