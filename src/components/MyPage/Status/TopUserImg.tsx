import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IButton from '../../IButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {iHeight, iWidth} from '../../../../globalStyle';
import {useBottomSheetRef} from '../../../store/store';

type TopUserImgProps = {
  isLoading: boolean;
  imageData: {
    uri: string | undefined;
    type: string | undefined;
    fileName: string | undefined;
  };
  userData: {
    id: string;
    nickname: string;
    profileImg: string;
  };
};

const TopUserImg = ({isLoading, imageData, userData}: TopUserImgProps) => {
  const {bottomSheetRef} = useBottomSheetRef();

  const handleBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View style={styles.userImgContainer}>
      <View style={styles.imgContainer}>
        <View style={styles.img}>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <IButton buttonStyle="more" onPress={handleBottomSheet}>
              <Image
                source={
                  imageData.uri
                    ? {uri: imageData.uri}
                    : userData.profileImg
                    ? {uri: userData.profileImg}
                    : require('../../../assets/images/no_image.png')
                }
                style={styles.userImg}
              />
            </IButton>
          )}
          <View style={styles.iconContainer}>
            <Icon name={'camera-sharp'} size={20} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopUserImg;

const styles = StyleSheet.create({
  userImgContainer: {
    position: 'relative',
  },

  imgContainer: {
    position: 'absolute',
    top: iHeight * -45,
    left: '50%',
    transform: [{translateX: -50}],
  },

  img: {
    position: 'relative',
    overflow: 'hidden',
  },

  userImg: {
    width: iWidth * 100,
    height: iWidth * 100,
    borderRadius: 999,
    backgroundColor: 'gray',
  },

  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#e3e3e3',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
