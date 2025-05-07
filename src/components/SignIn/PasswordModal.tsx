import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {colors, iWidth} from '../../../globalStyle';
import {userPasswordReset} from '../../api/firebase';
import IButton from '../IButton';
import IInput from '../IInput';
import IText from '../IText';

type PasswordModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const PasswordModal = ({isOpen, setIsOpen}: PasswordModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  const passwordReset = async () => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (userEmail === '') {
      Alert.alert('이메일을 입력해주세요.');
      return;
    } else if (!emailRegex.test(userEmail)) {
      Alert.alert('잘못된 이메일 형식입니다.');
      return false;
    }
    try {
      setIsLoading(true);
      const userPassword = await userPasswordReset({email: userEmail});
      if (userPassword === null) {
        setIsLoading(false);
        Alert.alert('이메일을 전송했습니다.', '이메일을 확인해주세요.', [
          {
            text: '확인',
            onPress: () => {
              setIsOpen(false);
              setUserEmail('');
            },
          },
        ]);
        setMessage('이메일을 전송했습니다.');
        setUserEmail('');
      }
    } catch (error) {
      console.log('error', error);
      setMessage('이메일 전송에 실패했습니다.');
      Alert.alert('이메일 전송에 실패했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <Modal animationType="fade" visible={isOpen} transparent={true}>
      <Pressable
        style={styles.centeredView}
        onPress={() => {
          setIsOpen(false);
          setUserEmail('');
        }}>
        <Pressable
          onPress={e => {
            e.stopPropagation();
            Keyboard.dismiss();
          }}>
          {isLoading ? (
            <View
              style={[
                styles.modalView,
                {
                  height: iWidth * 199,
                  paddingVertical: 0,
                  justifyContent: 'center',
                },
              ]}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <View style={styles.modalView}>
              <IText fontStyle="fB" fontSize={18} text={'비밀번호 재설정'} />
              <IInput
                value={userEmail}
                borderRadius={iWidth * 12}
                height={iWidth * 40}
                maxLength={30}
                onChangeText={setUserEmail}
                placeholder="이메일"
                deleteValue={() => setUserEmail('')}
              />
              <IButton
                title="전송"
                buttonStyle="submit"
                backgroundColor={colors.primary}
                border={0}
                titleColor={colors.white}
                onPress={() => passwordReset()}
              />
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default PasswordModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  modalView: {
    marginHorizontal: iWidth * 25,
    backgroundColor: colors.white,
    borderRadius: iWidth * 20,
    alignItems: 'center',
    paddingVertical: iWidth * 30,
    elevation: 1,
    gap: iWidth * 20,
  },
});
