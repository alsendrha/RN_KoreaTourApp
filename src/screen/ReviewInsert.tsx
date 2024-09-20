import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useItemInfo} from '../store/store';
import PointAndInput from '../components/BottomSheet/Review/PointAndInput';
import {iHeight} from '../../globalStyle';

const ReviewInsert = () => {
  const {itemId, itemTitle, contentTypeId} = useItemInfo();

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{itemTitle}</Text>
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
    backgroundColor: 'white',
    paddingTop: iHeight * 30,
  },

  titleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
