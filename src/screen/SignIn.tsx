import {Alert, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {signIn, useSignIn} from '../api/firebase';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import {usePageInfo} from '../store/store';
import IInput from '../components/IInput';
import IButton from '../components/IButton';
import {loginCheck} from '../utils/validation';
import {iHeight} from '../../globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const {setPageInfo} = usePageInfo();
  const {mutate} = useSignIn();
  const [errorMsg, setErrorMsg] = useState({
    email: '',
    password: '',
  });
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });

  useEffect(() => {
    setPageInfo(currentRouteName);
  }, [currentRouteName]);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const userSignIn = async () => {
    const check = loginCheck({
      email: userData.email,
      password: userData.password,
      errorMsg,
      setErrorMsg,
    });
    if (!check) {
      return;
    }
    try {
      mutate(userData, {
        onSuccess: async data => {
          Alert.alert('로그인 성공', '로그인 성공', [
            {
              text: '확인',
              onPress: () => {
                navigation.goBack();
                setUserData({email: '', password: ''});
              },
            },
          ]);
          await AsyncStorage.setItem('userId', data.user?.uid);
        },
      });
    } catch (error) {
      console.log('회원가입 error', error);
    }
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <Text>로그인</Text>
        </View>
        <IInput
          value={userData.email}
          borderRadius={10}
          errorMsg={true}
          errorText={errorMsg.email}
          maxLength={30}
          onChangeText={text => {
            setUserData({...userData, email: text});
            setErrorMsg({...errorMsg, email: ''});
          }}
        />
        <IInput
          value={userData.password}
          borderRadius={10}
          secureTextEntry={true}
          errorMsg={true}
          errorText={errorMsg.password}
          maxLength={15}
          onChangeText={text => {
            setUserData({...userData, password: text});
            setErrorMsg({...errorMsg, password: ''});
          }}
        />
        <View style={{alignItems: 'center'}}>
          <IButton buttonStyle="submit" title="로그인" onPress={userSignIn} />
        </View>
        <View>
          <IButton
            buttonStyle="more"
            title="회원가입"
            onPress={() => navigation.navigate('signUp')}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {marginTop: iHeight * 200},
});
