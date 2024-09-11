import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
type SignUpProps = {
  email: string;
  password: string;
};

type CreateUserProps = {
  id: string;
  email: string;
  nickname: string;
  profileUrl: string | null;
};

export const signUp = ({email, password}: SignUpProps) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = ({email, password}: SignUpProps) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const getCurrentUser = () => {
  return auth().currentUser;
};

export const signOut = () => {
  return auth().signOut();
};

const userCollection = fireStore().collection('users');

export const createUser = ({
  id,
  email,
  nickname,
  profileUrl,
}: CreateUserProps) => {
  return userCollection.doc(id).set({
    id,
    email,
    nickname,
    profileUrl,
  });
};
