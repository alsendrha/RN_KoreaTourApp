import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {useBottomSheetRef} from '../store/store';

type IButtonProps = {
  title: string;
  buttonStyle: 'menu' | 'bottomSheetMenu' | 'area';
  onPress?: () => void;
};

const IButton = ({title, buttonStyle, onPress}: IButtonProps) => {
  const {setBottomSheetRef} = useBottomSheetRef();
  const bottomRef = useRef<BottomSheet>(null);

  const openBottomSheet = () => {
    setBottomSheetRef(bottomRef);
    bottomRef.current?.expand();
  };

  const buttonStyleList = {
    menu: styles.menuBox,
    bottomSheetMenu: styles.menuContainer,
    area: styles.areaBox,
  };

  return (
    <TouchableOpacity
      onPress={buttonStyle === 'menu' ? openBottomSheet : onPress}
      activeOpacity={1}>
      <View style={buttonStyleList[buttonStyle]}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IButton;

const styles = StyleSheet.create({
  menuBox: {
    position: 'relative',
    width: 100,
    height: 30,
    backgroundColor: '#fff',
    elevation: 2,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    display: 'flex',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  areaBox: {
    display: 'flex',
    width: 70,
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
});
