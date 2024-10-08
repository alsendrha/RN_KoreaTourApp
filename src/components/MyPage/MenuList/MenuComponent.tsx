import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {useGetUser, useSignOut} from '../../../api/firebase';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MenuComponentProps = {
  menu: {
    title: string;
    icon: string;
  };
};

const MenuComponent = ({menu}: MenuComponentProps) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {data, refetch} = useGetUser();
  const {mutate, isSuccess} = useSignOut();

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('homeTab');
      refetch();
    }
  }, [isSuccess]);

  if (menu.title === '로그아웃' && !data) {
    return null;
  }

  const handleSubmit = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (menu.title === '나의 정보') {
      if (!userId) {
        Alert.alert('로그인이 필요한 서비스입니다.', '', [
          {
            text: '확인',
            onPress: () => navigation.navigate('signIn'),
          },
        ]);

        return null;
      } else {
        navigation.navigate('myStatus');
      }
    } else if (menu.title === '공지사항') {
      navigation.navigate('notice');
    } else if (menu.title === '내 후기글') {
      if (!userId) {
        Alert.alert('로그인이 필요한 서비스입니다.', '', [
          {
            text: '확인',
            onPress: () => navigation.navigate('signIn'),
          },
        ]);
        return null;
      } else {
        navigation.navigate('myReview');
      }
    } else if (menu.title === '앱정보') {
      navigation.navigate('appInfo');
    } else if (menu.title === '로그아웃') {
      mutate();
    }
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleSubmit}>
      <View style={styles.menuContainer}>
        <Icon name={menu.icon} size={24} color="#7A2900" />
        <Text style={styles.menuTitleText}>{menu.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuComponent;

const styles = StyleSheet.create({
  menuContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 4,
  },

  menuTitleText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
