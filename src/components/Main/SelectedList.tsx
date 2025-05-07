import FastImage from '@d11/react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, iWidth, normalizeFont} from '../../../globalStyle';
import {useGetToreList} from '../../api/toreQuery';
import {useAreaSelected, useContentsSelected} from '../../store/store';
import IButton from '../IButton';
const SelectedList = () => {
  const {areaSelected} = useAreaSelected();
  const {contentsSelected, contentTitle} = useContentsSelected();
  const navigation = useNavigation<any>();
  const {data, isLoading, refetch} = useGetToreList(
    areaSelected,
    4,
    contentsSelected,
  );
  useEffect(() => {
    refetch();
  }, [areaSelected, contentsSelected]);

  const getData = data;

  return (
    <View style={styles.container}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainTitleText}>
          {areaSelected}의&nbsp;
          {contentTitle}
        </Text>
        <IButton
          title="View All"
          buttonStyle="more"
          titleColor="#4e8df2"
          onPress={() => navigation.navigate('list')}
        />
      </View>
      <View style={styles.listItemContainer}>
        {isLoading ? (
          <View
            style={{
              height: iWidth * 245,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={getData || []}
            contentContainerStyle={{height: iWidth * 245}}
            keyExtractor={item => item.contentid}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              if (!item) return null;
              return (
                <IButton
                  buttonStyle="item"
                  onPress={() =>
                    navigation.navigate('detail', {
                      id: item.contentid,
                      contentType: item.contenttypeid,
                    })
                  }>
                  <View style={styles.itemCard}>
                    <FastImage
                      source={
                        item.firstimage
                          ? {uri: item.firstimage}
                          : require('../../assets/images/no_image.png')
                      }
                      style={styles.itemImg}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={styles.cardTextContainer}>
                      <Text
                        numberOfLines={1}
                        style={{fontWeight: 'bold', color: colors.black}}>
                        {item.title}
                      </Text>
                    </View>
                  </View>
                </IButton>
              );
            }}
            ListFooterComponent={
              getData?.length !== 0 ? (
                <IButton
                  buttonStyle="more"
                  onPress={() => navigation.navigate('list')}>
                  <View style={styles.lastCard}>
                    <Icon
                      name="arrow-forward-circle-outline"
                      size={iWidth * 32}
                    />
                    <Text style={{color: 'black'}}>more</Text>
                  </View>
                </IButton>
              ) : null
            }
            ListEmptyComponent={
              getData?.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    width: Dimensions.get('screen').width - 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'black'}}>검색 결과가 없습니다</Text>
                </View>
              ) : null
            }
          />
        )}
      </View>
    </View>
  );
};

export default SelectedList;

const styles = StyleSheet.create({
  container: {
    marginTop: iWidth * 30,
    paddingHorizontal: iWidth * 20,
  },

  mainTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainTitleText: {
    fontSize: normalizeFont(20),
    fontWeight: 'bold',
    color: 'black',
  },
  listItemContainer: {
    marginTop: iWidth * 20,
  },
  itemCard: {
    width: iWidth * 200,
    height: iWidth * 240,
    marginRight: iWidth * 20,
    borderRadius: iWidth * 12,
    overflow: 'hidden',
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: iWidth * 0, height: iWidth * 2},
    shadowOpacity: 0.3,
    shadowRadius: iWidth * 12,
  },
  lastCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: iWidth * 70,
    height: iWidth * 240,
    backgroundColor: '#ededed',
    borderRadius: iWidth * 12,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {width: iWidth * 0, height: iWidth * 2},
    shadowOpacity: 0.3,
    shadowRadius: iWidth * 12,
  },
  itemImg: {width: '100%', height: iWidth * 200},
  cardTextContainer: {
    padding: iWidth * 5,
  },
});
