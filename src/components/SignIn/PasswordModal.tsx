import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {iHeight, iWidth} from '../../../globalStyle';
import IInput from '../IInput';
import IButton from '../IButton';
import {userPasswordReset} from '../../api/firebase';

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
  console.log('isOpen', isOpen);
  console.log('userEmail', userEmail);
  console.log('isLoading', isLoading);
  return (
    <View>
      <Modal animationType="fade" visible={isOpen} transparent={true}>
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPress={() => {
            setIsOpen(false);
            setUserEmail('');
          }}>
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              Keyboard.dismiss();
            }}
            activeOpacity={1}>
            {isLoading ? (
              <View
                style={[
                  styles.modalView,
                  {
                    height: iHeight * 199,
                    paddingVertical: 0,
                    justifyContent: 'center',
                  },
                ]}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <View style={styles.modalView}>
                <Text style={styles.titleText}>비밀번호 재설정</Text>
                <View style={styles.inputContainer}>
                  <IInput
                    value={userEmail}
                    borderRadius={10}
                    maxLength={30}
                    onChangeText={setUserEmail}
                    placeholder="이메일"
                  />
                </View>
                <IButton
                  title="전송"
                  buttonStyle="submit"
                  backgroundColor="#E07039"
                  border={0}
                  titleColor="white"
                  onPress={() => passwordReset()}
                />
              </View>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
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
    margin: iWidth * 25,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: iWidth * 30,
    elevation: 5,
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  inputContainer: {
    paddingHorizontal: iWidth * 20,
    width: '100%',
    marginVertical: iWidth * 20,
  },
});
