import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useGetUser} from '../../api/firebase';
import IInput from '../IInput';
import {UpdatePasswordProps} from '../../types/types';

const UpdatePassword = ({
  passwordInfo,
  setPasswordInfo,
  updateErrorMsg,
  setUpdateErrorMsg,
}: UpdatePasswordProps) => {
  return (
    <View>
      <View style={styles.contentTextContainer}>
        <Text>새로운 비밀번호를 입력해주세요</Text>
      </View>
      <IInput
        value={passwordInfo.userPassword}
        borderRadius={20}
        placeholder="새 비밀번호"
        deleteValue={() => setPasswordInfo({...passwordInfo, userPassword: ''})}
        secureTextEntry={true}
        onChangeText={text => {
          setPasswordInfo({...passwordInfo, userPassword: text});
          setUpdateErrorMsg({...updateErrorMsg, userPassword: ''});
        }}
        errorMsg={true}
        errorText={updateErrorMsg.userPassword}
      />
      <IInput
        value={passwordInfo.passwordCheck}
        borderRadius={20}
        placeholder="새 비밀번호 확인"
        deleteValue={() =>
          setPasswordInfo({...passwordInfo, passwordCheck: ''})
        }
        secureTextEntry={true}
        onChangeText={text => {
          setPasswordInfo({...passwordInfo, passwordCheck: text});
          setUpdateErrorMsg({...updateErrorMsg, passwordCheck: ''});
        }}
        errorMsg={true}
        errorText={updateErrorMsg.passwordCheck}
      />
    </View>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  contentTextContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },

  contentText: {
    // fontSize: 14,
  },
});
