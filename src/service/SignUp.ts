import {Alert} from 'react-native';
import {duplicationAndNullCheck} from '../utils/validation';
import {createUser, signUp} from '../api/firebase';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

type SignUpProps = {
  userData: {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
  };
  errorMsg: {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
  };
  setErrorMsg: any;
  checkEmailAndNickname: {
    email: boolean;
    nickname: boolean;
  };
  setIsLoading: any;
  setUserData: any;
  setCheckEmailAndNickname: any;
  navigation: NavigationProp<ParamListBase>;
};

export const userSignUp = async ({
  userData,
  errorMsg,
  setErrorMsg,
  checkEmailAndNickname,
  setIsLoading,
  setUserData,
  setCheckEmailAndNickname,
  navigation,
}: SignUpProps) => {
  try {
    const check = duplicationAndNullCheck({
      email: userData.email,
      password: userData.password,
      passwordCheck: userData.passwordCheck,
      nickname: userData.nickname,
      errorMsg,
      setErrorMsg,
    });
    if (!check) {
      return;
    }
    if (!checkEmailAndNickname.email || !checkEmailAndNickname.nickname) {
      Alert.alert('이메일 또는 닉네임 중복확인을 해주세요.');
      return;
    }

    setIsLoading(true);
    const {user} = await signUp(userData);

    await createUser({
      id: user.uid,
      email: userData.email,
      nickname: userData.nickname,
      profileUrl: null,
    });
    setIsLoading(false);
    Alert.alert(
      '회원가입 성공',
      '회원가입이 성공적으로 완료되었습니다.',
      [
        {
          text: '확인',
          onPress: () => {
            setUserData({
              email: '',
              password: '',
              passwordCheck: '',
              nickname: '',
            });
            setCheckEmailAndNickname({email: false, nickname: false});
            navigation.navigate('signIn');
          },
        },
      ],
      {cancelable: false},
    );
  } catch (error: any) {
    console.log('회원가입 error', error);
    if (error.code === 'auth/email-already-in-use') {
      setErrorMsg({...errorMsg, email: '이미 존재하는 이메일입니다.'});
    }
    setIsLoading(false);
  }
};
