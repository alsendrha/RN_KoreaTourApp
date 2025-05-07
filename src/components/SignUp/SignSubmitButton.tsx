import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, iWidth} from '../../../globalStyle';
import IButton from '../IButton';

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
        backgroundColor={colors.primary}
        titleColor="white"
        onPress={onPress}
      />
    </View>
  );
};

export default SignSubmitButton;

const styles = StyleSheet.create({
  container: {
    marginTop: iWidth * 20,
    width: '100%',
    alignItems: 'center',
  },
});
