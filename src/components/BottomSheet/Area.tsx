import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IButton from '../IButton';
import {useAreaSelected, useBottomSheetRef} from '../../store/store';
import {areaList} from '../../data/listData';

type AreaProps = {
  setMenuList: React.Dispatch<React.SetStateAction<string>>;
};

const Area = ({setMenuList}: AreaProps) => {
  const {setAreaSelected} = useAreaSelected();

  const handleAreaSelected = (area: string) => {
    setAreaSelected(area);
    setMenuList('contents');
  };

  return (
    <View style={styles.container}>
      {areaList.map(area => (
        <IButton
          key={area.id}
          title={area.name}
          buttonStyle="area"
          onPress={() => handleAreaSelected(area.name)}
        />
      ))}
    </View>
  );
};

export default Area;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
