import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IButton from '../IButton';

type MenuProps = {
  setMenuList: React.Dispatch<React.SetStateAction<string>>;
};

const Menu = ({setMenuList}: MenuProps) => {
  return (
    <View style={styles.container}>
      <IButton
        title="지역"
        buttonStyle="bottomSheetMenu"
        onPress={() => setMenuList('area')}
      />
      <IButton
        title="컨텐츠"
        buttonStyle="bottomSheetMenu"
        onPress={() => setMenuList('contents')}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
});
