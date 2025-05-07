import React from 'react';
import {StyleSheet} from 'react-native';
import {iWidth, normalizeFont} from '../../../globalStyle';
import IInput from '../IInput';

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
      fontSize={normalizeFont(16)}
      height={iWidth * 40}
      borderRadius={iWidth * 12}
      placeholder="비밀번호를 다시 입력해주세요"
      errorMsg={true}
      errorText={errorText}
      onChangeText={onChangeText}
    />
  );
};

export default SignPasswordCheck;

const styles = StyleSheet.create({});
