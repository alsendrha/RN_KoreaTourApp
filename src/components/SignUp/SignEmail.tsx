import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, iWidth, normalizeFont} from '../../../globalStyle';
import IButton from '../IButton';
import IInput from '../IInput';

type SignEmailProps = {
  value: string;
  deleteValue: () => void;
  errorText: string;
  onChangeText: (text: string) => void;
  onPress: () => void;
};

const SignEmail = ({
  value,
  deleteValue,
  errorText,
  onChangeText,
  onPress,
}: SignEmailProps) => {
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
          keyboardType="email-address"
          titleEnable={true}
          titleText="이메일"
          maxLength={30}
          lengthView={true}
          height={iWidth * 40}
          fontSize={normalizeFont(16)}
          borderRadius={iWidth * 12}
          placeholder="이메일을 입력해주세요"
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

export default SignEmail;

const styles = StyleSheet.create({});
