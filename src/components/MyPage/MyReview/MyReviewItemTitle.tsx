import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {iWidth} from '../../../../globalStyle';
import IButton from '../../IButton';
import IText from '../../IText';

type MyReviewItemTitleProps = {
  onPress: () => void;
  title: string;
};

const MyReviewItemTitle = ({onPress, title}: MyReviewItemTitleProps) => {
  return (
    <IButton buttonStyle="more" onPress={onPress}>
      <View style={styles.reviewTitleContainer}>
        <IText fontStyle="fB" fontSize={14} text={title} />
        <Icon name={'chevron-forward-outline'} size={16} />
      </View>
    </IButton>
  );
};

export default MyReviewItemTitle;

const styles = StyleSheet.create({
  reviewTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: iWidth * 2,
  },
});
