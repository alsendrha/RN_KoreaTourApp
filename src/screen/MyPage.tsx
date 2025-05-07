import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {iWidth} from '../../globalStyle';
import {useGetUser} from '../api/firebase';
import MenuList from '../components/MyPage/MenuList/MenuList';
import TopComponent from '../components/MyPage/TopComponent';
import UserInfo from '../components/MyPage/UserInfo';
import UserLogin from '../components/MyPage/UserLogin';

const MyPage = () => {
  const {data, isLoading} = useGetUser();

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  return (
    <View style={styles.myPageContainer}>
      <TopComponent />
      <View style={styles.bottomContainer}></View>
      <View style={styles.menuContainer}>
        {isLoading ? (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : data ? (
          <UserInfo />
        ) : (
          <UserLogin />
        )}
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
    shadowOffset: {width: iWidth * 0, height: iWidth * -2},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: iWidth * 3.5,
  },

  menuContainer: {
    position: 'absolute',
    overflow: 'hidden',
    height: '77%',
    left: iWidth * 30,
    right: iWidth * 30,
    borderRadius: iWidth * 20,
    top: '50%',
    transform: [{translateY: iWidth * -350}],
    elevation: 4,
    backgroundColor: 'white',
  },

  indicatorContainer: {
    paddingVertical: iWidth * 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
  },
});
