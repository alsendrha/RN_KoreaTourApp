import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Main from '../../screen/Main';
const MainStackScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="main">
      <Stack.Screen name="main" component={Main} />
    </Stack.Navigator>
  );
};

export default MainStackScreen;

const styles = StyleSheet.create({});
