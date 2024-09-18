import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {iWidth} from '../../globalStyle';
import TopComponent from '../components/MyPage/TopComponent';
import UserInfo from '../components/MyPage/UserInfo';
import MenuList from '../components/MyPage/MenuList/MenuList';
import UserLogin from '../components/MyPage/UserLogin';
import {usePageInfo} from '../store/store';
import {useNavigationState} from '@react-navigation/native';
import {useGetUSerInfo, useGetUser} from '../api/firebase';

const MyPage = () => {
  const {setPageInfo} = usePageInfo();
  const {data, isLoading, refetch} = useGetUser();
  const {data: userData, isLoading: userLoading} = useGetUSerInfo();

  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });

  useEffect(() => {
    setPageInfo(currentRouteName);
  }, [currentRouteName]);
  console.log('여기는 마이페이지', userData);
  return (
    <View style={styles.myPageContainer}>
      <TopComponent />
      <View style={styles.bottomContainer}></View>
      <View style={styles.menuContainer}>
        {isLoading || userLoading ? (
          <ActivityIndicator size="large" />
        ) : data ? (
          <UserInfo userData={userData} userLoading={userLoading} />
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
