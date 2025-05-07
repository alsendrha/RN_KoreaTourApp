import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {iWidth, normalizeFont} from '../../../globalStyle';
import {useBottomSheetRef, useImagePicker} from '../../store/store';

const ImageSheet = () => {
  const {bottomSheetRef} = useBottomSheetRef();
  const {setImageData} = useImagePicker();

  const handleImagePicker = (pickerType: string) => {
    switch (pickerType) {
      case 'imageLibrary':
        launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: iWidth * 200,
            maxWidth: iWidth * 200,
            quality: 0.7,
          },
          res => {
            if (res.didCancel) {
              console.log('User cancelled image picker');
            } else if (res.errorCode) {
              console.log('ImagePicker Error: ', res.errorMessage);
            } else {
              console.log('이미지', res.assets![0]);
              setImageData({
                uri: res.assets![0].uri,
                type: res.assets![0].type,
                fileName: res.assets![0].fileName,
              });
              bottomSheetRef.current?.close();
            }
          },
        );

        break;
      case 'camera':
        launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: iWidth * 200,
            maxWidth: iWidth * 200,
            quality: 0.7,
          },
          res => {
            if (res.didCancel) {
              console.log('User cancelled image picker');
            } else if (res.errorCode) {
              console.log('ImagePicker Error: ', res.errorMessage);
            } else {
              setImageData({
                uri: res.assets![0].uri,
                type: res.assets![0].type,
                fileName: res.assets![0].fileName,
              });
              bottomSheetRef.current?.close();
            }
          },
        );
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>프로필 사진 설정</Text>
        </View>
        <TouchableHighlight
          style={styles.menuContainer}
          underlayColor="#d1d1d1"
          onPress={() => handleImagePicker('imageLibrary')}>
          <Text style={styles.menuText}>앨범에서 사진</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#d1d1d1"
          onPress={() => handleImagePicker('camera')}
          style={[
            styles.menuContainer,
            {
              borderBottomLeftRadius: iWidth * 20,
              borderBottomRightRadius: iWidth * 20,
              borderBottomWidth: 0,
            },
          ]}>
          <Text style={styles.menuText}>카메라 촬영</Text>
        </TouchableHighlight>
      </View>
      <TouchableHighlight
        underlayColor="#d1d1d1"
        style={[
          styles.menuContainer,
          {
            marginTop: iWidth * 15,
            borderRadius: iWidth * 20,
          },
        ]}
        onPress={() => bottomSheetRef.current?.close()}>
        <Text style={styles.menuText}>종료</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ImageSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleContainer: {
    paddingVertical: iWidth * 15,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopLeftRadius: iWidth * 20,
    borderTopRightRadius: iWidth * 20,
  },
  titleText: {
    fontSize: normalizeFont(14),
  },

  menuText: {
    fontSize: normalizeFont(18),
    fontWeight: '600',
    color: '#4e8df2',
  },

  menuContainer: {
    paddingVertical: iWidth * 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#d1d1d1',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
});
