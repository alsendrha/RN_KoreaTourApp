import React from 'react';
import {StyleSheet, View} from 'react-native';
import {iWidth} from '../../../../globalStyle';
import {myPageMenuList} from '../../../utils/listData';
import MenuComponent from './MenuComponent';

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
    marginTop: iWidth * 20,
    paddingHorizontal: iWidth * 20,
  },
});
