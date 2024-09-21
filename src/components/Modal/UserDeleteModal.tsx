import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {iHeight} from '../../../globalStyle';

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
    marginVertical: iHeight * 15,
  },
  contentText: {},
});
