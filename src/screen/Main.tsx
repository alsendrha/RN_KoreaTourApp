import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import TopMenu from '../components/Main/TopMenu';
import SelectedList from '../components/Main/SelectedList';
import {colors} from '../../globalStyle';

const Main = () => {
  return (
    <ScrollView style={styles.container}>
      <TopMenu />
      <SelectedList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Main;
