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

const MyBottomSheet = () => {
  const {pageInfo} = usePageInfo();
  console.log('pageInfo', pageInfo);
  const snapPoints = useMemo(() => {
    switch (pageInfo) {
      case 'list':
        return ['48%'];
      case 'detail':
        return ['10%', '48%'];
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

  useEffect(() => {
    setBottomSheetRef(bottomRef);

    // 뒤로가기 핸들러 등록
    const backAction = () => {
      if (pageInfo === 'list' && bottomRef.current) {
        bottomRef.current.close(); // BottomSheet 닫기
        return true; // 뒤로 가기 버튼의 기본 동작 방지
      }
      return false; // 기본 뒤로 가기 동작 허용
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [pageInfo]);

  useEffect(() => {
    if (pageInfo === 'list') {
      bottomRef.current?.close();
    }
  }, [pageInfo]);

  return (
    <>
      {(pageInfo === 'list' || pageInfo === 'detail') && (
        <BottomSheet
          ref={bottomRef}
          snapPoints={snapPoints}
          enablePanDownToClose={pageInfo === 'list' ? true : false}
          enableContentPanningGesture={pageInfo === 'list' ? false : true}
          backdropComponent={pageInfo === 'list' ? renderBackdrop : null}
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
