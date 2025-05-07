import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {Keyboard, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {colors, iWidth} from '../../globalStyle';
import CustomIndicator from '../components/CustomIndicator';
import SignEmail from '../components/SignUp/SignEmail';
import SignNickname from '../components/SignUp/SignNickname';
import SignPassword from '../components/SignUp/SignPassword';
import SignPasswordCheck from '../components/SignUp/SignPasswordCheck';
import SignSubmitButton from '../components/SignUp/SignSubmitButton';
import SignTitle from '../components/SignUp/SignTitle';
import {userSignUp} from '../service/SignUp';
import {emailCheck, nicknameCheck} from '../utils/validation';
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
  return (
    <Pressable
      style={[styles.container, {position: 'relative'}]}
      onPress={() => Keyboard.dismiss()}>
      <View style={styles.contentContainer}>
        {isLoading && <CustomIndicator marginTop={iWidth * -30} />}
        <ScrollView
          overScrollMode="never"
          contentContainerStyle={{gap: iWidth * 4}}>
          <SignTitle />
          <SignEmail
            value={userData.email}
            deleteValue={() => setUserData({...userData, email: ''})}
            errorText={errorMsg.email}
            onChangeText={text => {
              setUserData({...userData, email: text.trim()});
              setErrorMsg({...errorMsg, email: ''});
            }}
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
          <SignPassword
            value={userData.password}
            deleteValue={() => setUserData({...userData, password: ''})}
            errorText={errorMsg.password}
            onChangeText={text => {
              setUserData({...userData, password: text.trim()});
              setErrorMsg({...errorMsg, password: ''});
            }}
          />
          <SignPasswordCheck
            value={userData.passwordCheck}
            deleteValue={() => setUserData({...userData, passwordCheck: ''})}
            errorText={errorMsg.passwordCheck}
            onChangeText={text => {
              setUserData({...userData, passwordCheck: text.trim()});
              setErrorMsg({...errorMsg, passwordCheck: ''});
            }}
          />
          <SignNickname
            value={userData.nickname}
            deleteValue={() => setUserData({...userData, nickname: ''})}
            errorText={errorMsg.nickname}
            onChangeText={text => {
              setUserData({...userData, nickname: text});
              setErrorMsg({...errorMsg, nickname: ''});
            }}
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
          <SignSubmitButton
            onPress={() =>
              userSignUp({
                userData,
                errorMsg,
                setErrorMsg,
                checkEmailAndNickname,
                setIsLoading,
                setUserData,
                setCheckEmailAndNickname,
                navigation,
              })
            }
          />
        </ScrollView>
      </View>
    </Pressable>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: iWidth * 12,
    justifyContent: 'center',
  },

  contentContainer: {
    backgroundColor: colors.white,
    borderRadius: iWidth * 50,
    paddingVertical: iWidth * 40,
  },
});
