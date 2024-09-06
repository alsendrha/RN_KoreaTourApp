import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {useAreaSelected, useBottomSheetRef} from '../store/store';
import {colors, iHeight, iWidth} from '../../globalStyle';

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
  buttonStyle:
    | 'menu'
    | 'item'
    | 'back'
    | 'bottomSheetMenu'
    | 'area'
    | 'areaList'
    | 'categories'
    | 'more';

  onPress?: () => void;
  children?: React.ReactNode;
};

const IButton = ({
  title,
  titleColor,
  titleWeight,
  buttonStyle,
  children,
  onPress,
}: IButtonProps) => {
  const {areaSelected} = useAreaSelected();
  const {bottomSheetRef} = useBottomSheetRef();

  const openBottomSheet = () => {
    console.log('클릭되는거야?', bottomSheetRef.current);
    bottomSheetRef.current?.expand();
  };

  const buttonStyleList = {
    menu: styles.menuBox,
    back: styles.backButton,
    bottomSheetMenu: styles.menuContainer,
    area: styles.areaBox,
    areaList: [
      styles.areaListMenu,
      {
        backgroundColor: areaSelected === title ? 'white' : '#ededed',
        elevation: areaSelected === title ? 2 : 0,
      },
    ],
    categories: [styles.categoriesMenu],
    more: styles.viewAll,
    item: styles.itemContainer,
  };

  return (
    <TouchableOpacity
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
  areaListMenu: {
    width: iWidth * 60,
    height: iHeight * 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 5,
  },

  categoriesMenu: {
    paddingVertical: 5,
    width: iWidth * 60,
    height: iHeight * 60,
    // borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backButton: {},

  menuBox: {
    // position: 'relative',
    width: iWidth * 25,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    height: iHeight * 25,
    // backgroundColor: colors.white,
    // elevation: 2,
    // shadowRadius: 8,
    // shadowOffset: {width: 0, height: 2},
    // borderRadius: 8,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  menuContainer: {
    display: 'flex',
    width: iWidth * 90,
    height: iHeight * 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  areaBox: {
    display: 'flex',
    width: iWidth * 60,
    height: iHeight * 40,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  viewAll: {},
  itemContainer: {},
});
