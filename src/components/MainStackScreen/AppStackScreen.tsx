import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import BottomTabScreen from '../MainTabBar/BottomTabScreen';
import IButton from '../IButton';
import {useBottomSheetRef, usePageInfo} from '../../store/store';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import ReviewInsert from '../../screen/ReviewInsert';
import Detail from '../../screen/Detail';
import Icon from 'react-native-vector-icons/Ionicons';
import SignIn from '../../screen/SignIn';
import SignUp from '../../screen/SignUp';
import ReviewUpdate from '../../screen/ReviewUpdate';
const AppStackScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="bottomTabScreen">
      <Stack.Screen name="bottomTabScreen" component={BottomTabScreen} />
      <Stack.Screen
        name="detail"
        component={Detail}
        initialParams={{id: '1'}}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShown: true,
          headerLeft() {
            const {bottomSheetRef} = useBottomSheetRef();
            const {setPageInfo} = usePageInfo();
            const navigation =
              useNavigation<NativeStackNavigationProp<ParamListBase>>();
            const currentState = navigation.getState();
            const previousRoute = currentState?.routes[currentState.index - 1];
            const previousPageName = previousRoute ? previousRoute.name : null;
            console.log('이전 페이지', previousPageName);
            return (
              <IButton
                buttonStyle="back"
                onPress={() => {
                  bottomSheetRef.current?.close();
                  setPageInfo(previousPageName!);
                  navigation.goBack();
                }}>
                <Icon name="chevron-back-outline" size={24} />
              </IButton>
            );
          },
        }}
      />
      <Stack.Screen
        name="reviewInsert"
        component={ReviewInsert}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShown: true,
          headerLeft() {
            const {bottomSheetRef} = useBottomSheetRef();
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
      <Stack.Screen
        name="reviewUpdate"
        component={ReviewUpdate}
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

export default AppStackScreen;

const styles = StyleSheet.create({});
