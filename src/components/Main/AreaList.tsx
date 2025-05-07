import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {colors, iWidth} from '../../../globalStyle';
import {useAreaSelected} from '../../store/store';
import {areaList} from '../../utils/listData';
import IButton from '../IButton';

const AreaList = () => {
  const {areaSelected, setAreaSelected} = useAreaSelected();

  return (
    <View style={styles.areaListContainer}>
      <FlatList
        contentContainerStyle={{alignItems: 'center', gap: iWidth * 4}}
        showsHorizontalScrollIndicator={false}
        data={areaList.map(item => item.name)}
        renderItem={({item}) => (
          <IButton
            title={item}
            buttonStyle="areaList"
            titleColor={item === areaSelected ? 'black' : colors.white}
            fontStyle={item === areaSelected ? 'fB' : 'fR'}
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
    marginTop: iWidth * 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: iWidth * 50,
    padding: iWidth * 6,
    overflow: 'hidden',
  },
});
