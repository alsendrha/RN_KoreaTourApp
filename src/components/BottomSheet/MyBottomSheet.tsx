import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useBottomSheetRef} from '../../store/store';
import Area from './Area';
import Contents from './Contents';
import Menu from './Menu';

const MyBottomSheet = () => {
  const snapPoints = useMemo(() => ['40%'], []);
  const {bottomSheetRef} = useBottomSheetRef();
  const [menuList, setMenuList] = useState('menu');
  const ContentList: any = {
    menu: <Menu setMenuList={setMenuList} />,
    area: <Area />,
    contents: <Contents />,
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={-1}
      style={styles.contentContainer}>
      <BottomSheetView style={styles.bottomSheetView}>
        <TouchableOpacity
          onPress={() => {
            setMenuList('menu');
            bottomSheetRef.current?.close();
          }}>
          <View style={styles.innerContainer}>
            <Text>close</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.contentWrapper}>{ContentList[menuList]}</View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  bottomSheetView: {
    paddingRight: 10,
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  innerContainer: {
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bottomSheetClose: {
    borderWidth: 1,
  },

  contentWrapper: {
    flex: 1,
  },
});

export default MyBottomSheet;
