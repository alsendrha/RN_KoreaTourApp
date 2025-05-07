import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {colors, iWidth} from '../../../../../globalStyle';
import IText from '../../../IText';
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
    <View style={styles.container}>
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
                <IText fontStyle="fB" fontSize={14} text={`${rating}점`} />
                <Progress.Bar
                  progress={progress}
                  width={iWidth * 110}
                  height={iWidth * 8}
                  borderWidth={0}
                  unfilledColor="#e9e9e9"
                  color={colors.yellow}
                />
                <IText
                  fontStyle="fR"
                  fontSize={14}
                  textColor={'#C1C1C1'}
                  text={count}
                />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default TotalReviewPoint;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: iWidth * 25,
  },

  pointProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: iWidth * 8,
  },
});
