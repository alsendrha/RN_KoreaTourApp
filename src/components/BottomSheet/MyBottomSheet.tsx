import {View, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useBottomSheetRef} from '../../store/store';
import Menu from './Menu';

const MyBottomSheet = () => {
  const snapPoints = useMemo(() => {
    return ['48%'];
  }, []);
  const {setBottomSheetRef} = useBottomSheetRef();
  const bottomRef = useRef<BottomSheet>(null);
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
      enableContentPanningGesture={false}
      backdropComponent={renderBackdrop}
      index={-1}
      style={styles.contentContainer}>
      <BottomSheetView style={styles.bottomSheetView}>
        <BottomSheetScrollView>
          <View style={styles.contentWrapper}>
            <Menu />
          </View>
        </BottomSheetScrollView>
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
