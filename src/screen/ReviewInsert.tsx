import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigationState} from '@react-navigation/native';
import {useItemInfo, usePageInfo} from '../store/store';
import PointAndInput from '../components/BottomSheet/Review/PointAndInput';
import {iHeight} from '../../globalStyle';

const ReviewInsert = () => {
  const {itemId, itemTitle} = useItemInfo();
  const {setPageInfo} = usePageInfo();
  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });

  useEffect(() => {
    setPageInfo(currentRouteName);
  }, [currentRouteName]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{itemTitle}</Text>
      </View>
      <PointAndInput itemId={itemId} itemTitle={itemTitle} />
    </View>
  );
};

export default ReviewInsert;

const styles = StyleSheet.create({
  container: {
    marginTop: iHeight * 30,
  },

  titleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
