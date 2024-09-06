import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IButton from '../IButton';
import {iHeight, iWidth} from '../../../globalStyle';
import {useBottomSheetRef} from '../../store/store';
import Icon from 'react-native-vector-icons/Ionicons';
type MenuProps = {
  setMenuList: React.Dispatch<React.SetStateAction<string>>;
};

const Menu = ({setMenuList}: MenuProps) => {
  const {bottomSheetRef} = useBottomSheetRef();
  return (
    <View>
      <View style={styles.topPosition}>
        <Text style={styles.titleText}>Menu</Text>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setMenuList('menu');
              bottomSheetRef.current?.close();
            }}>
            <Icon name="close-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainContent}>
        <View>
          <Text>지역</Text>
        </View>
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
    backgroundColor: 'red',
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
