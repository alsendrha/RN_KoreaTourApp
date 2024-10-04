import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {iHeight} from '../../../globalStyle';

const SignTitle = () => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        marginBottom: iHeight * 40,
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 24}}>회원가입</Text>
    </View>
  );
};

export default SignTitle;

const styles = StyleSheet.create({});
