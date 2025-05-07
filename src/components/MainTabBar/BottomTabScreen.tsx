import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, iWidth} from '../../../globalStyle';
import {useImagePicker} from '../../store/store';
import MainStackScreen from '../StackScreen/MainStackScreen';
import MyPageScreen from '../StackScreen/MyPageScreen';

const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator();
  const {setImageData} = useImagePicker();
  useEffect(() => {
    setImageData({
      uri: '',
      type: '',
      fileName: '',
    });
  }, []);

  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'White'}}
      screenOptions={({route}) => ({
        unmountOnBlur: true,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        headerShadowVisible: false,
        headerBackgroundContainerStyle: {
          backgroundColor: 'white',
        },
        tabBarStyle: [styles.tabBarStyle],
      })}>
      <Tab.Screen
        name="homeTab"
        component={MainStackScreen}
        options={{
          tabBarIcon({focused}) {
            return (
              <Icon
                name="home-outline"
                size={iWidth * 24}
                color={focused ? colors.white : '#1E0A00'}
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
                size={iWidth * 24}
                color={focused ? colors.white : '#1E0A00'}
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
    left: iWidth * 16,
    right: iWidth * 16,
    bottom: iWidth * 10,
    height: iWidth * 56,
    borderRadius: iWidth * 20,
    backgroundColor: colors.primary,
    elevation: 2,
    shadowOffset: {width: iWidth * 0, height: iWidth * -2},
  },
});
