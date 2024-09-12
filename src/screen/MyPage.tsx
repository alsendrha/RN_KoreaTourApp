import {View, StyleSheet} from 'react-native';
import React from 'react';
import {iHeight, iWidth} from '../../globalStyle';
import TopComponent from '../components/MyPage/TopComponent';
import UserInfo from '../components/MyPage/UserInfo';
import MenuList from '../components/MyPage/MenuList/MenuList';

const MyPage = () => {
  return (
    <View style={styles.myPageContainer}>
      <TopComponent />
      <View style={styles.bottomContainer}></View>
      <View style={styles.menuContainer}>
        <UserInfo />
        <MenuList />
      </View>
    </View>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  myPageContainer: {
    position: 'relative',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },

  bottomContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: -2},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
  },

  menuContainer: {
    position: 'absolute',
    overflow: 'hidden',
    height: '77%',
    left: iWidth * 30,
    right: iWidth * 30,
    borderRadius: 20,
    top: '50%',
    transform: [{translateY: -350}],
    elevation: 4,
    backgroundColor: 'white',
  },
});
