import {StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import TopMenu from '../components/Main/TopMenu';
import SelectedList from '../components/Main/SelectedList';
import {colors} from '../../globalStyle';
import {useNavigationState} from '@react-navigation/native';
import {usePageInfo} from '../store/store';

const Main = () => {
  const {setPageInfo} = usePageInfo();
  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });
  useEffect(() => {
    setPageInfo(currentRouteName);
  }, [currentRouteName]);

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
