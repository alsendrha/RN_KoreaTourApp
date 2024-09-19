export type EmailAndNicknameCheck = {
  errorMsg: {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
  };
  setErrorMsg: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      passwordCheck: string;
      nickname: string;
    }>
  >;
  checkEmailAndNickname: {
    email: boolean;
    nickname: boolean;
  };
  setCheckEmailAndNickname: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      nickname: boolean;
    }>
  >;
  email?: string;
  nickname?: string;
};

export type nameCheck = {
  setErrorMsg: React.Dispatch<
    React.SetStateAction<{
      nickname: string;
    }>
  >;
  nickname?: string;
};

export type DuplicationAndNullCheckType = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  errorMsg: {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
  };
  setErrorMsg: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      passwordCheck: string;
      nickname: string;
    }>
  >;
};

export type LoginDuplicationAndNullCheckType = {
  email: string;
  password: string;
  errorMsg: {
    email: string;
    password: string;
  };
  setErrorMsg: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
};
