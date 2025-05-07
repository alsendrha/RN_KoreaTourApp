import FastImage from '@d11/react-native-fast-image';
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors, iWidth} from '../../../globalStyle';
import {useGetUSerInfo} from '../../api/firebase';
import IText from '../IText';

const UserInfo = () => {
  const [contentSize, setContentSize] = useState(0);
  const {data, isLoading} = useGetUSerInfo();
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, {height: contentSize}]}>
        <View style={styles.loadingContainer2}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }
  return (
    <View
      style={styles.container}
      onLayout={e => {
        setContentSize(e.nativeEvent.layout.height);
      }}>
      <View style={styles.userImgContainer}>
        <FastImage
          source={
            data?.profileUrl
              ? {uri: data?.profileUrl}
              : require('../../assets/images/no_image.png')
          }
          style={styles.userImg}
        />
      </View>
      <IText fontStyle="fM" fontSize={25} text={`${data?.nickname}님`} />
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: iWidth * 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
  },

  loadingContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    paddingVertical: iWidth * 26,
    paddingHorizontal: iWidth * 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
    gap: iWidth * 16,
  },

  userImgContainer: {
    position: 'relative',
  },

  userImg: {
    width: iWidth * 55,
    height: iWidth * 55,
    borderRadius: iWidth * 50,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
