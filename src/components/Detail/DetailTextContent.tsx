import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {iHeight, iWidth} from '../../../globalStyle';

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
    <View style={styles.textContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text>주소 : {address}</Text>
        <Text>연락처 : {tel ? tel : '-'}</Text>
        <HTMLView value={page} style={{marginVertical: 5}} />
      </View>
      <Text style={{marginTop: 10}}>
        {overview.replace(/<br\s*\/?>/gi, '\n')}
      </Text>
    </View>
  );
};

export default DetailTextContent;

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 10,
    marginHorizontal: iWidth * 10,
  },

  titleContainer: {
    paddingVertical: iHeight * 15,
    borderBottomWidth: 0.5,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
