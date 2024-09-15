import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

type TotalScoreProps = {
  data: FirebaseFirestoreTypes.DocumentData[];
};

const TotalScore = ({data}: TotalScoreProps) => {
  const reviewCount = data.length;
  const totalReviewPoint =
    reviewCount > 0
      ? data.reduce(
          (acc, cur) =>
            acc +
            (cur.point01 || 0) +
            (cur.point02 || 0) +
            (cur.point03 || 0) +
            (cur.point04 || 0) +
            (cur.point05 || 0),
          0,
        )
      : 0;
  const averagePoint =
    totalReviewPoint / reviewCount ? totalReviewPoint / reviewCount : 0;

  const renderStars = () => {
    const integerPart = Math.floor(averagePoint);
    const decimalPart = parseFloat((averagePoint - integerPart).toFixed(1));
    return Array(5)
      .fill(null)
      .map((_, index) => {
        if (index < integerPart) {
          return (
            <Icon
              key={index}
              name="star"
              size={18}
              style={styles.starIcon}
              color={index < averagePoint ? '#ffca42' : '#d3d3d3'}
            />
          );
        } else if (index === integerPart && decimalPart >= 0.3) {
          return (
            <Icon
              key={index}
              name="star-half-outline"
              size={18}
              style={styles.starIcon}
              color={index < averagePoint ? '#ffca42' : '#d3d3d3'}
            />
          );
        } else {
          return (
            <Icon
              key={index}
              name="star"
              style={[styles.starIcon]}
              size={18}
              color={'#d3d3d3'}
            />
          );
        }
      });
  };

  return (
    <View style={styles.pointContainer}>
      {data && <Text style={styles.pointText}>{averagePoint.toFixed(1)}</Text>}
      <View style={styles.starContainer}>{renderStars()}</View>
    </View>
  );
};

export default TotalScore;

const styles = StyleSheet.create({
  pointContainer: {
    alignItems: 'center',
  },

  pointText: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  starContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  starIcon: {
    marginHorizontal: 1,
  },
});
