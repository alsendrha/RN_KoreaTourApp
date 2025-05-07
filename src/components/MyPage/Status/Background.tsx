import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../../globalStyle';

const Background = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.topBackground} />
      <View style={styles.bottomBackground} />
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  topBackground: {
    height: '30%',
    backgroundColor: colors.primary,
  },
  bottomBackground: {
    height: '70%',
    backgroundColor: '#F7F7F7',
  },
});
