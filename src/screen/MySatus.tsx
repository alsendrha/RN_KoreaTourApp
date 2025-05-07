import storage from '@react-native-firebase/storage';
import {useNavigationState} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {colors, iWidth} from '../../globalStyle';
import {useGetUSerInfo, useUpdateUser} from '../api/firebase';
import IButton from '../components/IButton';
import IModal from '../components/IModal';
import Background from '../components/MyPage/Status/Background';
import InputAndPassword from '../components/MyPage/Status/InputAndPassword';
import TopUserImg from '../components/MyPage/Status/TopUserImg';
import UserDelete from '../components/MyPage/Status/UserDelete';
import {useImagePicker, usePageInfo} from '../store/store';
import {UserDataType} from '../types/dataListType';
import {CheckedNickname} from '../utils/validation';

const MyStatus = () => {
  const {imageData, setImageData} = useImagePicker();
  const {mutate} = useUpdateUser();
  const [userData, setUserData] = useState({
    id: '',
    nickname: '',
    profileImg: '',
  });
  const {data, isLoading, refetch} = useGetUSerInfo();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(true);
  const [errorMsg, setErrorMsg] = useState({
    nickname: '',
  });
  const {setPageInfo} = usePageInfo();
  const [userNickname, setUserNickname] = useState('');
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [userDelete, setUserDelete] = useState(false);
  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });

  useEffect(() => {
    setPageInfo(currentRouteName);
  }, [currentRouteName]);

  useEffect(() => {
    if (!data) return;
    setUserNickname(data.nickname);
    setUserData({
      id: data.email,
      nickname: data.nickname,
      profileImg: data.profileUrl,
    });
  }, [data]);

  useEffect(() => {
    if (userData.nickname !== userNickname) {
      setNicknameCheck(false);
    } else if (userData.nickname === userNickname) {
      setNicknameCheck(true);
    }
  }, [userData.nickname]);

  const handleSubmit = async () => {
    if (userNickname !== userData.nickname) {
      const check = await CheckedNickname({
        setErrorMsg,
        nickname: userData.nickname,
      });
      setNicknameCheck(check);
    }

    if (!nicknameCheck) return;

    setSubmitLoading(true);
    try {
      let url = '';
      if (imageData.uri) {
        const storageRef = storage().ref(`images/${imageData.fileName}`);
        await storageRef.putFile(imageData.uri!, {contentType: imageData.type});
        url = await storageRef.getDownloadURL();
      }
      const data: UserDataType = {
        nickname: userData.nickname,
      };

      if (imageData.uri) {
        data.profileUrl = url;
      }

      mutate(data, {
        onSuccess: () => {
          setSubmitLoading(false);
          Alert.alert('성공', '수정되었습니다.', [
            {
              text: '확인',
              onPress: () => {
                setImageData({
                  uri: '',
                  type: '',
                  fileName: '',
                });
                setErrorMsg({
                  nickname: '',
                });
                refetch();
              },
            },
          ]);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <Background />
      {submitLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <TopUserImg
            isLoading={isLoading}
            imageData={imageData}
            userData={userData}
          />
          <InputAndPassword
            isLoading={isLoading}
            userData={userData}
            errorMsg={errorMsg}
            setUserData={setUserData}
            setPasswordClicked={setPasswordClicked}
          />
          <View style={styles.submitButtonContainer}>
            <IButton
              buttonStyle="submit"
              title="확인"
              border={0}
              backgroundColor={colors.primary}
              titleColor="white"
              onPress={() => handleSubmit()}
            />
          </View>
          <UserDelete setUserDelete={setUserDelete} />
        </View>
      )}
      {(passwordClicked || userDelete) && (
        <IModal
          passwordClicked={passwordClicked}
          setPasswordClicked={setPasswordClicked}
          userDelete={userDelete}
          setUserDelete={setUserDelete}
        />
      )}
    </Pressable>
  );
};

export default MyStatus;

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  contentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: iWidth * 20,
    position: 'absolute',
    marginTop: iWidth * 110,
    marginHorizontal: iWidth * 30,
    height: iWidth * 500,
    elevation: 5,
  },

  submitButtonContainer: {
    marginTop: iWidth * 20,
    alignItems: 'center',
  },
});
