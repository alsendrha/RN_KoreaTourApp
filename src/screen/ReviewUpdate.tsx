import {Alert, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useGetMyReview,
  useGetMyReviews,
  useGetReviews,
  useUpdateReview,
} from '../api/firebase';
import IInput from '../components/IInput';
import {iHeight} from '../../globalStyle';
import IButton from '../components/IButton';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const ReviewUpdate = ({route}: any) => {
  const [myReviewText, setMyReviewText] = useState('');
  const {data} = useGetMyReview(route.params.id);
  const {refetch} = useGetMyReviews();
  const {mutate} = useUpdateReview();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const handleUpdateData = () => {
    mutate(
      {itemId: route.params.id, reviewContent: myReviewText},
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
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <View style={styles.inputContainer}>
        <IInput
          value={myReviewText}
          deleteValue={() => setMyReviewText('')}
          borderRadius={10}
          fontSize={16}
          maxLength={1000}
          multiline={true}
          numberOfLines={5}
          onChangeText={text => {
            console.log(text);
            setMyReviewText(text);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <IButton
          buttonStyle="submit"
          title="수정하기"
          backgroundColor="#E07039"
          border={0}
          titleColor="white"
          onPress={handleUpdateData}
        />
      </View>
    </Pressable>
  );
};

export default ReviewUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  inputContainer: {
    marginTop: iHeight * 50,
  },

  buttonContainer: {
    alignItems: 'center',
    marginTop: iHeight * 20,
  },
});
