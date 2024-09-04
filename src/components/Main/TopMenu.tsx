import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAreaSelected, useContentsSelected} from '../../store/store';
import {areaList, contentList} from '../../data/listData';
import IButton from '../IButton';
import {iHeight, iWidth} from '../../../globalStyle';

const TopMenu = () => {
  const {areaSelected, setAreaSelected} = useAreaSelected();
  const {contentsSelected, setContentsSelected} = useContentsSelected();
  return (
    <View style={styles.menuContainer}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.titleContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 32}}>
            어디로 가볼까요?
          </Text>
        </View>
        <View style={styles.areaListContainer}>
          <FlatList
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            data={areaList.map(item => item.name)}
            renderItem={({item}) => (
              <IButton
                title={item}
                buttonStyle="areaList"
                titleWeight={item === areaSelected ? 'bold' : 'normal'}
                onPress={() => setAreaSelected(item)}
              />
            )}
            keyExtractor={item => item.toString()}
            horizontal
          />
        </View>
      </View>
      <View>
        <View style={styles.titleContainer}>
          <Text style={{fontWeight: 'bold'}}>Categories</Text>
        </View>
        <View style={styles.contentListContainer}>
          {contentList.map(item => (
            <View key={item.id} style={styles.itemCard}>
              <IButton
                buttonStyle="categories"
                onPress={() => setContentsSelected(item.number)}>
                <Image
                  source={item.img}
                  style={{width: 50, height: 50}}
                  alt="카테고리"
                />
                <Text
                  style={[
                    styles.itemTitle,
                    {
                      color:
                        item.number === contentsSelected ? '#4a7bed' : '#777',
                      fontWeight:
                        item.number === contentsSelected ? 'bold' : 'normal',
                    },
                  ]}>
                  {item.name}
                </Text>
              </IButton>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default TopMenu;

const styles = StyleSheet.create({
  menuContainer: {
    paddingHorizontal: iWidth * 40,
    paddingVertical: iHeight * 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    elevation: 5,
    backgroundColor: '#fff',
  },

  titleContainer: {
    marginVertical: 10,
  },

  areaListContainer: {
    marginTop: 10,
    width: '100%',
    height: iHeight * 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ededed',
    borderRadius: 50,
    paddingHorizontal: 3,
    overflow: 'hidden',
  },

  contentListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  itemCard: {
    alignItems: 'center',
    marginVertical: 5,
  },

  itemTitle: {
    fontSize: 12,
    marginTop: 3,
  },
});
