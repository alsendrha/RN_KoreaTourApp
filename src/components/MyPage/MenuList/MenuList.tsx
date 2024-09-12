import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MenuComponent from './MenuComponent';
import {myPageMenuList} from '../../../utils/listData';

const MenuList = () => {
  return (
    <View style={styles.container}>
      {myPageMenuList.map(menu => (
        <MenuComponent key={menu.id} menu={menu} />
      ))}
    </View>
  );
};

export default MenuList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
