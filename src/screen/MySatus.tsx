import {Image, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGetUSerInfo} from '../api/firebase';
import {iHeight} from '../../globalStyle';
import IInput from '../components/IInput';
import IButton from '../components/IButton';
import {firebase} from '@react-native-firebase/auth';

const MyStatus = () => {
  const [userData, setUserData] = useState({
    id: '',
    nickname: '',
    profileImg: '',
  });
  const {data} = useGetUSerInfo();

  useEffect(() => {
    if (!data) return;
    setUserData({
      id: data.email,
      nickname: data.nickname,
      profileImg: data.profileUrl,
    });
  }, [data]);

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <View style={styles.topBackground} />
      <View style={styles.bottomBackground} />
      <View style={styles.contentContainer}>
        <View style={styles.userImgContainer}>
          <Image
            source={
              userData.profileImg
                ? {uri: userData.profileImg}
                : require('../assets/images/no_image.png')
            }
            style={styles.userImg}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputMainContainer}>
            <IInput
              titleEnable={true}
              height={50}
              fontSize={16}
              titleText="이메일"
              value={userData.id}
              borderRadius={10}
              maxLength={30}
              deleteIcon={false}
              editable={false}
            />
          </View>
          <View style={styles.inputMainContainer}>
            <IInput
              titleEnable={true}
              height={50}
              fontSize={16}
              titleText="닉네임"
              value={userData.nickname}
              borderRadius={10}
              maxLength={30}
              deleteIcon={false}
            />
          </View>
          <IButton buttonStyle="more">
            <View style={styles.passwordContainer}>
              <Text>비밀번호 변경</Text>
            </View>
          </IButton>
          <View style={styles.submitButtonContainer}>
            <IButton
              buttonStyle="submit"
              title="확인"
              border={0}
              backgroundColor="#E07039"
              titleColor="white"
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MyStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  topBackground: {
    height: iHeight * 150,
    backgroundColor: '#E07039',
  },
  bottomBackground: {
    height: '100%',
    backgroundColor: '#F7F7F7',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    marginTop: iHeight * 110,
    marginHorizontal: 30,
    height: iHeight * 450,
    elevation: 5,
  },
  userImgContainer: {
    position: 'relative',
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'gray',
    position: 'absolute',
    top: -50,
    left: '50%',
    transform: [{translateX: -50}],
  },

  inputContainer: {
    marginTop: iHeight * 75,
    paddingHorizontal: 15,
  },

  inputMainContainer: {
    marginTop: 10,
  },

  passwordContainer: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
