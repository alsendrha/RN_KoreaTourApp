import React, {useCallback} from 'react';
import {ColorValue, Pressable, StyleSheet} from 'react-native';
import {colors, iWidth} from '../../globalStyle';
import {useAreaSelected, useBottomSheetRef} from '../store/store';
import IText from './IText';

type IButtonProps = {
  title?: string;
  titleColor?: ColorValue;
  fontSize?: number;
  fontStyle?: 'fR' | 'fB' | 'fM' | 'fSB';
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
  fontSize = 16,
  titleColor,
  fontStyle = 'fR',
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
    <Pressable
      onPress={buttonStyle === 'menu' ? openBottomSheet : onPress}
      style={buttonStyleList[buttonStyle]}>
      {children ? (
        children
      ) : (
        <IText
          fontStyle={fontStyle}
          textColor={titleColor}
          fontSize={fontSize}
          text={title}
        />
      )}
    </Pressable>
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
  },

  categoriesMenu: {
    width: iWidth * 60,
    height: iWidth * 60,
    // borderWidth: 0.5,
    borderRadius: iWidth * 12,
    flexDirection: 'column',
    alignItems: 'center',
  },

  bottomCategories: {
    width: iWidth * 75,
    height: iWidth * 75,
    // borderWidth: 0.5,
    borderRadius: iWidth * 12,
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
    backgroundColor: colors.white,
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
    borderRadius: iWidth * 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  reviewButton: {
    paddingVertical: iWidth * 5,
    paddingHorizontal: iWidth * 10,
    borderRadius: iWidth * 12,
    elevation: 2,
  },

  modalButton: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: iWidth * 16,
    borderWidth: 0.2,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 0,
  },
});
