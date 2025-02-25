import React from 'react';
import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import {iHeight} from '../../globalStyle';
import PointAndInput from '../components/BottomSheet/Review/PointAndInput';
import {useItemInfo} from '../store/store';

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
    color: 'black',
  },
});
