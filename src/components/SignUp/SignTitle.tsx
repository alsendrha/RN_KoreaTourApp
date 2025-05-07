import React from 'react';
import {StyleSheet, View} from 'react-native';
import {iWidth} from '../../../globalStyle';
import IText from '../IText';

const SignTitle = () => {
  return (
    <View style={styles.container}>
      <IText fontStyle="fB" fontSize={24} text={'회원가입'} />
    </View>
  );
};

export default SignTitle;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: iWidth * 26,
  },
});
