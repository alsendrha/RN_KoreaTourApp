import React from 'react';
import {Keyboard, Pressable, StyleSheet, View} from 'react-native';
import {colors, iWidth} from '../../globalStyle';
import PointAndInput from '../components/BottomSheet/Review/PointAndInput';
import IText from '../components/IText';
import {useItemInfo} from '../store/store';

const ReviewInsert = () => {
  const {itemId, itemTitle, contentTypeId} = useItemInfo();

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <View style={styles.titleContainer}>
        <IText fontStyle="fB" fontSize={20} text={itemTitle} />
      </View>
      <PointAndInput
        itemId={itemId}
        itemTitle={itemTitle}
        contentTypeId={contentTypeId}
      />
    </Pressable>
  );
};

export default ReviewInsert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: iWidth * 30,
  },

  titleContainer: {
    alignItems: 'center',
    marginVertical: iWidth * 10,
  },
});
