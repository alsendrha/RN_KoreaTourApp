export type UpdatePasswordProps = {
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
