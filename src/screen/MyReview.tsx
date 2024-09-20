import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useDeleteReview, useGetMyReviews} from '../api/firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import IButton from '../components/IButton';
import {iHeight} from '../../globalStyle';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
const MyReview = () => {
  const {data, isLoading, refetch} = useGetMyReviews();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {mutate} = useDeleteReview();

  const handleDelete = (itemId: string) => {
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
              Alert.alert('리뷰가 삭제되었습니다', '', [
                {
                  text: '확인',
                  onPress: () => {
                    refetch();
                  },
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
        <Text style={styles.titleText}>내가 쓴 총 리뷰 </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <Text style={styles.titleText}>{data?.length}개</Text>
        )}
      </View>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <FlatList
          style={{marginBottom: iHeight * 100, paddingBottom: iHeight * 10}}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => {
            const points = [
              {label: 'point01', value: item.point01},
              {label: 'point02', value: item.point02},
              {label: 'point03', value: item.point03},
              {label: 'point04', value: item.point04},
              {label: 'point05', value: item.point05},
            ].filter(point => point.value !== 0);
            return (
              <View style={styles.listContainer}>
                <IButton
                  buttonStyle="more"
                  onPress={() =>
                    navigation.navigate('detail', {
                      id: item.itemId,
                      contentType: item.contentTypeId,
                    })
                  }>
                  <View style={styles.reviewTitleContainer}>
                    <Text style={styles.reviewTitleText}>
                      {item.itemTitle}{' '}
                    </Text>
                    <Icon name={'chevron-forward-outline'} size={16} />
                  </View>
                </IButton>
                <View style={styles.starButtonContainer}>
                  {points.map(point => (
                    <View key={point.label} style={styles.starContainer}>
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <Icon
                            key={index}
                            name={'star'}
                            size={18}
                            style={{
                              color:
                                index < point.value ? '#ffca42' : '#e3e3e3',
                              marginRight: 2,
                            }}
                          />
                        ))}
                    </View>
                  ))}

                  <View style={styles.menuButtonContainer}>
                    <View style={{marginRight: 5}}>
                      <IButton
                        buttonStyle="review"
                        backgroundColor="#e3e3e3"
                        title="수정"
                        onPress={() => handleUpdate(item.itemId)}
                      />
                    </View>
                    <View>
                      <IButton
                        buttonStyle="review"
                        backgroundColor="#e3e3e3"
                        title="삭제"
                        onPress={() => handleDelete(item.itemId)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.contentContainer}>
                  <Text>{item.reviewContent}</Text>
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
              <Text>작성한 리뷰가 없습니다</Text>
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
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: '#b3b3b3',
    paddingBottom: 12,
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  reviewTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  listContainer: {
    marginBottom: 20,
  },

  reviewTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  starButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  contentContainer: {
    marginTop: 10,
    minHeight: 120,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    borderColor: '#e3e3e3',
  },
});
