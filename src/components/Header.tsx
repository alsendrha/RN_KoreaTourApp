import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, iWidth} from '../../globalStyle';

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
    height: iWidth * 70,
    backgroundColor: colors.white,
  },
});
