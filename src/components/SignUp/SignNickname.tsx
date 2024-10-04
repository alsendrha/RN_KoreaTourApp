import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IInput from '../IInput';
import IButton from '../IButton';
import {iHeight, iWidth} from '../../../globalStyle';

type SignNicknameProps = {
  value: string;
  deleteValue: () => void;
  errorText: string;
  onChangeText: (text: string) => void;
  onPress: () => void;
};

const SignNickname = ({
  value,
  deleteValue,
  errorText,
  onChangeText,
  onPress,
}: SignNicknameProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{width: iWidth * 220}}>
        <IInput
          value={value}
          deleteValue={deleteValue}
          titleEnable={true}
          titleText="닉네임"
          maxLength={10}
          fontSize={16}
          lengthView={true}
          borderRadius={10}
          height={iHeight * 40}
          placeholder="닉네임을 입력해주세요"
          errorMsg={true}
          errorText={errorText}
          onChangeText={onChangeText}
        />
      </View>
      <View style={{flex: 1, marginRight: 15}}>
        <IButton
          title="확인"
          buttonStyle="check"
          backgroundColor="#C6A391"
          border={0}
          titleColor="white"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default SignNickname;

const styles = StyleSheet.create({});
