import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {colors, iWidth} from '../../globalStyle';
import {useSignIn} from '../api/firebase';
import IButton from '../components/IButton';
import IInput from '../components/IInput';
import IText from '../components/IText';
import PasswordModal from '../components/SignIn/PasswordModal';
import {loginCheck} from '../utils/validation';
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
              onPress: async () => {
                await AsyncStorage.setItem('userPassword', userData.password);
                navigation.navigate('homeTab');
                setUserData({email: '', password: ''});
              },
            },
          ]);
          await AsyncStorage.setItem('userId', data.user?.uid);
        },
        onError: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.log('회원가입 error', error);
      setIsLoading(false);
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
          <IText fontStyle="fB" fontSize={30} text={'Login'} />
          <View style={styles.inputContainer}>
            <IInput
              value={userData.email}
              borderRadius={iWidth * 10}
              titleEnable={true}
              titleText="email"
              height={iWidth * 40}
              keyboardType="email-address"
              errorMsg={true}
              errorText={errorMsg.email}
              maxLength={30}
              deleteValue={() => setUserData({...userData, email: ''})}
              onChangeText={text => {
                setUserData({...userData, email: text});
                setErrorMsg({...errorMsg, email: ''});
              }}
            />
            <IInput
              value={userData.password}
              borderRadius={iWidth * 10}
              titleEnable={true}
              titleText="password"
              height={iWidth * 40}
              secureTextEntry={true}
              errorMsg={true}
              errorText={errorMsg.password}
              maxLength={15}
              deleteValue={() => setUserData({...userData, password: ''})}
              onChangeText={text => {
                setUserData({...userData, password: text});
                setErrorMsg({...errorMsg, password: ''});
              }}
            />
            <View style={{alignItems: 'center'}}>
              <IButton
                buttonStyle="submit"
                border={0}
                backgroundColor={colors.primary}
                title="로그인"
                titleColor="white"
                fontStyle="fB"
                onPress={userSignIn}
              />
            </View>
            <View style={{paddingTop: iWidth * 12, gap: iWidth * 4}}>
              <View style={styles.buttonContainer}>
                <IText
                  fontStyle="fR"
                  fontSize={14}
                  text={'비밀번호가 생각이 안난다면'}
                />
                <IButton
                  buttonStyle="more"
                  title="비밀번호 찾기"
                  fontSize={14}
                  titleColor="#4E8DF2"
                  onPress={() => setIsOpen(true)}
                />
              </View>
              <View style={styles.buttonContainer}>
                <IText
                  fontStyle="fR"
                  fontSize={14}
                  text={'아직 회원이 아니시라면'}
                />

                <IButton
                  buttonStyle="more"
                  title="회원가입"
                  fontSize={14}
                  titleColor="#4E8DF2"
                  onPress={() => navigation.navigate('signUp')}
                />
              </View>
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
    backgroundColor: colors.primary,
    justifyContent: 'flex-end',
  },

  loginView: {
    width: '100%',
    height: '85%',
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: iWidth * 100,
    paddingHorizontal: iWidth * 20,
    paddingTop: iWidth * 70,
    alignItems: 'center',
    gap: iWidth * 30,
  },

  inputContainer: {
    width: '100%',
    justifyContent: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: iWidth * 4,
  },
});
