import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, iHeight, iWidth} from '../../../globalStyle';
import AreaList from './AreaList';
import Categories from './Categories';

const TopMenu = () => {
  return (
    <View style={styles.menuContainer}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.titleContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 32}}>
            어디로 가볼까요?
          </Text>
        </View>
        <AreaList />
      </View>
      <Categories />
    </View>
  );
};

export default TopMenu;

const styles = StyleSheet.create({
  menuContainer: {
    paddingHorizontal: iWidth * 40,
    paddingVertical: iHeight * 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    elevation: 5,
    backgroundColor: colors.white,
  },

  titleContainer: {
    marginVertical: 10,
  },
});
