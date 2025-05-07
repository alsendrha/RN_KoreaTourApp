import {ParamListBase, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, iWidth} from '../../../globalStyle';
import customNavigation from '../../hooks/customNavigation';
import AppInfo from '../../screen/AppInfo';
import Detail from '../../screen/Detail';
import List from '../../screen/List';
import Notice from '../../screen/Notice';
import ReviewInsert from '../../screen/ReviewInsert';
import ReviewUpdate from '../../screen/ReviewUpdate';
import SignIn from '../../screen/SignIn';
import SignUp from '../../screen/SignUp';
import {
  useAreaSelected,
  useBottomSheetRef,
  useContentsSelected,
  usePageInfo,
} from '../../store/store';
import IButton from '../IButton';
import BottomTabScreen from '../MainTabBar/BottomTabScreen';

const AppStackScreen = () => {
  const Stack = createNativeStackNavigator();
  const {areaSelected, setAreaSelected} = useAreaSelected();
  const {contentTitle, setContentsSelected} = useContentsSelected();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
      initialRouteName="bottomTabScreen">
      <Stack.Screen name="bottomTabScreen" component={BottomTabScreen} />
      <Stack.Screen
        name="list"
        component={List}
        options={{
          headerShown: true,
          title: `${areaSelected} (${contentTitle})`,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft() {
            const navigation = customNavigation();
            return (
              <IButton
                buttonStyle="back"
                onPress={() => {
                  setAreaSelected('서울');
                  setContentsSelected(12, '관광지');
                  navigation.goBack();
                }}>
                <Icon name="chevron-back-outline" size={iWidth * 24} />
              </IButton>
            );
          },
          headerRight() {
            return (
              <IButton buttonStyle="menu">
                <Icon name="reorder-four-outline" size={iWidth * 28} />
              </IButton>
            );
          },
        }}
      />
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

            return (
              <IButton
                buttonStyle="back"
                onPress={() => {
                  bottomSheetRef.current?.close();
                  setPageInfo(previousPageName!);
                  navigation.goBack();
                }}>
                <Icon name="chevron-back-outline" size={iWidth * 24} />
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
                <Icon name="chevron-back-outline" size={iWidth * 24} />
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
                <Icon name="chevron-back-outline" size={iWidth * 24} />
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
                <Icon name="chevron-back-outline" size={iWidth * 24} />
              </IButton>
            );
          },
        }}
      />
      <Stack.Screen
        name="reviewUpdate"
        component={ReviewUpdate}
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerShown: true,
          headerLeft() {
            const navigation = useNavigation();
            return (
              <IButton
                buttonStyle="back"
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name="chevron-back-outline" size={iWidth * 24} />
              </IButton>
            );
          },
        }}
      />
      <Stack.Screen
        name="appInfo"
        component={AppInfo}
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
                <Icon name="chevron-back-outline" size={iWidth * 24} />
              </IButton>
            );
          },
        }}
      />
      <Stack.Screen
        name="notice"
        component={Notice}
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
                <Icon name="chevron-back-outline" size={iWidth * 24} />
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
