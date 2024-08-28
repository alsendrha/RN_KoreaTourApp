import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HeaderBar = (route: any) => {
  console.log('나오나', route);
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
    height: 70,
    backgroundColor: '#fff',
  },
});
