import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

type MyBottomSheetProps = {
  bottomSheetRef: React.RefObject<BottomSheet>;
};

const MyBottomSheet = ({bottomSheetRef}: MyBottomSheetProps) => {
  const snapPoints = useMemo(() => ['30%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={-1}
      style={styles.contentContainer}>
      <BottomSheetView style={styles.bottomSheetView}>
        <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
          <View style={styles.innerContainer}>
            <Text>close</Text>
          </View>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1, // Ensure BottomSheet uses available space
  },
  bottomSheetView: {
    paddingRight: 10,
    flex: 1, // Ensure BottomSheetView uses available space
    width: '100%',
  },
  innerContainer: {
    // backgroundColor: 'yellow',
    // flex: 1, // Ensure innerContainer uses available space
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bottomSheetClose: {
    // width: '100%',
    borderWidth: 1,
  },
});

export default MyBottomSheet;
