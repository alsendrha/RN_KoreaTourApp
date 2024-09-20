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

import ImageSheet from './ImageSheet';
const MyBottomSheet = () => {
  const {pageInfo} = usePageInfo();
  console.log('현재 페이지', pageInfo);
  const snapPoints = useMemo(() => {
    switch (pageInfo) {
      case 'list':
        return ['48%'];
      case 'detail':
        return ['10%', '50%', '100%'];
      case 'myStatus':
        return ['31%'];
      default:
        break;
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

  const bottomSheetScreens = () => {
    switch (pageInfo) {
      case 'list':
        return <Menu />;
      case 'detail':
        return <Review />;
      case 'myStatus':
        return <ImageSheet />;
      default:
        break;
    }
  };

  useEffect(() => {
    setBottomSheetRef(bottomRef);
    if (bottomRef.current && pageInfo === 'detail') {
      bottomRef.current.snapToIndex(0);
    }
  }, [pageInfo]);

  return (
    <>
      {(pageInfo === 'list' ||
        pageInfo === 'detail' ||
        pageInfo === 'myStatus') && (
        <BottomSheet
          ref={bottomRef}
          snapPoints={snapPoints}
          handleStyle={{
            backgroundColor:
              pageInfo === 'list' || pageInfo === 'myStatus'
                ? 'white'
                : '#ECE0DA',
            display: pageInfo === 'myStatus' ? 'none' : 'flex',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 0,
          }}
          enablePanDownToClose={
            pageInfo === 'list' || pageInfo === 'myStatus' ? true : false
          }
          enableContentPanningGesture={pageInfo === 'list' ? false : true}
          backdropComponent={
            pageInfo === 'list' || pageInfo === 'myStatus'
              ? renderBackdrop
              : undefined
          }
          backgroundStyle={{
            backgroundColor: pageInfo === 'myStatus' ? 'transparent ' : 'white',
          }}
          index={pageInfo === 'list' || pageInfo === 'myStatus' ? -1 : 0}
          style={[
            styles.contentContainer,
            {
              backgroundColor:
                pageInfo === 'myStatus' ? 'transparent' : 'white',
            },
          ]}>
          <BottomSheetView style={styles.bottomSheetView}>
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.contentWrapper}>{bottomSheetScreens()}</View>
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
    borderRadius: 50,
  },
  bottomSheetView: {
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
