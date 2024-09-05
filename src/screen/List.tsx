import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemList from '../components/List/ItemList';
import {colors} from '../../globalStyle';

const List = () => {
  return (
    <View style={styles.container}>
      <ItemList />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
