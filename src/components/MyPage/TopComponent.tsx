import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {colors, iHeight, iWidth} from '../../../globalStyle';

const TopComponent = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.userInfoContainer}>
      <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('signIn')}>
          <View
            style={{
              width: iWidth * 100,
              height: iHeight * 40,
              borderRadius: 10,
              borderWidth: 1,
            }}>
            <Text>회원가입</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopComponent;

const styles = StyleSheet.create({
  userInfoContainer: {
    width: '100%',
    height: iHeight * 170,
    backgroundColor: '#ded3c1',
  },
});
