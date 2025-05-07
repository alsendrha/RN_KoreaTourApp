import React from 'react';
import {StyleSheet, View} from 'react-native';
import {iWidth} from '../../../globalStyle';
import IText from '../IText';

const UserDeleteModal = () => {
  return (
    <View style={styles.container}>
      <IText fontStyle="fR" text={'정말로 탈퇴하시겠습니까?'} />
    </View>
  );
};

export default UserDeleteModal;

const styles = StyleSheet.create({
  container: {
    marginVertical: iWidth * 15,
  },
});
