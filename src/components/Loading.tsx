import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';

import {colors, iWidth} from '../../globalStyle';
import {useLoading} from '../store/store';
import IText from './IText';

const Loading = () => {
  const {loading, loadingTitle} = useLoading();
  return (
    <>
      {loading && (
        <View style={styles.container}>
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" color={colors.white} />
            <IText fontStyle="fR" text={loadingTitle} />
          </View>
        </View>
      )}
    </>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('screen').height,
    backgroundColor: colors.black,
    opacity: 0.7,
    position: 'absolute',
    zIndex: 999,
  },
  indicatorContainer: {
    flexDirection: 'row',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: iWidth * 8,
  },
});
