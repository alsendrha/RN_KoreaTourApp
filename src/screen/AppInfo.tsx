import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, iWidth} from '../../globalStyle';

const AppInfo = () => {
  return (
    <View style={styles.container}>
      <FastImage source={require('../assets/images/app_info_logo.png')} />
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>현재 버전 1.0.3</Text>
      </View>
    </View>
  );
};

export default AppInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: iWidth * -80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textContainer: {
    marginTop: iWidth * 10,
  },
  textStyle: {
    color: colors.black,
  },
});
