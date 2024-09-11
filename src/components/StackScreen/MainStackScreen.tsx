import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabScreen from '../MainTabBar/BottomTabScreen';
import List from '../../screen/List';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import IButton from '../IButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Detail from '../../screen/Detail';
import {
  useAreaSelected,
  useBottomSheetRef,
  useContentsSelected,
} from '../../store/store';
import Main from '../../screen/Main';

type MainStackScreenProps = {
  navigation: NavigationProp<ParamListBase>;
  route: any;
};

const MainStackScreen = ({navigation, route}: MainStackScreenProps) => {
  const Stack = createNativeStackNavigator();
  const {areaSelected, setAreaSelected} = useAreaSelected();
  const {contentTitle, setContentsSelected} = useContentsSelected();
  console.log(route.name);
  useEffect(() => {
    if (route.name === 'undefined') {
      navigation.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }
  }, [route.name]);
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
      <Stack.Screen
        name="detail"
        component={Detail}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShown: true,
          headerLeft() {
            const {bottomSheetRef} = useBottomSheetRef();
            return (
              <IButton
                buttonStyle="back"
                onPress={() => {
                  bottomSheetRef.current?.close();
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

export default MainStackScreen;

const styles = StyleSheet.create({});
