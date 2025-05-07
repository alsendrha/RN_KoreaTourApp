import {useNavigationState} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, iWidth} from '../../globalStyle';
import IButton from '../components/IButton';
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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <IInput
          value={inputText}
          placeholder="검색어를 입력해주세요"
          height={iWidth * 40}
          borderRadius={iWidth * 50}
          onChangeText={value => setInputText(value)}
          onSubmitEditing={value => setAreaSelected(value.nativeEvent.text)}
          maxLength={20}
        />

        {inputText ? (
          <View style={styles.iconStyle}>
            <IButton buttonStyle="delete" onPress={() => setInputText('')}>
              <Icon name="close-circle-outline" size={iWidth * 26} />
            </IButton>
          </View>
        ) : (
          <View style={styles.iconStyle}>
            <IButton buttonStyle="delete">
              <Icon name="search-outline" size={iWidth * 26} />
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
    marginVertical: iWidth * 10,
  },

  iconStyle: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: iWidth * -14}],
    right: iWidth * 25,
  },
});
