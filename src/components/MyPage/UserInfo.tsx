import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors, iHeight, iWidth} from '../../../globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';

const UserInfo = () => {
  const [nickname, setNickname] = useState('닉네임');
  return (
    <View style={styles.userInfo}>
      <View style={styles.userImgContainer}>
        <View style={styles.userImg}>
          <View style={styles.imgIconContainer}>
            <Icon name="camera-outline" size={32} color="black" />
          </View>
        </View>
      </View>
      <View style={styles.userTextContainer}>
        <Text style={styles.userNickname}>{nickname}님</Text>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  userInfo: {
    paddingVertical: iHeight * 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
  },

  userImgContainer: {
    position: 'relative',
    marginRight: iWidth * 25,
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
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  userNickname: {
    fontSize: 25,
  },
});
