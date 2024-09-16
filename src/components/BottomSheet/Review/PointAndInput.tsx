import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import IInput from '../../IInput';
import IButton from '../../IButton';
import {
  createMyReviews,
  createReview,
  useGetReviews,
} from '../../../api/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
type ReviewType = {
  id: number;
  point: number;
  clicked: boolean;
};

type PointAndInputProps = {
  itemId: string;
  itemTitle: string;
  contentTypeId: string;
};

const PointAndInput = ({
  itemId,
  itemTitle,
  contentTypeId,
}: PointAndInputProps) => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const {refetch} = useGetReviews(itemId);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [reViewPoint, setReViewPoint] = useState<ReviewType[]>([
    {id: 1, point: 1, clicked: false},
    {id: 2, point: 2, clicked: false},
    {id: 3, point: 3, clicked: false},
    {id: 4, point: 4, clicked: false},
    {id: 5, point: 5, clicked: false},
  ]);

  const [reviewData, setReviewData] = useState({
    id: 1,
    reviewPoint: 0,
    reviewContent: '',
  });

  const handlePress = (id: number) => {
    const clickedPoint = reViewPoint.find(item => item.id === id)?.point || 0;
    setReviewData({...reviewData, reviewPoint: clickedPoint});
    setReViewPoint(prev =>
      prev.map(item => ({
        ...item,
        clicked: item.point <= clickedPoint,
      })),
    );
  };

  const handleSubmit = async () => {
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
    }

    if (reviewData.reviewPoint === 0) {
      return Alert.alert('평점을 선택해주세요');
    }

    if (!reviewData.reviewContent) {
      return Alert.alert('리뷰를 입력해주세요');
    }
    try {
      setIsDataLoading(true);
      await createReview({
        itemId,
        contentTypeId,
        itemTitle,
        userId: userId,
        point01: reviewData.reviewPoint === 1 ? reviewData.reviewPoint : 0,
        point02: reviewData.reviewPoint === 2 ? reviewData.reviewPoint : 0,
        point03: reviewData.reviewPoint === 3 ? reviewData.reviewPoint : 0,
        point04: reviewData.reviewPoint === 4 ? reviewData.reviewPoint : 0,
        point05: reviewData.reviewPoint === 5 ? reviewData.reviewPoint : 0,
        reviewContent: reviewData.reviewContent,
        date: new Date(),
      });

      await createMyReviews({
        itemId,
        contentTypeId,
        itemTitle,
        userId: userId,
        point01: reviewData.reviewPoint === 1 ? reviewData.reviewPoint : 0,
        point02: reviewData.reviewPoint === 2 ? reviewData.reviewPoint : 0,
        point03: reviewData.reviewPoint === 3 ? reviewData.reviewPoint : 0,
        point04: reviewData.reviewPoint === 4 ? reviewData.reviewPoint : 0,
        point05: reviewData.reviewPoint === 5 ? reviewData.reviewPoint : 0,
        reviewContent: reviewData.reviewContent,
        date: new Date(),
      });

      setIsDataLoading(false);
      Alert.alert('리뷰가 등록되었습니다', '리뷰가 등록되었습니다', [
        {
          text: '확인',
          onPress: () => {
            refetch();
            setReviewData({id: 1, reviewPoint: 0, reviewContent: ''});
            setReViewPoint(prev =>
              prev.map(item => ({
                ...item,
                clicked: false,
              })),
            );
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      {isDataLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <View style={styles.pointContainer}>
            {reViewPoint.map((item: ReviewType) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={1}
                style={{marginHorizontal: 10}}
                onPress={() => handlePress(item.id)}>
                <Icon
                  name={item.clicked ? 'star' : 'star-outline'}
                  size={32}
                  style={{color: '#ffca42'}}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.inputContainer}>
            <IInput
              lengthView={true}
              maxLength={200}
              numberOfLines={5}
              borderRadius={10}
              multiline={true}
              value={reviewData.reviewContent}
              onChangeText={value => {
                setReviewData({...reviewData, reviewContent: value});
              }}
              returnKeyType="done"
            />
            <View style={styles.buttonContainer}>
              <IButton
                title="입력"
                fontSize={16}
                buttonStyle="submit"
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default PointAndInput;

const styles = StyleSheet.create({
  pointContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  inputContainer: {
    // marginTop: 10,
  },

  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});
