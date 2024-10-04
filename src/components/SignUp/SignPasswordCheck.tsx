import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IInput from '../IInput';
import {iHeight} from '../../../globalStyle';

type SignPasswordCheckProps = {
  value: string;
  deleteValue: () => void;
  errorText: string;
  onChangeText: (text: string) => void;
};

const SignPasswordCheck = ({
  value,
  deleteValue,
  errorText,
  onChangeText,
}: SignPasswordCheckProps) => {
  return (
    <IInput
      value={value}
      titleEnable={true}
      deleteValue={deleteValue}
      titleText="비밀번호 확인"
      secureTextEntry={true}
      maxLength={20}
      fontSize={16}
      height={iHeight * 40}
      borderRadius={10}
      placeholder="비밀번호를 다시 입력해주세요"
      errorMsg={true}
      errorText={errorText}
      onChangeText={onChangeText}
    />
  );
};

export default SignPasswordCheck;

const styles = StyleSheet.create({});
