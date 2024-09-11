import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../../screen/Main';
import Icon from 'react-native-vector-icons/Ionicons';
import MyPage from '../../screen/MyPage';
import MainStackScreen from '../StackScreen/MainStackScreen';

const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'White'}}
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        headerShadowVisible: false,
        headerBackgroundContainerStyle: {
          backgroundColor: 'white',
        },
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 10,
          height: 70,
          borderRadius: 20,
          backgroundColor: 'white',
          elevation: 2,
          shadowOffset: {width: 0, height: -2},
        },
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
                color={focused ? 'blue' : 'black'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="myPage"
        component={MyPage}
        options={{
          title: '마이페이지',
          headerTitleAlign: 'center',
          tabBarIcon({focused}) {
            return (
              <Icon
                name="person-outline"
                size={24}
                color={focused ? 'blue' : 'black'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;

const styles = StyleSheet.create({});
