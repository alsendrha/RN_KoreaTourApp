import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, iWidth} from '../../../../../globalStyle';
import IText from '../../../IText';

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
              size={iWidth * 18}
              color={index < averagePoint ? colors.yellow : '#d3d3d3'}
            />
          );
        } else if (index === integerPart && decimalPart >= 0.3) {
          return (
            <Icon
              key={index}
              name="star-half-outline"
              size={iWidth * 18}
              color={index < averagePoint ? colors.yellow : '#d3d3d3'}
            />
          );
        } else {
          return (
            <Icon
              key={index}
              name="star"
              size={iWidth * 18}
              color={'#d3d3d3'}
            />
          );
        }
      });
  };

  return (
    <View style={styles.container}>
      {data && (
        <IText fontStyle="fB" fontSize={28} text={averagePoint.toFixed(1)} />
      )}
      <View style={styles.starContainer}>{renderStars()}</View>
    </View>
  );
};

export default TotalScore;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: iWidth * 8,
  },

  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: iWidth * 2,
  },
});
