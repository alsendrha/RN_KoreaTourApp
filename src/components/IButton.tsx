import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {useBottomSheetRef} from '../store/store';

type IButtonProps = {
  title?: string;
  buttonStyle:
    | 'menu'
    | 'bottomSheetMenu'
    | 'area'
    | 'areaList'
    | 'arrowLeft'
    | 'arrowRight';
  onPress?: () => void;
  children?: React.ReactNode;
};

const IButton = ({title, buttonStyle, children, onPress}: IButtonProps) => {
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
    arrowLeft: styles.arrowLeft,
    arrowRight: styles.arrowRight,
    areaList: styles.areaListMenu,
  };

  return (
    <TouchableOpacity
      style={
        buttonStyle === 'arrowLeft'
          ? styles.touchableLeft
          : buttonStyle === 'arrowRight'
          ? styles.touchableRight
          : {}
      }
      onPress={buttonStyle === 'menu' ? openBottomSheet : onPress}
      activeOpacity={1}>
      <View style={buttonStyleList[buttonStyle]}>
        {children ? children : <Text>{title}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default IButton;

const styles = StyleSheet.create({
  touchableLeft: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -15}],
    left: 10,
  },
  touchableRight: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -15}],
    right: 10,
  },

  areaListMenu: {
    width: 50,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 5,
  },

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
  arrowLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: '#fff',
    elevation: 2,
    opacity: 0.8,
  },
  arrowRight: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: '#fff',
    elevation: 2,
    opacity: 0.8,
  },
});
