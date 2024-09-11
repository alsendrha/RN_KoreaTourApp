import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../../screen/Main';
import Icon from 'react-native-vector-icons/Ionicons';
import MyPage from '../../screen/MyPage';
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
        tabBarStyle: {
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 0,
        },
      })}>
      <Tab.Screen
        name="main"
        component={Main}
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
          // headerShown: true,
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
