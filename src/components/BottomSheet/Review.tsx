import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useItemInfo, useRefetchStore} from '../../store/store';
import {getUsers, useGetMyReview, useGetReviews} from '../../api/firebase';
import {iHeight} from '../../../globalStyle';
import ReviewList from './Review/ReviewList';
import IButton from '../IButton';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import TotalReviewPoint from './Review/TotalReview/TotalReviewPoint';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Review = () => {
  const {itemId} = useItemInfo();
  const {data, refetch} = useGetReviews(itemId);

  const {
    data: myReview,
    isLoading: myLoading,
    refetch: myRefetch,
  } = useGetMyReview(itemId);
  const [dataInfo, setDataInfo] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    if (!data) return;
    const userId = AsyncStorage.getItem('userId');
    if (!userId) {
      setDataInfo(data);
      myRefetch();
      return;
    }
    const fetchDataAndUserInfo = async () => {
      setLoading(true);
      const tempDataInfo: any[] = [];
      for (const item of data) {
        const res = await getUsers(item.userId);
        const userData = res.docs.map(doc => doc.data())[0];
        tempDataInfo.push({...item, userData});
      }
      setDataInfo(tempDataInfo);
      setLoading(false);
    };

    fetchDataAndUserInfo();
  }, [data]);

  const handleInsertReview = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      return Alert.alert('로그인이 필요합니다', '로그인이 필요합니다', [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('signIn');
          },
        },
      ]);
    } else {
      navigation.navigate('reviewInsert');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Review</Text>
        {myLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          !myReview?.length && (
            <IButton
              buttonStyle="review"
              backgroundColor="#E7966D"
              titleColor="white"
              title="리뷰 작성하기"
              onPress={handleInsertReview}
            />
          )
        )}
      </View>
      {data && <TotalReviewPoint data={data} />}
      <View style={styles.reviewListContainer}>
        <ReviewList dataInfo={dataInfo} loading={loading} />
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  titleContainer: {
    width: '100%',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  reviewListContainer: {
    marginTop: iHeight * 15,
  },
});
