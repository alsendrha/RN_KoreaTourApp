import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useQueryClient} from '@tanstack/react-query';

const Notice = () => {
  const queryClient = useQueryClient();

  return (
    <View style={styles.container}>
      <Text>개발중입니다</Text>
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
