import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, iWidth} from '../../../globalStyle';

type ImageDotProps = {
  detailImages: any[];
  imagesIndex: number;
};

const ImageDot = ({detailImages, imagesIndex}: ImageDotProps) => {
  return (
    <View style={styles.container}>
      {detailImages.map((_: any, index: number) => (
        <View
          key={index}
          style={{
            width: index === imagesIndex ? iWidth * 12 : iWidth * 10,
            height: index === imagesIndex ? iWidth * 12 : iWidth * 10,
            borderRadius: iWidth * 50,
            borderColor: colors.white,
            backgroundColor: index === imagesIndex ? colors.white : colors.gray,
            bottom: iWidth * 10,
            marginHorizontal: iWidth * 2,
          }}
        />
      ))}
    </View>
  );
};

export default ImageDot;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: iWidth * 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
