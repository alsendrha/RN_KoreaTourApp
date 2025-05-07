import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, iWidth} from '../../globalStyle';
import {useAreaSelected, useBottomSheetRef} from '../store/store';

type IButtonProps = {
  title?: string;
  titleColor?: string;
  fontSize?: number;
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
    | 'submit'
    | 'check'
    | 'bottomSheetMenu'
    | 'area'
    | 'areaList'
    | 'categories'
    | 'bottomCategories'
    | 'more'
    | 'modal'
    | 'review'
    | 'delete';
  border?: number;
  borderRightWidth?: number;
  borderLeftWidth?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  backgroundColor?: string;
  onPress?: () => void;
  children?: React.ReactNode;
};

const IButton = ({
  title,
  fontSize,
  titleColor,
  titleWeight,
  buttonStyle,
  borderRightWidth,
  borderLeftWidth,
  backgroundColor = 'white',
  border = 0.5,
  children,
  onPress,
}: IButtonProps) => {
  const {areaSelected} = useAreaSelected();
  const {bottomSheetRef} = useBottomSheetRef();

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const buttonStyleList = {
    menu: styles.menuBox,
    back: styles.backButton,
    check: [
      styles.check,
      {backgroundColor: backgroundColor, borderWidth: border},
    ],
    bottomSheetMenu: styles.menuContainer,
    area: styles.areaBox,
    areaList: [
      styles.areaListMenu,
      {
        backgroundColor: areaSelected === title ? colors.white : colors.primary,
        elevation: areaSelected === title ? 2 : 0,
      },
    ],
    categories: [styles.categoriesMenu],
    bottomCategories: styles.bottomCategories,
    more: styles.viewAll,
    review: [styles.reviewButton, {backgroundColor: backgroundColor}],
    item: styles.itemContainer,
    delete: styles.delete,
    submit: [
      styles.submit,
      {backgroundColor: backgroundColor, borderWidth: border},
    ],
    modal: [
      styles.modalButton,
      {
        borderLeftWidth: borderLeftWidth,
        borderRightWidth: borderRightWidth,
        backgroundColor: backgroundColor,
      },
    ],
  };

  return (
    <TouchableOpacity
      onPress={buttonStyle === 'menu' ? openBottomSheet : onPress}
      activeOpacity={1}
      style={buttonStyleList[buttonStyle]}>
      {children ? (
        children
      ) : (
        <Text
          style={{
            fontSize: fontSize,
            color: titleColor,
            fontWeight: titleWeight,
          }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default IButton;

const styles = StyleSheet.create({
  areaListMenu: {
    width: iWidth * 60,
    height: iWidth * 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: iWidth * 50,
    marginHorizontal: iWidth * 5,
  },

  categoriesMenu: {
    width: iWidth * 60,
    height: iWidth * 60,
    // borderWidth: 0.5,
    borderRadius: iWidth * 10,
    flexDirection: 'column',
    alignItems: 'center',
  },

  bottomCategories: {
    width: iWidth * 75,
    height: iWidth * 75,
    // borderWidth: 0.5,
    borderRadius: iWidth * 10,
    flexDirection: 'column',
    alignItems: 'center',
  },

  backButton: {
    width: iWidth * 30,
    height: iWidth * 30,
    borderRadius: 50,
    overflow: 'hidden',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  check: {
    paddingHorizontal: 10,
    height: iWidth * 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: iWidth * 4,
  },

  menuBox: {
    width: iWidth * 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: iWidth * 25,
  },
  menuContainer: {
    display: 'flex',
    width: iWidth * 90,
    height: iWidth * 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: iWidth * 8,
  },
  areaBox: {
    display: 'flex',
    width: iWidth * 60,
    height: iWidth * 40,
    margin: iWidth * 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: iWidth * 8,
  },
  viewAll: {},
  itemContainer: {},
  delete: {},
  submit: {
    width: iWidth * 120,
    height: iWidth * 40,
    borderRadius: iWidth * 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  reviewButton: {
    padding: iWidth * 5,
    borderRadius: iWidth * 10,

    elevation: 2,
  },

  modalButton: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: iWidth * 15,
    borderWidth: 0.2,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 0,
  },
});
