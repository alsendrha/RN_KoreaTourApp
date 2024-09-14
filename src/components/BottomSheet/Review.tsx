import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useItemInfo} from '../../store/store';

import PointAndInput from './Review/PointAndInput';
import {getUsers, useGetMyReview, useGetReviews} from '../../api/firebase';
import {iHeight} from '../../../globalStyle';

const Review = () => {
  const {itemId, itemTitle} = useItemInfo();
  const {data, refetch} = useGetReviews(itemId);
  const {data: myReview, isLoading: myLoading} = useGetMyReview(itemId);
  const [dataInfo, setDataInfo] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!data) return;
    const fetchDataAndUserInfo = async () => {
      setLoading(true); // 로딩 시작
      const tempDataInfo: any[] = [];
      for (const item of data) {
        const res = await getUsers(item.userId);
        const userData = res.docs.map(doc => doc.data())[0]; // 유저 데이터 가져오기
        tempDataInfo.push({...item, userData}); // 게시물과 유저 데이터 결합
      }

      setDataInfo(tempDataInfo); // 상태 업데이트
      setLoading(false); // 로딩 끝
    };

    fetchDataAndUserInfo();
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Review</Text>
      </View>
      <View style={styles.itemTitleContainer}>
        <Text style={styles.titleText}>{itemTitle}</Text>
      </View>

      <View>
        <PointAndInput
          itemId={itemId}
          itemTitle={itemTitle}
          refetch={refetch}
        />

        {loading ? (
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View
            style={{
              marginTop: iHeight * 20,
              height: iHeight * 350,
              borderWidth: 0.5,
              borderRadius: 10,
              padding: 10,
            }}>
            {dataInfo.map((data: any) => {
              return (
                <View key={data.userId}>
                  <Text>{data.userData.nickname}</Text>
                  {data.point01 !== 0 && <Text>{data.point01}</Text>}
                  {data.point02 !== 0 && <Text>{data.point01}</Text>}
                  {data.point03 !== 0 && <Text>{data.point01}</Text>}
                  {data.point04 !== 0 && <Text>{data.point01}</Text>}
                  {data.point05 !== 0 && <Text>{data.point01}</Text>}
                </View>
              );
            })}
          </View>
        )}
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

    // backgroundColor: 'red',
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  itemTitleContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
});
