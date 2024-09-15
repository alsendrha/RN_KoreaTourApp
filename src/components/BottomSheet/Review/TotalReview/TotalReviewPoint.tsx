import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {iWidth} from '../../../../../globalStyle';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import TotalScore from './TotalScore';

type TotalReviewPointProps = {
  data: FirebaseFirestoreTypes.DocumentData[];
};

type ReviewCounts = {
  [key: number]: number;
};

const TotalReviewPoint = ({data}: TotalReviewPointProps) => {
  const getReviewCounts = () => {
    const counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    data.forEach(review => {
      if (review.point01 > 0) counts[1] += 1;
      if (review.point02 > 0) counts[2] += 1;
      if (review.point03 > 0) counts[3] += 1;
      if (review.point04 > 0) counts[4] += 1;
      if (review.point05 > 0) counts[5] += 1;
    });
    return counts;
  };

  const reviewCounts: ReviewCounts = getReviewCounts();
  const reviewCount = data.length;
  return (
    <View style={styles.totalReviewContainer}>
      <TotalScore data={data} />
      <View>
        {Array(5)
          .fill(null)
          .map((_, index) => {
            const rating = 5 - index;
            const count = reviewCounts[rating];
            const progress =
              reviewCount > 0
                ? data.filter(review => review[`point0${rating}`] > 0).length /
                  reviewCount
                : 0;

            return (
              <View key={index} style={styles.pointProgressContainer}>
                <Text style={styles.pointTitle}>{rating}점</Text>
                <View style={styles.progress}>
                  <Progress.Bar
                    progress={progress}
                    width={110}
                    height={8}
                    borderWidth={0}
                    unfilledColor="#e9e9e9"
                    color={'#ffca42'}
                  />
                </View>
                <Text style={styles.pointCount}>{count}</Text>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default TotalReviewPoint;

const styles = StyleSheet.create({
  totalReviewContainer: {
    paddingHorizontal: iWidth * 15,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pointProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pointTitle: {
    fontWeight: 'bold',
  },

  progress: {
    marginHorizontal: 8,
  },

  pointCount: {
    color: '#C1C1C1',
  },
});
