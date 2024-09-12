import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors, iHeight, iWidth} from '../../../globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';

const UserInfo = () => {
  const [isChangeNickname, setIsChangeNickname] = useState(false);
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
        {isChangeNickname ? (
          <TextInput
            style={{
              width: 100,
              height: iHeight * 35,
              borderRadius: 50,
              borderWidth: 1,
            }}
            value={nickname}
            onChangeText={text => {
              setNickname(text);
            }}
          />
        ) : (
          <Text style={styles.userNickname}>{nickname}님</Text>
        )}
        <TouchableOpacity
          onPress={() => setIsChangeNickname(!isChangeNickname)}>
          <View style={styles.iconContainer}>
            <Icon name="brush-outline" size={15} color="black" />
          </View>
        </TouchableOpacity>
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

  iconContainer: {
    width: iWidth * 20,
    height: iWidth * 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: iWidth * 2,
    borderRadius: 50,
  },
});
