import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors, iHeight, iWidth} from '../../../globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
type UserInfoProps = {
  userData: FirebaseFirestoreTypes.DocumentData | undefined;
  userLoading: boolean;
};
const UserInfo = ({userData, userLoading}: UserInfoProps) => {
  return (
    <>
      {userLoading ? (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContainer2}>
            <ActivityIndicator size="large" />
          </View>
        </View>
      ) : (
        <View style={styles.userInfo}>
          <View style={styles.userImgContainer}>
            <Image
              source={
                userData?.profileUrl
                  ? {uri: userData?.profileUrl}
                  : require('../../assets/images/no_image.png')
              }
              style={styles.userImg}
              alt="프로필 이미지"
            />
          </View>
          <View style={styles.userTextContainer}>
            <Text style={styles.userNickname} numberOfLines={1}>
              {userData?.nickname}님
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: iHeight * 30,
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
    paddingVertical: iHeight * 30,
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
    borderRadius: 50,
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
    fontSize: 25,
  },
});
