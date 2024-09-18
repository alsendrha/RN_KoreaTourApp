import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MainStackScreen from '../StackScreen/MainStackScreen';
import {useImagePicker, usePageInfo} from '../../store/store';
import MyPageScreen from '../StackScreen/MyPageScreen';
import {useGetUSerInfo} from '../../api/firebase';

const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator();
  const {setImageData} = useImagePicker();
  const {pageInfo} = usePageInfo();
  const [name, setName] = useState('');
  console.log('현재페이지1', pageInfo);
  useEffect(() => {
    setImageData({
      uri: '',
      type: '',
      fileName: '',
    });
  }, [name, pageInfo]);

  const getTabBarVisibility = () => {
    return (
      pageInfo !== 'detail' &&
      pageInfo !== 'signIn' &&
      pageInfo !== 'signUp' &&
      pageInfo !== 'reviewInsert' &&
      pageInfo !== 'reviewUpdate'
    );
  };

  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'White'}}
      screenListeners={{
        state: e => {
          const currentRouteName = e.data.state.routeNames[e.data.state.index];
          setName(currentRouteName);
        },
      }}
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        headerShadowVisible: false,
        headerBackgroundContainerStyle: {
          backgroundColor: 'white',
        },
        tabBarStyle: [
          styles.tabBarStyle,
          {
            display: getTabBarVisibility() ? 'flex' : 'none',
          },
        ],
      })}>
      <Tab.Screen
        name="homeTab"
        component={MainStackScreen}
        options={{
          tabBarIcon({focused}) {
            return (
              <Icon
                name="home-outline"
                size={24}
                color={focused ? 'white' : '#1E0A00'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="myPageTab"
        component={MyPageScreen}
        options={{
          tabBarIcon({focused}) {
            return (
              <Icon
                name="person-outline"
                size={24}
                color={focused ? 'white' : '#1E0A00'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 10,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#E07039',
    elevation: 2,
    shadowOffset: {width: 0, height: -2},
  },
});
