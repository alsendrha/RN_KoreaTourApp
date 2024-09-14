import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import fireStore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

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

type ReviewProps = {
  itemId: string;
  itemTitle: string;
  userId: string;
  point01: number;
  point02: number;
  point03: number;
  point04: number;
  point05: number;
  reviewContent: string;
  date: Date;
};

export const userCollection = fireStore().collection('users');
export const reviewCollection = fireStore().collection('reviews');

export const signUp = ({email, password}: SignUpProps) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = ({email, password}: SignUpProps) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const mutationFn = ({email, password}: SignUpProps) =>
    auth().signInWithEmailAndPassword(email, password);
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']});
      queryClient.invalidateQueries({queryKey: ['userInfo']});
    },
    onError: error => {
      console.log('로그인 실패', error);
    },
  });
  return mutation;
};

export const useGetUser = () => {
  const queryFn = () => auth().currentUser;
  return useQuery({
    queryKey: ['user'],
    queryFn,
  });
};

export const useSignOut = () => {
  const mutationFn = () => auth().signOut();
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      AsyncStorage.removeItem('userId');
    },
    onError: error => {
      console.log('로그아웃 실패', error);
    },
  });
  return mutation;
};

export const useGetUSerInfo = () => {
  const queryFn = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('No userId found');
    }

    const res = await fireStore()
      .collection('users')
      .where('id', '==', userId)
      .get();
    const data = res.docs.map(doc => doc.data());
    console.log('data', data);
    return data[0];
  };
  return useQuery({
    queryKey: ['userInfo'],
    queryFn,
  });
};

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

export const getUsers = (id: string) => {
  return userCollection.where('id', '==', id).get();
};

export const createReview = ({
  itemId,
  itemTitle,
  userId,
  point01,
  point02,
  point03,
  point04,
  point05,
  reviewContent,
  date,
}: ReviewProps) => {
  return reviewCollection.doc(itemId).collection('review').doc(userId).set({
    itemId,
    itemTitle,
    userId,
    point01,
    point02,
    point03,
    point04,
    point05,
    reviewContent,
    date,
  });
};

export const useGetReviews = (itemId: string) => {
  const queryFn = async () => {
    const res = await fireStore()
      .collection('reviews')
      .doc(itemId)
      .collection('review')
      .get();
    const data = res.docs.map(doc => doc.data());
    console.log('data', data);
    return data.length > 0 ? data : [];
  };
  return useQuery({
    queryKey: [`ReviewsInfo${itemId}`],
    queryFn,
  });
};

export const useGetMyReview = (itemId: string) => {
  const queryFn = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }
    const res = await fireStore()
      .collection('reviews')
      .doc(itemId)
      .collection('review')
      .where('userId', '==', userId)
      .get();

    const data = res.docs.map(doc => doc.data());
    console.log('data', data);
    return data.length > 0 ? data : [];
  };

  return useQuery({
    queryKey: [`myReview`, itemId],
    queryFn,
    enabled: !!itemId,
  });
};
