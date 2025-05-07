import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {colors, iWidth} from '../../../globalStyle';
import {getUsers, useGetMyReview, useGetReviews} from '../../api/firebase';
import {useItemInfo} from '../../store/store';
import IButton from '../IButton';
import IText from '../IText';
import ReviewList from './Review/ReviewList';
import TotalReviewPoint from './Review/TotalReview/TotalReviewPoint';

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
        <IText fontStyle="fB" fontSize={18} text={'Review'} />
        {!myReview?.length && (
          <IButton
            buttonStyle="review"
            backgroundColor={colors.primary}
            titleColor={colors.white}
            fontSize={14}
            title="리뷰 작성하기"
            onPress={handleInsertReview}
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
    paddingHorizontal: iWidth * 20,
  },

  titleContainer: {
    width: '100%',
    paddingVertical: iWidth * 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  reviewListContainer: {
    paddingTop: iWidth * 12,
  },
});
