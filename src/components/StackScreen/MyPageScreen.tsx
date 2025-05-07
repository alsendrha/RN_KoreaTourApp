import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {iWidth} from '../../../globalStyle';
import MyPage from '../../screen/MyPage';
import MyReview from '../../screen/MyReview';
import MyStatus from '../../screen/MySatus';
import {useImagePicker} from '../../store/store';
import IButton from '../IButton';

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
        name="myStatus"
        component={MyStatus}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShown: true,
          headerLeft() {
            const navigation = useNavigation();
            const {setImageData} = useImagePicker();
            return (
              <IButton
                buttonStyle="back"
                onPress={() => {
                  setImageData({
                    uri: '',
                    type: '',
                    fileName: '',
                  });
                  navigation.goBack();
                }}>
                <Icon name="chevron-back-outline" size={iWidth * 24} />
              </IButton>
            );
          },
        }}
      />

      <Stack.Screen
        name="myReview"
        component={MyReview}
        options={{
          headerShadowVisible: false,
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

export default MyPageScreen;

const styles = StyleSheet.create({});
