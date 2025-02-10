import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../globalStyle';

type ImageDotProps = {
  detailImages: any[];
  imagesIndex: number;
};

const ImageDot = ({detailImages, imagesIndex}: ImageDotProps) => {
  return (
    <View style={styles.dotContainer}>
      {detailImages.map((_: any, index: number) => (
        <View
          key={index}
          style={{
            width: index === imagesIndex ? 12 : 10,
            height: index === imagesIndex ? 12 : 10,
            borderRadius: 50,
            borderColor: colors.white,
            backgroundColor: index === imagesIndex ? colors.white : colors.gray,
            bottom: 10,
            marginHorizontal: 2,
          }}></View>
      ))}
    </View>
  );
};

export default ImageDot;

const styles = StyleSheet.create({
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
