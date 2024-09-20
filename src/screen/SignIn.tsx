import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSignIn} from '../api/firebase';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {usePageInfo} from '../store/store';
import IInput from '../components/IInput';
import IButton from '../components/IButton';
import {loginCheck} from '../utils/validation';
import {iHeight} from '../../globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordModal from '../components/SignIn/PasswordModal';
const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {mutate} = useSignIn();
  const [errorMsg, setErrorMsg] = useState({
    email: '',
    password: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
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
    Keyboard.dismiss();
    try {
      setIsLoading(true);
      mutate(userData, {
        onSuccess: async data => {
          setIsLoading(false);
          Alert.alert('로그인 성공', '로그인 성공', [
            {
              text: '확인',
              onPress: () => {
                navigation.navigate('myPage');
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
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <View style={styles.container}>
        <View style={styles.loginView}>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Login</Text>
          </View>
          <View style={styles.inputContainer}>
            <IInput
              value={userData.email}
              borderRadius={10}
              titleEnable={true}
              titleText="email"
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
              titleEnable={true}
              titleText="password"
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
              <IButton
                buttonStyle="submit"
                border={0}
                backgroundColor="#E07039"
                title="로그인"
                titleColor="white"
                titleWeight="bold"
                onPress={userSignIn}
              />
            </View>
            <View style={styles.signUpButtonContainer}>
              <Text>비밀번호가 생각이 안난다면 </Text>
              <IButton
                buttonStyle="more"
                title="비밀번호 찾기"
                titleColor="#4E8DF2"
                onPress={() => setIsOpen(true)}
              />
            </View>
            <View
              style={[styles.signUpButtonContainer, {marginTop: iHeight * 8}]}>
              <Text>아직 회원이 아니시라면 </Text>
              <IButton
                buttonStyle="more"
                title="회원가입"
                titleColor="#4E8DF2"
                onPress={() => navigation.navigate('signUp')}
              />
            </View>
          </View>
        </View>
      </View>
      <PasswordModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Pressable>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },

  container: {
    height: '100%',
    backgroundColor: '#E07039',
    position: 'relative',
  },
  loginView: {
    position: 'absolute',
    width: '100%',
    height: '85%',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 100,
    paddingHorizontal: 20,
  },

  loginTextContainer: {
    alignItems: 'center',
    marginTop: iHeight * 70,
  },

  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    marginTop: iHeight * 30,
  },

  signUpButtonContainer: {
    marginTop: iHeight * 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
