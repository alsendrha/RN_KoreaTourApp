import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
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

  menuBox: {
    position: 'relative',
    width: iWidth * 90,
    height: iHeight * 30,
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
