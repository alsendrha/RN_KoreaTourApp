import {
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Keyboard,
  ScrollView,
  Text,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import IInput from '../components/IInput';
import IButton from '../components/IButton';
import {createUser, signUp} from '../api/firebase';
import {colors, iHeight, iWidth} from '../../globalStyle';
import {
  duplicationAndNullCheck,
  emailCheck,
  nicknameCheck,
} from '../utils/validation';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import CustomIndicator from '../components/CustomIndicator';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkEmailAndNickname, setCheckEmailAndNickname] = useState({
    email: false,
    nickname: false,
  });
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });
  const [errorMsg, setErrorMsg] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const userSignUp = async () => {
    try {
      const check = await duplicationAndNullCheck({
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
      console.log('회원가입 확인', check);
      setIsLoading(true);
      const {user} = await signUp(userData);
      console.log('로그인 확인', user);
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

  const yoyo = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'signIn'}],
    });
  };

  return (
    <Pressable
      style={[styles.container, {position: 'relative'}]}
      onPress={() => Keyboard.dismiss()}>
      <View>
        {isLoading && <CustomIndicator marginTop={iHeight * -30} />}
        <View style={styles.inputAllContainer}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginBottom: iHeight * 40,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 24}}>회원가입</Text>
          </View>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: iWidth * 220}}>
                <IInput
                  value={userData.email}
                  titleEnable={true}
                  titleText="이메일"
                  maxLength={20}
                  height={iHeight * 40}
                  fontSize={16}
                  borderRadius={10}
                  placeholder="이메일을 입력해주세요"
                  errorMsg={true}
                  errorText={errorMsg.email}
                  onChangeText={text => {
                    setUserData({...userData, email: text.trim()});
                    setErrorMsg({...errorMsg, email: ''});
                  }}
                />
              </View>
              <View style={{flex: 1, marginRight: 15}}>
                <IButton
                  title="확인"
                  buttonStyle="check"
                  onPress={() =>
                    emailCheck({
                      errorMsg,
                      setErrorMsg,
                      checkEmailAndNickname,
                      setCheckEmailAndNickname,
                      email: userData.email,
                    })
                  }
                />
              </View>
            </View>
            <IInput
              value={userData.password}
              titleEnable={true}
              titleText="비밀번호"
              maxLength={20}
              height={iHeight * 40}
              borderRadius={10}
              placeholder="비밀번호를 입력해주세요"
              errorMsg={true}
              errorText={errorMsg.password}
              onChangeText={text => {
                setUserData({...userData, password: text.trim()});
                setErrorMsg({...errorMsg, password: ''});
              }}
            />
            <IInput
              value={userData.passwordCheck}
              titleEnable={true}
              titleText="비밀번호 확인"
              maxLength={20}
              height={iHeight * 40}
              borderRadius={10}
              placeholder="비밀번호를 다시 입력해주세요"
              errorMsg={true}
              errorText={errorMsg.passwordCheck}
              onChangeText={text => {
                setUserData({...userData, passwordCheck: text.trim()});
                setErrorMsg({...errorMsg, passwordCheck: ''});
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: iWidth * 220}}>
                <IInput
                  value={userData.nickname}
                  titleEnable={true}
                  titleText="닉네임"
                  maxLength={20}
                  borderRadius={10}
                  height={iHeight * 40}
                  placeholder="닉네임을 입력해주세요"
                  errorMsg={true}
                  errorText={errorMsg.nickname}
                  onChangeText={text => {
                    setUserData({...userData, nickname: text});
                    setErrorMsg({...errorMsg, nickname: ''});
                  }}
                />
              </View>
              <View style={{flex: 1, marginRight: 15}}>
                <IButton
                  title="확인"
                  buttonStyle="check"
                  onPress={() =>
                    nicknameCheck({
                      errorMsg,
                      setErrorMsg,
                      checkEmailAndNickname,
                      setCheckEmailAndNickname,
                      nickname: userData.nickname,
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <IButton buttonStyle="submit" title="회원가입" onPress={yoyo} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Pressable>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },

  inputAllContainer: {
    marginTop: iHeight * 80,
    paddingHorizontal: iWidth * 30,
  },

  buttonContainer: {
    marginTop: iHeight * 20,
    width: '100%',
    alignItems: 'center',
  },
});
