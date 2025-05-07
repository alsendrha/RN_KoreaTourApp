import React from 'react';
import {StyleSheet, View} from 'react-native';
import {iWidth} from '../../../globalStyle';
import {UpdatePasswordProps} from '../../types/types';
import IInput from '../IInput';
import IText from '../IText';

const UpdatePassword = ({
  passwordInfo,
  setPasswordInfo,
  updateErrorMsg,
  setUpdateErrorMsg,
}: UpdatePasswordProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <IText fontStyle="fR" text={'새로운 비밀번호를 입력해주세요'} />
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
        borderRadius={iWidth * 20}
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
  container: {
    alignItems: 'center',
  },

  textContainer: {
    paddingBottom: iWidth * 12,
  },
});
