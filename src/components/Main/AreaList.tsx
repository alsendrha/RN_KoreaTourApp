import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IButton from '../IButton';
import {areaList} from '../../utils/listData';
import {useAreaSelected} from '../../store/store';
import {iHeight} from '../../../globalStyle';

const AreaList = () => {
  const {areaSelected, setAreaSelected} = useAreaSelected();

  return (
    <View style={styles.areaListContainer}>
      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        showsHorizontalScrollIndicator={false}
        data={areaList.map(item => item.name)}
        renderItem={({item}) => (
          <IButton
            title={item}
            buttonStyle="areaList"
            titleColor={item === areaSelected ? '#1E0A00' : 'white'}
            titleWeight={item === areaSelected ? 'bold' : 'normal'}
            onPress={() => setAreaSelected(item)}
          />
        )}
        keyExtractor={item => item.toString()}
        horizontal
      />
    </View>
  );
};

export default AreaList;

const styles = StyleSheet.create({
  areaListContainer: {
    marginTop: 10,
    width: '100%',
    height: iHeight * 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7966D',
    borderRadius: 50,
    paddingHorizontal: 3,
    overflow: 'hidden',
  },
});
