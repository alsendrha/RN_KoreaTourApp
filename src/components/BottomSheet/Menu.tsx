import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, iHeight, iWidth} from '../../../globalStyle';
import {useBottomSheetRef} from '../../store/store';
import Icon from 'react-native-vector-icons/Ionicons';
import AreaList from '../Main/AreaList';
import Categories from '../Main/Categories';

const Menu = () => {
  const {bottomSheetRef} = useBottomSheetRef();
  return (
    <View style={{paddingHorizontal: 10}}>
      <View style={styles.topPosition}>
        <Text style={styles.titleText}>Menu</Text>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.close();
            }}>
            <Icon name="close-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.contentTitleContainer}>
          <Text style={styles.areaTitle}>지역 선택</Text>
        </View>
        <AreaList />
        <View style={styles.contentTitleContainer}>
          <Text style={styles.areaTitle}>카테고리 선택</Text>
        </View>
        <View>
          <Categories modal={'modal'} />
        </View>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  topPosition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  mainContent: {
    height: '100%',
    marginTop: 5,
    borderTopWidth: 0.5,
    borderColor: colors.darkGray,
  },

  contentTitleContainer: {
    marginTop: 10,
  },

  areaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  closeButtonContainer: {
    width: iWidth * 25,
    height: iHeight * 25,
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
});
