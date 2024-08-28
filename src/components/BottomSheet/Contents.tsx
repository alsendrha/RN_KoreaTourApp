import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IButton from '../IButton';
import {useBottomSheetRef, useContentsSelected} from '../../store/store';

type ContentsProps = {
  setMenuList: React.Dispatch<React.SetStateAction<string>>;
};

const Contents = ({setMenuList}: ContentsProps) => {
  const contentList = [
    {id: 1, number: 12, name: '관광지'},
    {id: 2, number: 14, name: '문화시설'},
    {id: 3, number: 15, name: '행사/공연등'},
    {id: 4, number: 25, name: '여행코스'},
    {id: 5, number: 28, name: '레포츠'},
    {id: 6, number: 32, name: '숙박'},
    {id: 7, number: 38, name: '쇼핑'},
    {id: 8, number: 39, name: '음식점'},
  ];
  const {setContentsSelected} = useContentsSelected();
  const {bottomSheetRef} = useBottomSheetRef();

  const handleContentsSelected = (contents: number) => {
    setContentsSelected(contents);
    setMenuList('menu');
    bottomSheetRef.current?.close();
  };
  return (
    <View style={styles.container}>
      {contentList.map(content => (
        <IButton
          key={content.id}
          title={content.name}
          buttonStyle="area"
          onPress={() => handleContentsSelected(content.number)}
        />
      ))}
    </View>
  );
};

export default Contents;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
