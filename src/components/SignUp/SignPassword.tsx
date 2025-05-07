import React from 'react';
import {StyleSheet} from 'react-native';
import {iWidth, normalizeFont} from '../../../globalStyle';
import IInput from '../IInput';

type SignPasswordProps = {
  value: string;
  deleteValue: () => void;
  errorText: string;
  onChangeText: (text: string) => void;
};

const SignPassword = ({
  value,
  deleteValue,
  errorText,
  onChangeText,
}: SignPasswordProps) => {
  return (
    <IInput
      value={value}
      deleteValue={deleteValue}
      titleEnable={true}
      titleText="비밀번호"
      secureTextEntry={true}
      maxLength={20}
      fontSize={normalizeFont(16)}
      height={iWidth * 40}
      borderRadius={iWidth * 10}
      placeholder="비밀번호를 입력해주세요"
      errorMsg={true}
      errorText={errorText}
      onChangeText={onChangeText}
    />
  );
};

export default SignPassword;

const styles = StyleSheet.create({});
