import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

type MenuComponentProps = {
  menu: {
    title: string;
    icon: string;
  };
};

const MenuComponent = ({menu}: MenuComponentProps) => {
  return (
    <View style={styles.menuContainer}>
      <Icon name={menu.icon} size={24} color="#8C6A4E" />
      <Text style={styles.menuTitleText}>{menu.title}</Text>
    </View>
  );
};

export default MenuComponent;

const styles = StyleSheet.create({
  menuContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 4,
  },

  menuTitleText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
