import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAreaSelected, useBottomSheetRef} from '../store/store';
import {iHeight, iWidth} from '../../globalStyle';

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
    | 'bottomCategories'
    | 'more'
    | 'delete';

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
    bottomCategories: styles.bottomCategories,
    more: styles.viewAll,
    item: styles.itemContainer,
    delete: styles.delete,
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
    width: iWidth * 60,
    height: iHeight * 60,
    // borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },

  bottomCategories: {
    width: iWidth * 75,
    height: iHeight * 75,
    // borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },

  backButton: {
    width: iWidth * 30,
    height: iHeight * 30,
    borderRadius: 50,
    overflow: 'hidden',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  menuBox: {
    width: iWidth * 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: iHeight * 25,
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
  delete: {},
});
