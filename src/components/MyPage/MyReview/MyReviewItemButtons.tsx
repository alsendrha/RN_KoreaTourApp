import React from 'react';
import {StyleSheet, View} from 'react-native';
import {iWidth} from '../../../../globalStyle';
import IButton from '../../IButton';

type MyReviewItemButtonsProps = {
  updateOnPress: () => void;
  deleteOnPress: () => void;
};

const MyReviewItemButtons = ({
  updateOnPress,
  deleteOnPress,
}: MyReviewItemButtonsProps) => {
  return (
    <View style={styles.container}>
      <IButton
        buttonStyle="review"
        backgroundColor="#e3e3e3"
        title="수정"
        onPress={updateOnPress}
      />
      <IButton
        buttonStyle="review"
        backgroundColor="#e3e3e3"
        title="삭제"
        onPress={deleteOnPress}
      />
    </View>
  );
};

export default MyReviewItemButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: iWidth * 6,
  },
});
