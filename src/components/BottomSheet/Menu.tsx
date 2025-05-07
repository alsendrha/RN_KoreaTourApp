import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, iWidth} from '../../../globalStyle';
import {useBottomSheetRef} from '../../store/store';
import IText from '../IText';
import AreaList from '../Main/AreaList';
import Categories from '../Main/Categories';

const Menu = () => {
  const {bottomSheetRef} = useBottomSheetRef();
  return (
    <View style={styles.container}>
      <View style={styles.topPosition}>
        <Pressable
          onPress={() => {
            bottomSheetRef.current?.close();
          }}>
          <Icon name="close-outline" size={iWidth * 24} />
        </Pressable>
      </View>
      <View style={styles.mainContent}>
        <AreaList />
        <View style={styles.contentTitleContainer}>
          <IText fontStyle="fB" text={'카테고리 선택'} />
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
  container: {
    flex: 1,
    paddingHorizontal: iWidth * 16,
  },

  topPosition: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  mainContent: {
    height: '100%',
    borderColor: colors.darkGray,
  },

  contentTitleContainer: {
    paddingVertical: iWidth * 20,
  },
});
