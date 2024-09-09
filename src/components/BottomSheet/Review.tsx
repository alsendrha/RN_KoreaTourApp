import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

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

  const handlePress = (id: number) => {
    const clickedPoint = reViewPoint.find(item => item.id === id)?.point || 0;
    console.log(`Clicked point: ${clickedPoint}`);
    setReViewPoint(prev =>
      prev.map(item => ({
        ...item,
        clicked: item.point <= clickedPoint,
      })),
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Review</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
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
});
