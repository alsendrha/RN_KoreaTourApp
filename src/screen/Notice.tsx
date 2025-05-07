import React from 'react';
import {StyleSheet, View} from 'react-native';
import {iWidth} from '../../globalStyle';
import IText from '../components/IText';

const Notice = () => {
  return (
    <View style={styles.container}>
      <IText fontStyle="fR" text={'개발중입니다'} />
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: iWidth * -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
