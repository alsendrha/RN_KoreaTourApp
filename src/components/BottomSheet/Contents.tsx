import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IButton from '../IButton';
import {
  useBottomSheetRef,
  useContentsSelected,
  useScrollRef,
} from '../../store/store';
import {contentList} from '../../data/listData';

type ContentsProps = {
  setMenuList: React.Dispatch<React.SetStateAction<string>>;
};

const Contents = ({setMenuList}: ContentsProps) => {
  const {setContentsSelected} = useContentsSelected();
  const {bottomSheetRef} = useBottomSheetRef();
  const {scrollRef} = useScrollRef();
  const handleContentsSelected = (contents: number) => {
    setContentsSelected(contents);
    setMenuList('menu');
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
