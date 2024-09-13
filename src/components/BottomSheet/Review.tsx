import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useItemInfo} from '../../store/store';

import PointAndInput from './Review/PointAndInput';
import {getUsers, useGetMyReview, useGetReviews} from '../../api/firebase';
import {iHeight} from '../../../globalStyle';

const Review = () => {
  const {itemId, itemTitle} = useItemInfo();

  const {data, refetch} = useGetReviews(itemId);
  const {data: myReview, isLoading: myLoading} = useGetMyReview(itemId);
  console.log('myReview', myReview);

  const getUsersData = async () => {
    const users = await getUsers();
    console.log('users', users);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Review</Text>
      </View>
      <View style={styles.itemTitleContainer}>
        <Text style={styles.titleText}>{itemTitle}</Text>
      </View>

      {myLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          {myReview?.length !== 1 ? (
            <PointAndInput
              itemId={itemId}
              itemTitle={itemTitle}
              refetch={refetch}
            />
          ) : (
            <View
              style={{
                marginTop: iHeight * 20,
                height: iHeight * 500,
                borderWidth: 0.5,
                borderRadius: 10,
                padding: 10,
              }}>
              <FlatList
                data={data}
                renderItem={({item}) => (
                  <View>
                    <Text>{item.reviewContent}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => item.userId.toString()}
              />
            </View>
          )}
        </View>
      )}
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
