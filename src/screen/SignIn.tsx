import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {signIn} from '../api/firebase';

const SignIn = () => {
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
