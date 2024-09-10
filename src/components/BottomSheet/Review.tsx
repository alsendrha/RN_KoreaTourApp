import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {iHeight} from '../../../globalStyle';
import IButton from '../IButton';
import IInput from '../IInput';

type ReviewType = {
  id: number;
  point: number;
  clicked: boolean;
};

const Review = () => {
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

  console.log(reviewData);
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Review</Text>
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        {reViewPoint.map((item: ReviewType) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={1}
            onPress={() => handlePress(item.id)}>
            <Icon
              name={item.clicked ? 'star' : 'star-outline'}
              size={40}
              style={{color: '#ffca42'}}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <IInput
          lengthView={true}
          maxLength={200}
          numberOfLines={6}
          borderRadius={10}
          multiline={true}
          value={reviewData.reviewContent}
          onChangeText={value => {
            setReviewData({...reviewData, reviewContent: value});
          }}
          returnKeyType="done"
        />
        <View style={styles.buttonContainer}>
          <IButton title="입력" fontSize={16} buttonStyle="submit" />
        </View>
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {},

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  inputContainer: {
    marginTop: 30,
  },

  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});
