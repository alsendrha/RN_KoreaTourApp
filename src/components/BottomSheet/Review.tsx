import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useItemInfo} from '../../store/store';
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

const Review = () => {
  const {itemId, itemTitle} = useItemInfo();
  const {data} = useGetReviews(itemId);
  const {data: myReview, isLoading: myLoading} = useGetMyReview(itemId);
  const [dataInfo, setDataInfo] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    if (!data) return;
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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Review</Text>
        {!myReview?.length && (
          <IButton
            buttonStyle="review"
            titleColor="white"
            title="리뷰 작성하기"
            onPress={() => {
              navigation.navigate('reviewInsert');
            }}
          />
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
