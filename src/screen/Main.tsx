import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useAreaSelected, useContentsSelected} from '../store/store';
import {areaList, contentList} from '../data/listData';
import {iHeight, iWidth} from '../../globalStyle';
import IButton from '../components/IButton';
import ItemList from '../components/Main/ItemList';
import TopMenu from '../components/Main/TopMenu';
import {useGetToreList} from '../api/toreQuery';
import SelectedList from '../components/Main/SelectedList';

const Main = ({navigation}: any) => {
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
    backgroundColor: '#fff',
  },
});

export default Main;
