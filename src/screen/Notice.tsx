import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {iWidth} from '../../globalStyle';

const Notice = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>개발중입니다</Text>
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: iWidth * -80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBlockColor: 'white',
  },
});
