import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MyBottomSheet from './src/components/BottomSheet/MyBottomSheet';
import ReactQueryProvider from './src/reactQuery/proovider';
import {colors} from './globalStyle';
import StackScreen from './src/components/StackScreen/StackScreen';

function App() {
  return (
    <ReactQueryProvider>
      <GestureHandlerRootView style={{flex: 1, backgroundColor: colors.white}}>
        <NavigationContainer>
          <StackScreen />
          <MyBottomSheet />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ReactQueryProvider>
  );
}

export default App;
