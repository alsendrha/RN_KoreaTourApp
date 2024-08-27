import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './src/screen/Main';
import Option from './src/screen/Option';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  const tab = createBottomTabNavigator();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <tab.Navigator>
          <tab.Screen name="main" component={Main} />
          <tab.Screen name="option" component={Option} />
        </tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
