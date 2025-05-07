import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {iWidth, normalizeFont} from '../../../../globalStyle';
import IButton from '../../IButton';
import IInput from '../../IInput';
import IText from '../../IText';

type InputAndPasswordProps = {
  isLoading: boolean;
  userData: {
    id: string;
    nickname: string;
    profileImg: string;
  };
  errorMsg: {
    nickname: string;
  };
  setUserData: React.Dispatch<
    React.SetStateAction<{id: string; nickname: string; profileImg: string}>
  >;
  setPasswordClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const InputAndPassword = ({
  isLoading,
  userData,
  errorMsg,
  setUserData,
  setPasswordClicked,
}: InputAndPasswordProps) => {
  return (
    <View style={styles.container}>
      <IInput
        titleEnable={true}
        height={iWidth * 45}
        fontSize={normalizeFont(16)}
        titleText="이메일"
        value={userData.id}
        borderRadius={iWidth * 12}
        maxLength={30}
        deleteIcon={false}
        editable={false}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <IInput
          titleEnable={true}
          height={iWidth * 45}
          fontSize={normalizeFont(16)}
          titleText="닉네임"
          errorMsg={true}
          errorText={errorMsg.nickname}
          value={userData.nickname}
          onChangeText={text => setUserData({...userData, nickname: text})}
          borderRadius={iWidth * 12}
          maxLength={30}
          deleteIcon={false}
        />
      )}
      <IButton buttonStyle="more" onPress={() => setPasswordClicked(true)}>
        <View style={styles.passwordContainer}>
          <IText fontStyle="fR" text={'비밀번호 변경'} />
        </View>
      </IButton>
    </View>
  );
};

export default InputAndPassword;

const styles = StyleSheet.create({
  container: {
    paddingTop: iWidth * 75,
    gap: iWidth * 12,
  },

  passwordContainer: {
    height: iWidth * 45,
    borderWidth: 0.5,
    borderRadius: iWidth * 12,
    marginHorizontal: iWidth * 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
