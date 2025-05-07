import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {iWidth} from '../../../globalStyle';

const UserDeleteModal = () => {
  return (
    <View>
      <View style={styles.contentTextContainer}>
        <Text style={styles.contentText}>정말로 탈퇴하시겠습니까?</Text>
      </View>
    </View>
  );
};

export default UserDeleteModal;

const styles = StyleSheet.create({
  contentTextContainer: {
    marginVertical: iWidth * 15,
  },
  contentText: {},
});
