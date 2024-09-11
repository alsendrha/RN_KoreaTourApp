import {View, StyleSheet, BackHandler} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useBottomSheetRef, usePageInfo} from '../../store/store';
import Menu from './Menu';
import Review from './Review';
import {colors} from '../../../globalStyle';

const MyBottomSheet = () => {
  const {pageInfo} = usePageInfo();
  const snapPoints = useMemo(() => {
    switch (pageInfo) {
      case 'list':
        return ['48%'];
      case 'detail':
        return ['10%', '50%', '100%'];
      default:
        return ['50%'];
    }
  }, [pageInfo]);
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
    <>
      {(pageInfo === 'list' || pageInfo === 'detail') && (
        <BottomSheet
          ref={bottomRef}
          snapPoints={snapPoints}
          enablePanDownToClose={pageInfo === 'list' ? true : false}
          enableContentPanningGesture={pageInfo === 'list' ? false : true}
          backdropComponent={pageInfo === 'list' ? renderBackdrop : undefined}
          backgroundStyle={{
            backgroundColor: pageInfo === 'list' ? 'white' : colors.white,
          }}
          index={pageInfo === 'list' ? -1 : 0}
          style={styles.contentContainer}>
          <BottomSheetView style={styles.bottomSheetView}>
            <BottomSheetScrollView>
              <View style={styles.contentWrapper}>
                {pageInfo === 'list' ? <Menu /> : <Review />}
              </View>
            </BottomSheetScrollView>
          </BottomSheetView>
        </BottomSheet>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 50,
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
