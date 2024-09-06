import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useBottomSheetRef} from '../../store/store';
import Area from './Area';
import Contents from './Contents';
import Menu from './Menu';

import {iHeight, iWidth} from '../../../globalStyle';

const MyBottomSheet = () => {
  const [menuList, setMenuList] = useState('menu');
  const snapPoints = useMemo(() => {
    switch (menuList) {
      case 'menu':
        return ['50%'];
      case 'area':
        return ['40%'];
      case 'contents':
        return ['25%'];
      default:
        return ['25%'];
    }
  }, [menuList]);
  const {setBottomSheetRef} = useBottomSheetRef();
  const bottomRef = useRef<BottomSheet>(null);
  const ContentList: any = {
    menu: <Menu setMenuList={setMenuList} />,
    area: <Area setMenuList={setMenuList} />,
    contents: <Contents setMenuList={setMenuList} />,
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  useEffect(() => {
    setBottomSheetRef(bottomRef);
  }, []);

  return (
    <BottomSheet
      ref={bottomRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      index={-1}
      style={styles.contentContainer}>
      <BottomSheetView style={styles.bottomSheetView}>
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
    paddingHorizontal: 10,
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  innerContainer: {
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
