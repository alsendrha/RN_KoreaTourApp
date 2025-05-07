import FastImage from '@d11/react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, iWidth} from '../../../globalStyle';
import {useGetToreList} from '../../api/toreQuery';
import {useAreaSelected, useContentsSelected} from '../../store/store';
import IButton from '../IButton';
import IText from '../IText';
const SelectedList = () => {
  const {areaSelected} = useAreaSelected();
  const {contentsSelected, contentTitle} = useContentsSelected();
  const [cardSize, setCardSize] = useState(0);
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
        <IText
          fontStyle="fB"
          fontSize={20}
          text={`${areaSelected}의 ${contentTitle}`}
        />
        <IButton
          title="View All"
          fontSize={14}
          fontStyle="fM"
          buttonStyle="more"
          titleColor="#4e8df2"
          onPress={() => navigation.navigate('list')}
        />
      </View>
      <View style={styles.listItemContainer}>
        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={getData || []}
            contentContainerStyle={{paddingVertical: iWidth * 4}}
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
                  <View
                    style={styles.itemCard}
                    onLayout={e => {
                      setCardSize(e.nativeEvent.layout.height);
                    }}>
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
                      <IText fontStyle="fB" fontSize={14} text={item.title} />
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
                  <View style={[styles.lastCard, {height: cardSize}]}>
                    <Icon
                      name="arrow-forward-circle-outline"
                      color={colors.black}
                      size={iWidth * 32}
                    />
                    <IText fontStyle="fB" text={'more'} />
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
                  <IText fontStyle="fR" text={'검색 결과가 없습니다'} />
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
    paddingTop: iWidth * 30,
    paddingHorizontal: iWidth * 20,
  },

  mainTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  listItemContainer: {
    paddingTop: iWidth * 20,
  },

  itemCard: {
    width: iWidth * 200,
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
    backgroundColor: '#ededed',
    borderRadius: iWidth * 12,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {width: iWidth * 0, height: iWidth * 2},
    shadowOpacity: 0.3,
    shadowRadius: iWidth * 12,
  },

  itemImg: {width: '100%', height: iWidth * 180},

  cardTextContainer: {
    padding: iWidth * 8,
  },
});
