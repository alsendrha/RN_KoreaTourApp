import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {colors, iHeight} from '../../globalStyle';

type CustomIndicatorProps = {
  marginTop: number;
};

const CustomIndicator = ({marginTop}: CustomIndicatorProps) => {
  return (
    <View style={styles.background}>
      <View
        style={[
          styles.indicatorContainer,
          {
            marginTop: iHeight * marginTop,
          },
        ]}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    </View>
  );
};

export default CustomIndicator;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: Dimensions.get('screen').height,
    backgroundColor: 'black',
    opacity: 0.6,
    position: 'absolute',
    zIndex: 10,
  },
  indicatorContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
