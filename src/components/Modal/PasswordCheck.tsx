import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IInput from '../IInput';
import {iHeight} from '../../../globalStyle';

type PasswordCheckProps = {
  userPassword: string;
  setUserPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
};

const PasswordCheck = ({
  userPassword,
  setUserPassword,
  errorMsg,
  setErrorMsg,
}: PasswordCheckProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentTextContainer}>
        <Text style={styles.contentText}>기존 비밀번호를 입력해주세요</Text>
      </View>
      <View>
        <IInput
          value={userPassword}
          borderRadius={20}
          secureTextEntry={true}
          deleteValue={() => setUserPassword('')}
          onChangeText={text => {
            setUserPassword(text);
            setErrorMsg('');
          }}
          errorMsg={true}
          errorText={errorMsg}
        />
      </View>
    </View>
  );
};

export default PasswordCheck;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  contentTextContainer: {
    marginVertical: iHeight * 15,
  },

  contentText: {
    // fontSize: 14,
  },
});
