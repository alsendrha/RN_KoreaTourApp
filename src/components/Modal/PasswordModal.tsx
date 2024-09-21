import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PasswordCheck from './PasswordCheck';
import UpdatePassword from './UpdatePassword';

type PasswordModalProps = {
  updatePassword: boolean;
  userPassword: string;
  setUserPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  passwordInfo: {
    userPassword: string;
    passwordCheck: string;
  };
  setPasswordInfo: React.Dispatch<
    React.SetStateAction<{
      userPassword: string;
      passwordCheck: string;
    }>
  >;
  updateErrorMsg: {
    userPassword: string;
    passwordCheck: string;
  };
  setUpdateErrorMsg: React.Dispatch<
    React.SetStateAction<{
      userPassword: string;
      passwordCheck: string;
    }>
  >;
};

const PasswordModal = ({
  updatePassword,
  userPassword,
  setUserPassword,
  errorMsg,
  setErrorMsg,
  passwordInfo,
  setPasswordInfo,
  updateErrorMsg,
  setUpdateErrorMsg,
}: PasswordModalProps) => {
  return (
    <>
      {!updatePassword ? (
        <PasswordCheck
          userPassword={userPassword}
          setUserPassword={setUserPassword}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />
      ) : (
        <UpdatePassword
          passwordInfo={passwordInfo}
          setPasswordInfo={setPasswordInfo}
          updateErrorMsg={updateErrorMsg}
          setUpdateErrorMsg={setUpdateErrorMsg}
        />
      )}
    </>
  );
};

export default PasswordModal;
