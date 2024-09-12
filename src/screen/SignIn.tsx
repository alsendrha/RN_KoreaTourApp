import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {signIn} from '../api/firebase';
import {useNavigationState} from '@react-navigation/native';
import {usePageInfo} from '../store/store';

const SignIn = () => {
  const {setPageInfo} = usePageInfo();
  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index]; // 현재 활성화된 스크린
    return route.name; // 활성화된 스크린의 이름 반환
  });

  useEffect(() => {
    setPageInfo(currentRouteName);
  }, [currentRouteName]);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const userSignIn = async () => {
    try {
      await signIn(userData);
      Alert.alert('로그인 성공');
      setUserData({email: '', password: ''});
    } catch (error) {
      console.log('회원가입 error', error);
    }
  };

  return (
    <View>
      <Text>SignIn</Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
