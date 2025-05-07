import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {iWidth} from '../../globalStyle';
import {useDeleteReview, useGetMyReviews, useGetReviews} from '../api/firebase';
import IText from '../components/IText';
import MyReviewItemButtons from '../components/MyPage/MyReview/MyReviewItemButtons';
import MyReviewItemStar from '../components/MyPage/MyReview/MyReviewItemStar';
import MyReviewItemTitle from '../components/MyPage/MyReview/MyReviewItemTitle';

const MyReview = () => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const {data, isLoading, refetch} = useGetMyReviews();
  const {refetch: reviewsR} = useGetReviews(selectedItemId);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {mutate} = useDeleteReview();
  const queryClient = useQueryClient();

  const handleDelete = (itemId: string) => {
    setSelectedItemId(itemId);
    Alert.alert('리뷰를 삭제하시겠습니까?', '', [
      {
        text: '취소',
        onPress: () => {},
      },
      {
        text: '확인',
        onPress: () => {
          mutate(itemId, {
            onSuccess: () => {
              refetch();
              reviewsR();
              queryClient.invalidateQueries({
                queryKey: ['reviewsInfo', itemId],
              });
              Alert.alert('리뷰가 삭제되었습니다', '', [
                {
                  text: '확인',
                },
              ]);
            },
          });
        },
      },
    ]);
  };

  const handleUpdate = (itemId: string) => {
    navigation.navigate('reviewUpdate', {id: itemId});
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <IText fontStyle="fB" fontSize={18} text={'내가 쓴 총 리뷰'} />
        {isLoading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <IText fontStyle="fB" fontSize={18} text={` ${data?.length}개`} />
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          style={{paddingTop: iWidth * 12}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: iWidth * 16}}
          data={data}
          renderItem={({item}) => {
            return (
              <View style={{gap: iWidth * 4}}>
                <MyReviewItemTitle
                  title={item.itemTitle}
                  onPress={() =>
                    navigation.navigate('detail', {
                      id: item.itemId,
                      contentType: item.contentTypeId,
                    })
                  }
                />
                <View style={styles.starButtonContainer}>
                  <MyReviewItemStar item={item} />
                  <MyReviewItemButtons
                    updateOnPress={() => handleUpdate(item.itemId)}
                    deleteOnPress={() => handleDelete(item.itemId)}
                  />
                </View>
                <View style={styles.contentContainer}>
                  <IText fontStyle="fR" text={item.reviewContent} />
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.itemId}
          ListEmptyComponent={
            <View
              style={{
                width: '100%',
                height: Dimensions.get('screen').height - 250,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IText fontStyle="fR" text={'작성한 리뷰가 없습니다'} />
            </View>
          }
        />
      )}
    </View>
  );
};

export default MyReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: iWidth * 20,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: iWidth * 12,
  },

  starButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  contentContainer: {
    marginTop: iWidth * 8,
    minHeight: iWidth * 120,
    borderWidth: 0.5,
    borderRadius: iWidth * 12,
    padding: iWidth * 10,
    borderColor: '#e3e3e3',
  },
});
