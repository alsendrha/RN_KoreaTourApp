import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {colors, iWidth, normalizeFont} from '../../../globalStyle';
import {useGetUSerInfo} from '../../api/firebase';

const UserInfo = () => {
  const {data, isLoading} = useGetUSerInfo();
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContainer2}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }
  return (
    <>
      <View style={styles.userInfo}>
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
        <View style={styles.userTextContainer}>
          <Text style={styles.userNickname} numberOfLines={1}>
            {data?.nickname}님
          </Text>
        </View>
      </View>
    </>
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
    height: iWidth * 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  userInfo: {
    paddingVertical: iWidth * 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
  },

  userImgContainer: {
    position: 'relative',
    marginLeft: iWidth * 20,
  },

  userImg: {
    width: iWidth * 55,
    height: iWidth * 55,
    borderRadius: iWidth * 50,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imgIconContainer: {
    opacity: 0.5,
  },

  userTextContainer: {
    marginLeft: iWidth * 15,
  },

  userNickname: {
    fontSize: normalizeFont(25),
    color: colors.black,
  },
});
