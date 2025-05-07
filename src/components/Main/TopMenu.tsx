import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, iWidth} from '../../../globalStyle';
import IText from '../IText';
import AreaList from './AreaList';
import Categories from './Categories';

const TopMenu = () => {
  return (
    <View style={styles.menuContainer}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.titleContainer}>
          <IText fontStyle="fB" fontSize={32} text="어디로 가볼까요?" />
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
    paddingVertical: iWidth * 20,
    borderBottomLeftRadius: iWidth * 50,
    borderBottomRightRadius: iWidth * 50,
    elevation: 5,
    backgroundColor: colors.white,
  },

  titleContainer: {
    marginVertical: iWidth * 10,
  },
});
