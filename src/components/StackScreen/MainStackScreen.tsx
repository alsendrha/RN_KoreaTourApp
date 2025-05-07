import {ParamListBase, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {iWidth} from '../../../globalStyle';
import List from '../../screen/List';
import Main from '../../screen/Main';
import {useAreaSelected, useContentsSelected} from '../../store/store';
import IButton from '../IButton';
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
    </Stack.Navigator>
  );
};

export default MainStackScreen;

const styles = StyleSheet.create({});
