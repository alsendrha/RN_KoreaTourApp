import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors, iHeight, iWidth} from '../../globalStyle';
import TopUserInfo from '../components/MyPage/TopUserInfo';

const MyPage = () => {
  return (
    <View style={styles.container}>
      <TopUserInfo />
      <View style={styles.menuListContainer}></View>
    </View>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },

  menuListContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    elevation: 4,
    shadowOffset: {width: 0, height: -2},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
  },
});
