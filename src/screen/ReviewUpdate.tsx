import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, Pressable, StyleSheet} from 'react-native';
import {colors, iWidth, normalizeFont} from '../../globalStyle';
import {
  useGetMyReview,
  useGetMyReviews,
  useUpdateReview,
} from '../api/firebase';
import IButton from '../components/IButton';
import IInput from '../components/IInput';

type ReviewUpdateProps = {
  route?: {
    params: {
      id: string;
    };
  };
};

const ReviewUpdate = ({route}: ReviewUpdateProps) => {
  const [myReviewText, setMyReviewText] = useState('');
  const reviewId = route!.params.id;
  const {data} = useGetMyReview(reviewId);
  const {refetch} = useGetMyReviews();
  const {mutate} = useUpdateReview();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const handleUpdateData = () => {
    mutate(
      {itemId: reviewId, reviewContent: myReviewText},
      {
        onSuccess: () => {
          Alert.alert('리뷰가 수정되었습니다', '', [
            {
              text: '확인',
              onPress: () => {
                refetch();
                navigation.goBack();
              },
            },
          ]);
        },
      },
    );
  };
  useEffect(() => {
    if (!data) return;
    setMyReviewText(data[0].reviewContent);
  }, [data]);

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <IInput
        value={myReviewText}
        deleteValue={() => setMyReviewText('')}
        borderRadius={10}
        textAlignVertical="top"
        fontSize={normalizeFont(16)}
        maxLength={1000}
        multiline={true}
        numberOfLines={5}
        onChangeText={text => {
          setMyReviewText(text);
        }}
      />
      <IButton
        buttonStyle="submit"
        title="수정하기"
        backgroundColor={colors.primary}
        border={0}
        titleColor={colors.white}
        onPress={handleUpdateData}
      />
    </Pressable>
  );
};

export default ReviewUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: iWidth * 24,
    gap: iWidth * 16,
    alignItems: 'center',
  },
});
