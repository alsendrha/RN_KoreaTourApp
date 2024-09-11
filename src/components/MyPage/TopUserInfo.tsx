import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {colors, iHeight, iWidth} from '../../../globalStyle';

const TopUserInfo = () => {
  const [isChangeNickname, setIsChangeNickname] = useState(false);
  const [nickname, setNickname] = useState('닉네임');
  const navigation = useNavigation<any>();
  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.userInfo}>
        <View style={styles.userImgContainer}>
          <View style={styles.userImg} />
          <View style={styles.imgIconContainer}>
            <Icon name="camera-outline" size={20} color="black" />
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
      <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
          <View
            style={{
              width: iWidth * 100,
              height: iHeight * 40,
              borderRadius: 10,
              borderWidth: 1,
            }}>
            <Text>회원가입</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopUserInfo;

const styles = StyleSheet.create({
  userInfoContainer: {
    marginTop: iHeight * 40,
    width: '100%',
    height: iHeight * 90,
    backgroundColor: 'white',
  },

  userInfo: {
    flexDirection: 'row',
    paddingHorizontal: iWidth * 20,

    alignItems: 'center',
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

  userImgContainer: {
    position: 'relative',
  },

  userImg: {
    width: iWidth * 55,
    height: iWidth * 55,
    borderRadius: 999,
    marginRight: iWidth * 10,
    backgroundColor: 'gray',
  },

  imgIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: iWidth * 25,
    height: iWidth * 25,
    borderRadius: 50,
    elevation: 2,
    opacity: 0.8,
    backgroundColor: colors.lightGray,
    overflow: 'hidden',
  },
});
