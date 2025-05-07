import React from 'react';
import {StyleSheet, View} from 'react-native';
import {iWidth} from '../../../globalStyle';
import IInput from '../IInput';
import IText from '../IText';

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
      <IText fontStyle="fR" text={'기존 비밀번호를 입력해주세요'} />
      <IInput
        value={userPassword}
        borderRadius={iWidth * 20}
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
  );
};

export default PasswordCheck;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: iWidth * 12,
  },
});
