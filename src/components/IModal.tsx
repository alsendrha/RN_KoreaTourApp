import {Keyboard, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, iHeight, iWidth} from '../../globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IInput from './IInput';
import IButton from './IButton';
import PasswordCheck from './Modal/PasswordCheck';
import UpdatePassword from './Modal/UpdatePassword';
import {useGetUser, useUserDelete} from '../api/firebase';
import {passwordValidation} from '../utils/validation';
import {useLoading} from '../store/store';
import Loading from './Loading';
import auth, {reauthenticateWithCredential} from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {showToast} from '../utils/showToast';
import PasswordModal from './Modal/PasswordModal';
import UserDeleteModal from './Modal/UserDeleteModal';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

type IModalProps = {
  passwordClicked: boolean;
  setPasswordClicked: React.Dispatch<React.SetStateAction<boolean>>;
  userDelete: boolean;
  setUserDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const IModal = ({
  passwordClicked,
  setPasswordClicked,
  userDelete,
  setUserDelete,
}: IModalProps) => {
  const [userPassword, setUserPassword] = useState('');
  const [updatePassword, setUpdatePassword] = useState(false);
  const {data} = useGetUser();
  const {mutate} = useUserDelete();
  const {setLoading} = useLoading();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
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

  const handlePasswordModal = (updatePassword: boolean) => {
    !updatePassword
      ? handlePasswordCheck()
      : handleUpdatePassword(userPassword);
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
        await reauthenticateWithCredential(data!, authCredential);

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

  const handleUserDelete = async () => {
    try {
      setLoading(true);
      const userDelete = await data?.delete();
      console.log('탈퇴', userDelete);
      if (userDelete === undefined) {
        mutate(data?.uid!, {
          onSuccess: async () => {
            showToast({
              text: '회원탈퇴가 완료되었습니다.',
              milliseconds: 3000,
              fontSize: 15,
            });
            setLoading(false);
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('userPassword');
            setUserDelete(false);
            navigation.navigate('homeTab');
          },
        });
      } else {
        setLoading(false);
        showToast({
          text: '회원탈퇴에 실패했습니다.',
          milliseconds: 3000,
          fontSize: 15,
        });
        setUserDelete(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleCancel = () => {
    setPasswordClicked(false);
    setUserDelete(false);
    setUpdatePassword(false);
    setUserPassword('');
    setPasswordInfo({userPassword: '', passwordCheck: ''});
    setUpdateErrorMsg({userPassword: '', passwordCheck: ''});
  };

  return (
    <Modal visible={passwordClicked || userDelete} transparent={true}>
      <Loading />
      <Pressable
        onPress={() => Keyboard.dismiss()}
        style={styles.modalBackground}>
        <View style={styles.modalContentView}>
          <View>
            <Text style={styles.titleText}>
              {passwordClicked ? '비밀번호 변경' : '회원탈퇴'}
            </Text>
          </View>
          {passwordClicked ? (
            <PasswordModal
              updatePassword={updatePassword}
              userPassword={userPassword}
              setUserPassword={setUserPassword}
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              passwordInfo={passwordInfo}
              setPasswordInfo={setPasswordInfo}
              updateErrorMsg={updateErrorMsg}
              setUpdateErrorMsg={setUpdateErrorMsg}
            />
          ) : (
            <UserDeleteModal />
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
              backgroundColor={passwordClicked ? '#4E8DF2' : colors.warning}
              titleColor="white"
              titleWeight="bold"
              onPress={() =>
                passwordClicked
                  ? handlePasswordModal(updatePassword)
                  : handleUserDelete()
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
