import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, iHeight} from '../../globalStyle';

const HeaderBar = (route: any) => {
  return (
    <View style={styles.container}>
      <Text>{route.name}</Text>
      <Text>dsds</Text>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    height: iHeight * 70,
    backgroundColor: colors.white,
  },
});
