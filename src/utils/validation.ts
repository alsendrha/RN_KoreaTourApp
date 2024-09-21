import fireStore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {
  DuplicationAndNullCheckType,
  EmailAndNicknameCheck,
  LoginDuplicationAndNullCheckType,
  nameCheck,
  passwordCheck,
} from '../types/validationType';

export const emailCheck = async ({
  errorMsg,
  setErrorMsg,
  checkEmailAndNickname,
  setCheckEmailAndNickname,
  email,
}: EmailAndNicknameCheck) => {
  if (email === '') {
    setErrorMsg({...errorMsg, email: '이메일을 입력해주세요'});
    return;
  }
  try {
    const data = await fireStore()
      .collection('users')
      .where('email', '==', email?.trim())
      .get();
    console.log('data', data.docs);
    if (data.docs.length > 0) {
      setErrorMsg({
        ...errorMsg,
        email: '이미 존재하는 이메일입니다.',
      });
      return false;
    } else {
      setCheckEmailAndNickname({...checkEmailAndNickname, email: true});
      Alert.alert('사용 가능한 이메일입니다.');
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const nicknameCheck = async ({
  errorMsg,
  setErrorMsg,
  checkEmailAndNickname,
  setCheckEmailAndNickname,
  nickname,
}: EmailAndNicknameCheck) => {
  if (nickname === '') {
    setErrorMsg({...errorMsg, nickname: '닉네임을 입력해주세요'});
    return false;
  }
  try {
    const data = await fireStore()
      .collection('users')
      .where('nickname', '==', nickname?.trim())
      .get();
    console.log('data', data.docs);
    if (data.docs.length > 0) {
      setErrorMsg({
        ...errorMsg,
        nickname: '이미 존재하는 닉네임입니다.',
      });
      return false;
    } else {
      setCheckEmailAndNickname({...checkEmailAndNickname, nickname: true});
      Alert.alert('사용 가능한 닉네임입니다.');
      return true;
    }
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const CheckedNickname = async ({setErrorMsg, nickname}: nameCheck) => {
  if (nickname === '') {
    setErrorMsg({nickname: '닉네임을 입력해주세요'});
    return false;
  }
  try {
    const data = await fireStore()
      .collection('users')
      .where('nickname', '==', nickname?.trim())
      .get();

    if (data.docs.length > 0) {
      setErrorMsg({
        nickname: '이미 존재하는 닉네임입니다.',
      });
      return false;
    } else {
      setErrorMsg({
        nickname: '사용 가능한 닉네임입니다.',
      });
      return true;
    }
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const duplicationAndNullCheck = ({
  email,
  password,
  passwordCheck,
  nickname,
  errorMsg,
  setErrorMsg,
}: DuplicationAndNullCheckType) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const NicknameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
  if (email === '') {
    setErrorMsg({...errorMsg, email: '이메일을 입력해주세요'});
    return false;
  } else if (!emailRegex.test(email)) {
    setErrorMsg({...errorMsg, email: '잘못된 이메일 형식입니다.'});
    return false;
  }
  if (password === '') {
    setErrorMsg({...errorMsg, password: '비밀번호를 입력해주세요'});
    return false;
  } else if (password.length < 6) {
    setErrorMsg({...errorMsg, password: '비밀번호는 6자리 이상입니다.'});
    return false;
  }
  if (passwordCheck === '') {
    setErrorMsg({...errorMsg, passwordCheck: '비밀번호를 입력해주세요'});
    return false;
  } else if (password !== passwordCheck) {
    setErrorMsg({
      ...errorMsg,
      passwordCheck: '비밀번호가 일치하지 않습니다.',
    });
    return false;
  }
  if (nickname === '') {
    setErrorMsg({...errorMsg, nickname: '닉네임을 입력해주세요'});
    return false;
  } else if (nickname.length < 2) {
    setErrorMsg({...errorMsg, nickname: '닉네임은 2자리 이상입니다.'});
    return false;
  } else if (!NicknameRegex.test(nickname)) {
    setErrorMsg({...errorMsg, nickname: '특수문자는 사용할 수 없습니다.'});
    return false;
  }
  return true;
};

export const loginCheck = ({
  email,
  password,
  errorMsg,
  setErrorMsg,
}: LoginDuplicationAndNullCheckType) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  if (email === '') {
    setErrorMsg({...errorMsg, email: '이메일을 입력해주세요'});
    return false;
  } else if (!emailRegex.test(email)) {
    setErrorMsg({...errorMsg, email: '잘못된 이메일 형식입니다.'});
    return false;
  }
  if (password === '') {
    setErrorMsg({...errorMsg, password: '비밀번호를 입력해주세요'});
    return false;
  } else if (password.length < 6) {
    setErrorMsg({...errorMsg, password: '비밀번호는 6자리 이상입니다.'});
    return false;
  }
  return true;
};

export const passwordValidation = ({
  password,
  userPassword,
  passwordCheck,
  errorMsg,
  setErrorMsg,
}: passwordCheck) => {
  if (userPassword === '') {
    setErrorMsg({...errorMsg, userPassword: '비밀번호를 입력해주세요'});
    return false;
  } else if (userPassword === password) {
    setErrorMsg({...errorMsg, userPassword: '기존 비밀번호와 동일합니다.'});
    return false;
  } else if (userPassword.length < 6) {
    setErrorMsg({...errorMsg, userPassword: '비밀번호는 6자리 이상입니다.'});
    return false;
  }

  if (passwordCheck === '') {
    setErrorMsg({...errorMsg, passwordCheck: '비밀번호 확인을 입력해주세요'});
    return false;
  } else if (userPassword !== passwordCheck) {
    setErrorMsg({...errorMsg, passwordCheck: '비밀번호가 일치하지 않습니다.'});
    return false;
  }

  return true;
};
