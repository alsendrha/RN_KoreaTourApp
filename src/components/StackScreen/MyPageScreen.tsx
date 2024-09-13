import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import IButton from '../IButton';
import Icon from 'react-native-vector-icons/Ionicons';
import MyPage from '../../screen/MyPage';
import {usePageInfo} from '../../store/store';
import SignIn from '../../screen/SignIn';
import SignUp from '../../screen/SignUp';

const MyPageScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="myPage">
      <Stack.Screen name="myPage" component={MyPage} />
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
            const navigation = useNavigation();
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
            const navigation = useNavigation();
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
