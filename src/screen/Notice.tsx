import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
    marginTop: -80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBlockColor: 'white',
  },
});
