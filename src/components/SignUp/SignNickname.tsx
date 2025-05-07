import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, iWidth, normalizeFont} from '../../../globalStyle';
import IButton from '../IButton';
import IInput from '../IInput';

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
      <View style={{flex: 3}}>
        <IInput
          value={value}
          deleteValue={deleteValue}
          titleEnable={true}
          titleText="닉네임"
          maxLength={10}
          fontSize={normalizeFont(16)}
          lengthView={true}
          borderRadius={iWidth * 12}
          height={iWidth * 40}
          placeholder="닉네임을 입력해주세요"
          errorMsg={true}
          errorText={errorText}
          onChangeText={onChangeText}
        />
      </View>
      <View style={{flex: 1, marginRight: iWidth * 16}}>
        <IButton
          title="확인"
          buttonStyle="check"
          backgroundColor={colors.secondary}
          border={0}
          titleColor={colors.white}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default SignNickname;

const styles = StyleSheet.create({});
