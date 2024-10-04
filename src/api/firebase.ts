import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';

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
  contentTypeId: string;
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

type ReviewUpdateProps = {
  itemId: string;
  reviewContent: string;
};

type updateUserProps = {
  nickname: string;
  profileUrl?: string;
};

export const userCollection = fireStore().collection('users');
export const reviewCollection = fireStore().collection('reviews');

export const signUp = ({email, password}: SignUpProps) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = ({email, password}: SignUpProps) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const userPasswordReset = ({email}: {email: string}) => {
  return auth().sendPasswordResetEmail(email);
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const mutationFn = ({email, password}: SignUpProps) =>
    auth().signInWithEmailAndPassword(email, password);
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: error => {
      console.log('로그인 실패', error);
      Alert.alert('이메일 없거나 또는 비밀번호를 확인해주세요');
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
  const queryClient = useQueryClient();
  const mutationFn = () => auth().signOut();
  const mutation = useMutation({
    mutationFn,
    onSuccess: async () => {
      console.log('로그아웃 성공');
      queryClient.invalidateQueries();
      await AsyncStorage.removeItem('userId');
    },
    onError: error => {
      console.log('로그아웃 실패', error);
    },
  });
  return mutation;
};

export const useUserDelete = () => {
  const mutationFn = async (userId: string) => {
    userCollection.doc(userId).delete();
  };
  return useMutation({
    mutationFn,
  });
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
    return data[0];
  };

  return useQuery({
    queryKey: ['userInfo'],
    queryFn,
  });
};

export const useUpdateUser = () => {
  const mutationFn = async (userData: updateUserProps) => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('No userId found');
    }
    fireStore().collection('users').doc(userId).update(userData);
  };

  return useMutation({
    mutationFn,
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

export const useCreateReview = () => {
  const mutationFn = async (reviewData: ReviewProps) => {
    const {
      itemId,
      contentTypeId,
      itemTitle,
      userId,
      point01,
      point02,
      point03,
      point04,
      point05,
      reviewContent,
      date,
    } = reviewData;

    const reviewRef = fireStore()
      .collection('reviews')
      .doc(itemId)
      .collection('review')
      .doc(userId);

    const myReviewRef = fireStore()
      .collection('myReviews')
      .doc(userId)
      .collection('review')
      .doc(itemId);

    await Promise.all([
      reviewRef.set({
        itemId,
        contentTypeId,
        itemTitle,
        userId,
        point01,
        point02,
        point03,
        point04,
        point05,
        reviewContent,
        date,
      }),
      myReviewRef.set({
        itemId,
        contentTypeId,
        itemTitle,
        userId,
        point01,
        point02,
        point03,
        point04,
        point05,
        reviewContent,
        date,
      }),
    ]);
  };

  return useMutation({
    mutationFn,
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
    return data.length > 0 ? data : [];
  };
  return useQuery({
    queryKey: [`reviewsInfo`, itemId],
    queryFn,
  });
};

export const useGetMyReviews = () => {
  const [userId, setUserId] = useState('');
  const queryFn = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('No userId found');
    }
    setUserId(userId);
    const res = await fireStore()
      .collection('myReviews')
      .doc(userId)
      .collection('review')
      .get();
    const data = res.docs.map(doc => doc.data());
    return data.length > 0 ? data : [];
  };
  return useQuery({
    queryKey: [`myReviews`],
    queryFn,
  });
};

export const useUpdateReview = () => {
  const [itemId, setItemId] = useState('');
  const queryClient = useQueryClient();
  const mutationFn = async (reviewData: ReviewUpdateProps) => {
    const userId = await AsyncStorage.getItem('userId');
    setItemId(reviewData.itemId);
    if (!userId) {
      throw new Error('No userId found');
    }

    const reviewRef = fireStore()
      .collection('reviews')
      .doc(reviewData.itemId)
      .collection('review')
      .doc(userId);

    const myReviewRef = fireStore()
      .collection('myReviews')
      .doc(userId)
      .collection('review')
      .doc(reviewData.itemId);

    await Promise.all([
      reviewRef.update(reviewData),
      myReviewRef.update(reviewData),
    ]);
  };

  return useMutation({
    mutationFn,
  });
};

export const useDeleteReview = () => {
  const mutationFn = async (itemId: string) => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('No userId found');
    }
    const myReviewRef = fireStore()
      .collection('reviews')
      .doc(itemId)
      .collection('review')
      .doc(userId);

    const reviewRef = fireStore()
      .collection('myReviews')
      .doc(userId)
      .collection('review')
      .doc(itemId);

    await Promise.all([myReviewRef.delete(), reviewRef.delete()]);
  };

  return useMutation({
    mutationFn,
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
    return data.length > 0 ? data : [];
  };

  return useQuery({
    queryKey: [`myReview`],
    queryFn,
  });
};
