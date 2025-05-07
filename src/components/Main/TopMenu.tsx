import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, iWidth, normalizeFont} from '../../../globalStyle';
import AreaList from './AreaList';
import Categories from './Categories';

const TopMenu = () => {
  return (
    <View style={styles.menuContainer}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.titleContainer}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: normalizeFont(32),
            }}>
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
