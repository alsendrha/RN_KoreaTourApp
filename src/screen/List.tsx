import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import ItemList from '../components/List/ItemList';
import {colors, iHeight} from '../../globalStyle';
import {useAreaSelected} from '../store/store';
import Icon from 'react-native-vector-icons/Ionicons';
import IButton from '../components/IButton';
const List = () => {
  const {setAreaSelected} = useAreaSelected();
  const [inputText, setInputText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInputStyle}
          placeholder="검색어를 입력해주세요"
          value={inputText}
          onChangeText={value => {
            setInputText(value);
          }}
          onSubmitEditing={value => {
            setAreaSelected(value.nativeEvent.text);
          }}
          maxLength={20}
        />
        {inputText ? (
          <View style={styles.iconStyle}>
            <IButton buttonStyle="delete" onPress={() => setInputText('')}>
              <Icon name="close-circle-outline" size={26} />
            </IButton>
          </View>
        ) : (
          <View style={styles.iconStyle}>
            <IButton buttonStyle="delete" onPress={() => setInputText('')}>
              <Icon name="search-outline" size={26} />
            </IButton>
          </View>
        )}
      </View>
      <ItemList />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  inputContainer: {
    position: 'relative',
    marginVertical: 10,
  },

  textInputStyle: {
    height: iHeight * 40,
    borderWidth: 0.5,
    marginHorizontal: 15,
    paddingHorizontal: 18,
    borderRadius: 50,
  },
  iconStyle: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -14}],
    right: 25,
  },
});
