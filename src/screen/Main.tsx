import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React from 'react';
import {useAreaSelected, useContentsSelected} from '../store/store';
import {areaList, contentList} from '../data/listData';
import {iHeight, iWidth} from '../../globalStyle';
import IButton from '../components/IButton';
import ItemList from '../components/Main/ItemList';
import TopMenu from '../components/Main/TopMenu';

const Main = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TopMenu />
      <ItemList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default Main;
