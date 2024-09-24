import {StyleSheet} from 'react-native';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import List from '../../screen/List';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import IButton from '../IButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAreaSelected, useContentsSelected} from '../../store/store';
import Main from '../../screen/Main';
const MainStackScreen = () => {
  const Stack = createNativeStackNavigator();
  const {areaSelected, setAreaSelected} = useAreaSelected();
  const {contentTitle, setContentsSelected} = useContentsSelected();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="main">
      <Stack.Screen name="main" component={Main} />
      <Stack.Screen
        name="list"
        component={List}
        options={{
          headerShown: true,
          title: `${areaSelected} (${contentTitle})`,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft() {
            const navigation =
              useNavigation<NativeStackNavigationProp<ParamListBase>>();
            return (
              <IButton
                buttonStyle="back"
                onPress={() => {
                  setAreaSelected('서울');
                  setContentsSelected(12, '관광지');
                  navigation.goBack();
                }}>
                <Icon name="chevron-back-outline" size={24} />
              </IButton>
            );
          },
          headerRight() {
            return (
              <IButton buttonStyle="menu">
                <Icon name="reorder-four-outline" size={28} />
              </IButton>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackScreen;

const styles = StyleSheet.create({});
