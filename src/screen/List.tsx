import {useNavigationState} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Keyboard, Pressable, StyleSheet, View} from 'react-native';
import {colors, iWidth} from '../../globalStyle';
import IInput from '../components/IInput';
import ItemList from '../components/List/ItemList';
import {useAreaSelected, usePageInfo} from '../store/store';

const List = () => {
  const {setAreaSelected} = useAreaSelected();
  const [inputText, setInputText] = useState('');
  const {setPageInfo} = usePageInfo();
  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });
  useEffect(() => {
    setPageInfo(currentRouteName);
  }, [currentRouteName]);

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <View style={styles.inputContainer}>
        <IInput
          value={inputText}
          placeholder="검색어를 입력해주세요"
          height={iWidth * 40}
          borderRadius={iWidth * 50}
          onChangeText={value => setInputText(value)}
          onSubmitEditing={value => setAreaSelected(value.nativeEvent.text)}
          maxLength={20}
          deleteValue={() => setInputText('')}
        />
      </View>
      <ItemList />
    </Pressable>
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
    paddingVertical: iWidth * 12,
  },
});
