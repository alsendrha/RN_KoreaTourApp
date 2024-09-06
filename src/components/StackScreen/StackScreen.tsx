import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabScreen from '../MainTabBar/BottomTabScreen';
import List from '../../screen/List';
import {useNavigation} from '@react-navigation/native';
import IButton from '../IButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Detail from '../../screen/Detail';
const StackScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="bottom" component={BottomTabScreen} />
      <Stack.Screen
        name="list"
        component={List}
        options={{
          headerShown: true,
          title: '',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft() {
            const navigation = useNavigation();
            return (
              <IButton buttonStyle="back" onPress={() => navigation.goBack()}>
                <Icon name="chevron-back-outline" size={24} />
              </IButton>
            );
          },
          headerRight(props) {
            return (
              <IButton buttonStyle="menu">
                <Icon name="reorder-four-outline" size={28} />
              </IButton>
            );
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
              <IButton buttonStyle="back" onPress={() => navigation.goBack()}>
                <Icon name="chevron-back-outline" size={24} />
              </IButton>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackScreen;

const styles = StyleSheet.create({});
