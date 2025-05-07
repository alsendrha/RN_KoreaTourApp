import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {iWidth, normalizeFont} from '../../../../globalStyle';
import IButton from '../../IButton';
import IInput from '../../IInput';

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
    <View style={styles.inputContainer}>
      <View style={styles.inputMainContainer}>
        <IInput
          titleEnable={true}
          height={iWidth * 50}
          fontSize={normalizeFont(16)}
          titleText="이메일"
          value={userData.id}
          borderRadius={iWidth * 10}
          maxLength={30}
          deleteIcon={false}
          editable={false}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.inputMainContainer}>
          <IInput
            titleEnable={true}
            height={iWidth * 50}
            fontSize={normalizeFont(16)}
            titleText="닉네임"
            errorMsg={true}
            errorText={errorMsg.nickname}
            value={userData.nickname}
            onChangeText={text => setUserData({...userData, nickname: text})}
            borderRadius={iWidth * 10}
            maxLength={30}
            deleteIcon={false}
          />
        </View>
      )}
      <IButton buttonStyle="more" onPress={() => setPasswordClicked(true)}>
        <View style={styles.passwordContainer}>
          <Text style={{color: 'black'}}>비밀번호 변경</Text>
        </View>
      </IButton>
    </View>
  );
};

export default InputAndPassword;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: iWidth * 75,
    paddingHorizontal: iWidth * 15,
  },

  inputMainContainer: {
    marginTop: iWidth * 10,
  },

  passwordContainer: {
    height: iWidth * 50,
    borderWidth: 0.5,
    borderRadius: iWidth * 10,
    marginVertical: iWidth * 10,
    marginHorizontal: iWidth * 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
