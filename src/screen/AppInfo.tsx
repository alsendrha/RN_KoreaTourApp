import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {iWidth} from '../../globalStyle';
import IText from '../components/IText';

const AppInfo = () => {
  return (
    <View style={styles.container}>
      <FastImage source={require('../assets/images/app_info_logo.png')} />
      <IText fontStyle="fR" text={'현재 버전 1.0.3'} />
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
});
