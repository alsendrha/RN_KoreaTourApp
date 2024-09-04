import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Main from './src/screen/Main';
import Option from './src/screen/Option';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from './src/screen/Detail';
import IButton from './src/components/IButton';
import MyBottomSheet from './src/components/BottomSheet/MyBottomSheet';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactQueryProvider from './src/reactQuery/proovider';
import {TouchableOpacity} from 'react-native';
import List from './src/screen/List';

function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const BottomTabScreen = () => {
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

  return (
    <ReactQueryProvider>
      <GestureHandlerRootView style={{flex: 1, backgroundColor: '#fff'}}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerRight(props) {
                return <IButton title="menu" buttonStyle="menu" />;
              },
            }}>
            <Stack.Screen name="bottom" component={BottomTabScreen} />
            <Stack.Screen
              name="list"
              component={List}
              options={{
                headerShown: true,
                title: '리스트',
                headerRight(props) {
                  return <IButton title="menu" buttonStyle="menu" />;
                },
              }}
            />
            <Stack.Screen
              name="detail"
              component={Detail}
              options={{
                headerTransparent: true,
                headerTitle: '',
                headerShown: true,
                headerLeft() {
                  const navigation = useNavigation();
                  return (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Icon
                        name="chevron-back-outline"
                        size={24}
                        style={{color: 'gray', opacity: 1}}
                      />
                    </TouchableOpacity>
                  );
                },
              }}
            />
          </Stack.Navigator>
          <MyBottomSheet />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ReactQueryProvider>
  );
}

export default App;
