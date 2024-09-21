import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IInput from '../../IInput';
import IButton from '../../IButton';
import {iHeight} from '../../../../globalStyle';

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
          height={50}
          fontSize={16}
          titleText="이메일"
          value={userData.id}
          borderRadius={10}
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
            height={50}
            fontSize={16}
            titleText="닉네임"
            errorMsg={true}
            errorText={errorMsg.nickname}
            value={userData.nickname}
            onChangeText={text => setUserData({...userData, nickname: text})}
            borderRadius={10}
            maxLength={30}
            deleteIcon={false}
          />
        </View>
      )}
      <IButton buttonStyle="more" onPress={() => setPasswordClicked(true)}>
        <View style={styles.passwordContainer}>
          <Text>비밀번호 변경</Text>
        </View>
      </IButton>
    </View>
  );
};

export default InputAndPassword;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: iHeight * 75,
    paddingHorizontal: 15,
  },

  inputMainContainer: {
    marginTop: 10,
  },

  passwordContainer: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
