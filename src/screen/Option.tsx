import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import IInput from '../components/IInput';
import IButton from '../components/IButton';
import {signUp} from '../api/firebase';
import {all} from 'axios';

const Option = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const userSignUp = async () => {
    try {
      // await signUp(user);
      Alert.alert('회원가입 성공');
    } catch (error) {
      console.log('회원가입 error', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,

        justifyContent: 'center',
        borderWidth: 1,
      }}>
      <IInput
        value={user.email}
        maxLength={20}
        borderRadius={10}
        placeholder="이메일을 입력해주세요"
        onChangeText={text => setUser({...user, email: text})}
      />
      <IInput
        value={user.password}
        maxLength={20}
        borderRadius={10}
        placeholder="암호를 입력해주세요"
        onChangeText={text => setUser({...user, password: text})}
      />
      <IButton buttonStyle="submit" title="확인" onPress={userSignUp} />
    </View>
  );
};

export default Option;
