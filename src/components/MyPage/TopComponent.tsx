import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors, iWidth} from '../../../globalStyle';

const TopComponent = () => {
  return <View style={styles.userInfoContainer} />;
};

export default TopComponent;

const styles = StyleSheet.create({
  userInfoContainer: {
    width: '100%',
    height: iWidth * 170,
    backgroundColor: colors.primary,
  },
});
