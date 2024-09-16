import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {iHeight} from '../../globalStyle';

const AppInfo = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/app_info_logo.png')} />
      <View style={styles.textContainer}>
        <Text>현재 버전 1.0.0</Text>
      </View>
    </View>
  );
};

export default AppInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textContainer: {
    marginTop: iHeight * 5,
  },
});
