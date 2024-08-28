import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IButton from '../IButton';
import {useAreaSelected, useBottomSheetRef} from '../../store/store';

type AreaProps = {
  setMenuList: React.Dispatch<React.SetStateAction<string>>;
};

const Area = () => {
  const {setAreaSelected} = useAreaSelected();
  const {bottomSheetRef} = useBottomSheetRef();
  const areaList = [
    {id: 1, name: '서울'},
    {id: 2, name: '경기'},
    {id: 3, name: '인천'},
    {id: 4, name: '강원'},
    {id: 5, name: '충북'},
    {id: 6, name: '충남'},
    {id: 7, name: '대전'},
    {id: 8, name: '경북'},
    {id: 9, name: '경남'},
    {id: 10, name: '대구'},
    {id: 11, name: '울산'},
    {id: 12, name: '부산'},
    {id: 13, name: '전북'},
    {id: 14, name: '전남'},
    {id: 15, name: '광주'},
    {id: 16, name: '제주'},
  ];

  const handleAreaSelected = (area: string) => {
    setAreaSelected(area);
    bottomSheetRef.current?.close();
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
