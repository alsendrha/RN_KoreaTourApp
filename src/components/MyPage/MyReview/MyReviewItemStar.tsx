import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, iWidth} from '../../../../globalStyle';

type MyReviewItemStarProps = {
  item: Partial<
    Record<'point01' | 'point02' | 'point03' | 'point04' | 'point05', number>
  >;
};

const MyReviewItemStar = ({item}: MyReviewItemStarProps) => {
  const points = [
    {label: 'point01', value: item.point01},
    {label: 'point02', value: item.point02},
    {label: 'point03', value: item.point03},
    {label: 'point04', value: item.point04},
    {label: 'point05', value: item.point05},
  ].filter(point => point.value !== 0);

  return (
    <>
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
                  color: index < point.value! ? colors.yellow : '#e3e3e3',
                }}
              />
            ))}
        </View>
      ))}
    </>
  );
};

export default MyReviewItemStar;

const styles = StyleSheet.create({
  starButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: iWidth * 2,
  },
});
