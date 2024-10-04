import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IButton from '../IButton';
import {iHeight} from '../../../globalStyle';

type SignSubmitButtonProps = {
  onPress: () => void;
};

const SignSubmitButton = ({onPress}: SignSubmitButtonProps) => {
  return (
    <View style={styles.container}>
      <IButton
        buttonStyle="submit"
        title="회원가입"
        border={0}
        backgroundColor="#E07039"
        titleColor="white"
        onPress={onPress}
      />
    </View>
  );
};

export default SignSubmitButton;

const styles = StyleSheet.create({
  container: {
    marginTop: iHeight * 20,
    width: '100%',
    alignItems: 'center',
  },
});
