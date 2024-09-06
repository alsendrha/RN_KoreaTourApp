import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../../screen/Main';
import Icon from 'react-native-vector-icons/Ionicons';
import Option from '../../screen/Option';
const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'White'}}
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
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
        name="option"
        component={Option}
        options={{
          headerShown: true,
          tabBarIcon({focused}) {
            return (
              <Icon
                name="settings-outline"
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
