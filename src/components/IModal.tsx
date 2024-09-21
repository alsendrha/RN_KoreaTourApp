import {Keyboard, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {iHeight, iWidth} from '../../globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IInput from './IInput';
import IButton from './IButton';
import PasswordCheck from './Modal/PasswordCheck';
import UpdatePassword from './Modal/UpdatePassword';
import {useGetUser} from '../api/firebase';
import {passwordValidation} from '../utils/validation';
import {useLoading} from '../store/store';
import Loading from './Loading';
import auth, {reauthenticateWithCredential} from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {showToast} from '../utils/showToast';

type IModalProps = {
  passwordClicked: boolean;
  setPasswordClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const IModal = ({passwordClicked, setPasswordClicked}: IModalProps) => {
  const [userPassword, setUserPassword] = useState('');
  const [updatePassword, setUpdatePassword] = useState(false);
  const {data} = useGetUser();
  const {setLoading} = useLoading();
  const [passwordInfo, setPasswordInfo] = useState({
    userPassword: '',
    passwordCheck: '',
  });

  const [updateErrorMsg, setUpdateErrorMsg] = useState({
    userPassword: '',
    passwordCheck: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const handlePasswordCheck = async () => {
    if (!userPassword) {
      setErrorMsg('비밀번호를 입력해주세요.');
      return;
    }

    const password = await AsyncStorage.getItem('userPassword');
    if (userPassword === password) {
      setUpdatePassword(true);
      Keyboard.dismiss();
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      Keyboard.dismiss();
    }
  };

  const handleUpdatePassword = async (password: string) => {
    const check = passwordValidation({
      password: userPassword,
      userPassword: passwordInfo.userPassword,
      passwordCheck: passwordInfo.passwordCheck,
      errorMsg: updateErrorMsg,
      setErrorMsg: setUpdateErrorMsg,
    });
    try {
      if (check) {
        setLoading(true);
        Keyboard.dismiss();
        const authCredential = auth.EmailAuthProvider.credential(
          data?.email!,
          password,
        );
        const authCheck = await reauthenticateWithCredential(
          data!,
          authCredential,
        );

        await data?.updatePassword(passwordInfo.userPassword);
        showToast({
          text: '비밀번호가 변경되었습니다.',
          milliseconds: 3000,
          fontSize: 15,
        });
        setLoading(false);
        setPasswordClicked(false);
        setUpdatePassword(false);
        setUserPassword('');
        setPasswordInfo({userPassword: '', passwordCheck: ''});
        setUpdateErrorMsg({userPassword: '', passwordCheck: ''});
        await AsyncStorage.setItem('userPassword', passwordInfo.userPassword);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPasswordClicked(false);
    setUpdatePassword(false);
    setUserPassword('');
    setPasswordInfo({userPassword: '', passwordCheck: ''});
    setUpdateErrorMsg({userPassword: '', passwordCheck: ''});
  };

  return (
    <Modal visible={passwordClicked} transparent={true}>
      <Loading />
      <Pressable
        onPress={() => Keyboard.dismiss()}
        style={styles.modalBackground}>
        <View style={styles.modalContentView}>
          <View>
            <Text style={styles.titleText}>비밀번호 변경</Text>
          </View>
          {!updatePassword ? (
            <PasswordCheck
              userPassword={userPassword}
              setUserPassword={setUserPassword}
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
            />
          ) : (
            <UpdatePassword
              passwordInfo={passwordInfo}
              setPasswordInfo={setPasswordInfo}
              updateErrorMsg={updateErrorMsg}
              setUpdateErrorMsg={setUpdateErrorMsg}
            />
          )}
          <View style={styles.buttonContainer}>
            <IButton
              buttonStyle="modal"
              title="취소"
              borderLeftWidth={0}
              borderRightWidth={0}
              onPress={handleCancel}
            />
            <IButton
              buttonStyle="modal"
              title="확인"
              borderRightWidth={0}
              borderLeftWidth={0}
              backgroundColor="#4E8DF2"
              titleColor="white"
              titleWeight="bold"
              onPress={() =>
                !updatePassword
                  ? handlePasswordCheck()
                  : handleUpdatePassword(userPassword)
              }
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default IModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  modalContentView: {
    marginHorizontal: iWidth * 30,
    paddingTop: iWidth * 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonContainer: {
    marginTop: iHeight * 10,
    flexDirection: 'row',
    width: '100%',
  },
});
