import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import IButton from '../IButton';
import Icon from 'react-native-vector-icons/Ionicons';

import SignUp from '../../screen/SignUp';
import SignIn from '../../screen/SignIn';
import MyPage from '../../screen/MyPage';

type MyPageStackScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const MyPageScreen = ({navigation}: MyPageStackScreenProps) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="myPage"
        component={MyPage}
        options={{
          headerTitle: '',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="signUp"
        component={SignUp}
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeft() {
            return (
              <IButton
                buttonStyle="back"
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name="chevron-back-outline" size={24} />
              </IButton>
            );
          },
        }}
      />
      <Stack.Screen
        name="signIn"
        component={SignIn}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShown: true,
          headerLeft() {
            return (
              <IButton
                buttonStyle="back"
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name="chevron-back-outline" size={24} />
              </IButton>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({});
