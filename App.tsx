import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './src/screen/Main';
import Option from './src/screen/Option';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from './src/screen/Detail';
import IButton from './src/components/IButton';
import MyBottomSheet from './src/components/BottomSheet/MyBottomSheet';

function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const BottomTabScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 70,
          },
        })}>
        <Tab.Screen name="main" component={Main} />
        <Tab.Screen name="option" component={Option} />
      </Tab.Navigator>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: true}}>
          <Stack.Screen
            name="bottom"
            component={BottomTabScreen}
            options={{
              title: '홈',
              headerRight(props) {
                return <IButton title="menu" buttonStyle="menu" />;
              },
            }}
          />
          <Stack.Screen name="detail" component={Detail} />
        </Stack.Navigator>
        <MyBottomSheet />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
