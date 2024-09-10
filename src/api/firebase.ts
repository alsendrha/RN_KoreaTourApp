import auth from '@react-native-firebase/auth';

type SignUpProps = {
  email: string;
  password: string;
};

export const signUp = ({email, password}: SignUpProps) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = ({email, password}: SignUpProps) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  return auth().signOut();
};
