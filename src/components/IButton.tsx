import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  useAreaSelected,
  useBottomSheetRef,
  useContentsSelected,
} from '../store/store';

type IButtonProps = {
  title?: string;
  titleColor?: string;
  titleWeight?:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  category?: number;
  buttonStyle:
    | 'menu'
    | 'bottomSheetMenu'
    | 'area'
    | 'areaList'
    | 'categories'
    | 'arrowLeft'
    | 'arrowRight';
  onPress?: () => void;
  children?: React.ReactNode;
};

const IButton = ({
  title,
  titleColor,
  titleWeight,
  buttonStyle,
  category,
  children,
  onPress,
}: IButtonProps) => {
  const {areaSelected} = useAreaSelected();
  const {contentsSelected} = useContentsSelected();
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
    areaList: [
      styles.areaListMenu,
      {
        backgroundColor: areaSelected === title ? 'white' : '#ededed',
        elevation: areaSelected === title ? 2 : 0,
      },
    ],
    categories: [
      styles.categoriesMenu,
      {
        backgroundColor: contentsSelected === category ? 'white' : 'gray',
      },
    ],
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
        {children ? (
          children
        ) : (
          <Text style={{color: titleColor, fontWeight: titleWeight}}>
            {title}
          </Text>
        )}
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
    width: 70,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 5,
  },

  categoriesMenu: {
    paddingVertical: 5,
    width: 60,
    height: 70,
    borderWidth: 0.5,
    marginHorizontal: 5,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
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
