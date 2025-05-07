import React from 'react';
import {ColorValue, StyleSheet, Text} from 'react-native';
import {colors, normalizeFont} from '../../globalStyle';

type ITextProps = {
  fontStyle: 'fR' | 'fB' | 'fM' | 'fSB';
  textColor?: ColorValue;
  fontSize?: number;
  text?: string | number;
};

const IText = ({
  fontStyle = 'fR',
  textColor = colors.black,
  fontSize = 16,
  text,
}: ITextProps) => {
  const fontStyleList = {
    fR: styles.fontRegular,
    fB: styles.fontBold,
    fM: styles.fontMedium,
    fSB: styles.fontSemiBold,
  };

  return (
    <Text
      style={[
        fontStyleList[fontStyle],
        {color: textColor, fontSize: normalizeFont(fontSize)},
      ]}>
      {text}
    </Text>
  );
};

export default IText;

const styles = StyleSheet.create({
  fontBold: {
    fontFamily: 'Pretendard-Bold',
  },
  fontRegular: {
    fontFamily: 'Pretendard-Regular',
  },
  fontMedium: {
    fontFamily: 'Pretendard-Medium',
  },
  fontSemiBold: {
    fontFamily: 'Pretendard-SemiBold',
  },
});
