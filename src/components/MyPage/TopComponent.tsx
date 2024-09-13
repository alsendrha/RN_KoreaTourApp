import {StyleSheet, View} from 'react-native';
import React from 'react';

import {iHeight} from '../../../globalStyle';

const TopComponent = () => {
  return <View style={styles.userInfoContainer} />;
};

export default TopComponent;

const styles = StyleSheet.create({
  userInfoContainer: {
    width: '100%',
    height: iHeight * 170,
    backgroundColor: '#E07039',
  },
});
