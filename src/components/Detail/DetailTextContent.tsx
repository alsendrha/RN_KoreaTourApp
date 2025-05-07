import React from 'react';
import {StyleSheet, View} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {colors, iWidth, normalizeFont} from '../../../globalStyle';
import IText from '../IText';

type DetailTextContentProps = {
  address: string;
  title: string;
  tel: string;
  page: string;
  overview: string;
};

const DetailTextContent = ({
  address,
  title,
  tel,
  page,
  overview,
}: DetailTextContentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <IText fontStyle="fB" fontSize={20} text={title} />
        <IText fontStyle="fR" text={`주소 : ${address}`} />
        <IText fontStyle="fR" text={`연락처 : ${tel ? tel : '-'}`} />
        <HTMLView
          value={page}
          textComponentProps={{
            style: {
              fontFamily: 'Pretendard-Regular',
              fontSize: normalizeFont(16),
              color: colors.black,
            },
          }}
          style={{marginVertical: 5}}
        />
      </View>
      <IText
        fontStyle="fR"
        fontSize={14}
        text={overview.replace(/<br\s*\/?>/gi, '\n')}
      />
    </View>
  );
};

export default DetailTextContent;

const styles = StyleSheet.create({
  container: {
    marginTop: iWidth * 10,
    marginHorizontal: iWidth * 16,
  },

  titleContainer: {
    paddingVertical: iWidth * 12,
  },
});
