import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {Dimensions} from 'react-native';

import {iWidth} from '../../globalStyle';
import {useLoading} from '../store/store';

const Loading = () => {
  const {loading, loadingTitle} = useLoading();
  return (
    <>
      {loading && (
        <View style={styles.background}>
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.textStyle}>{loadingTitle}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default Loading;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: Dimensions.get('screen').height,
    backgroundColor: 'black',
    opacity: 0.7,
    position: 'absolute',
    zIndex: 999,
  },
  indicatorContainer: {
    flexDirection: 'row',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    color: 'black',
    marginLeft: iWidth * 8,
  },
});
