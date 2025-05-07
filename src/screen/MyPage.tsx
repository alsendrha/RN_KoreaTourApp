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
    <View style={styles.container}>
      <TopComponent />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          paddingHorizontal: iWidth * 24,
        }}>
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
    </View>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuContainer: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: iWidth * 20,
    elevation: 2,
    backgroundColor: 'white',
    paddingBottom: iWidth * 70,
  },

  indicatorContainer: {
    paddingVertical: iWidth * 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 2,
  },
});
