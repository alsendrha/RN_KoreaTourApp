import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  useAreaSelected,
  useContentsSelected,
  useScrollRef,
} from '../store/store';
import {useGetToreList1} from '../api/toreQuery';
import {TourListType} from '../types/dataListType';
import {useQueryClient} from '@tanstack/react-query';
import {areaList, contentList} from '../data/listData';
import {iHeight, iWidth} from '../../globalStyle';
import IButton from '../components/IButton';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemList from '../components/Main/ItemList';

const Main = ({navigation}: any) => {
  const {areaSelected, setAreaSelected} = useAreaSelected();
  const {contentsSelected, setContentsSelected} = useContentsSelected();
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            marginTop: 5,
            width: 300,
            backgroundColor: '#ededed',
            borderRadius: 50,
            paddingHorizontal: 3,
            overflow: 'hidden',
          }}>
          <FlatList
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
      <View style={{marginTop: 5}}>
        <FlatList
          contentContainerStyle={{height: iHeight * 60}}
          showsHorizontalScrollIndicator={false}
          data={contentList.map(item => item)}
          renderItem={({item}) => (
            <IButton
              title={item.name}
              buttonStyle="categories"
              category={item.number}
              onPress={() => setContentsSelected(item.number)}>
              <Text
                style={{
                  color: item.number === contentsSelected ? 'black' : 'white',
                }}>
                {item.name}
              </Text>
              <Icon
                name={item.icon}
                size={24}
                color={item.number === contentsSelected ? 'black' : 'white'}
              />
            </IButton>
          )}
          keyExtractor={item => item.id.toString()}
          horizontal
        />
      </View>
      <ItemList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },

  scrollDiv: {
    height: iHeight * 10,
  },
});

export default Main;
