import FastImage from '@d11/react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {colors, iWidth} from '../../../globalStyle';
import {useGetToreList1} from '../../api/toreQuery';
import {
  useAreaSelected,
  useContentsSelected,
  useScrollRef,
} from '../../store/store';
import {TourListType} from '../../types/dataListType';
import CustomIndicator from '../CustomIndicator';
import IText from '../IText';
const ItemList = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const {areaSelected} = useAreaSelected();
  const {contentsSelected} = useContentsSelected();
  const navigation = useNavigation<any>();
  const {setScrollRef} = useScrollRef();
  const {data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useGetToreList1(areaSelected, 10, contentsSelected);
  const queryClient = useQueryClient();

  useEffect(() => {
    setScrollRef(scrollViewRef);
    queryClient.resetQueries({
      queryKey: ['tourList1' + areaSelected],
      exact: true,
    });
  }, [areaSelected, contentsSelected]);

  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({item}: {item: TourListType}) => {
    if (!item) return null;
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('detail', {
            id: item.contentid,
            contentType: item.contenttypeid,
          })
        }
        key={item.contentid}>
        <View style={styles.itemCard}>
          <FastImage
            style={styles.imageSize}
            source={
              item.firstimage
                ? {uri: item.firstimage}
                : require('../../assets/images/no_image.png')
            }
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.textContainer}>
            <IText fontStyle="fB" text={item.title} />
            <IText fontStyle="fR" text={`${item.addr1} ${item.addr2}`} />
          </View>
        </View>
      </Pressable>
    );
  };

  const items =
    data?.pages
      .flatMap(page => page.items)
      .filter(item => item !== undefined) || [];

  return (
    <View>
      {isLoading && <CustomIndicator marginTop={iWidth * -100} />}
      <FlatList
        data={items}
        contentContainerStyle={{gap: iWidth * 12}}
        renderItem={renderItem}
        keyExtractor={item => item?.contentid.toString()}
        onEndReached={handleFetchNextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
        ListEmptyComponent={
          items.length === 0 ? (
            <View
              style={{
                width: '100%',
                height: Dimensions.get('screen').height - iWidth * 300,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IText fontStyle="fR" text={'검색 결과가 없습니다'} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  itemCard: {
    overflow: 'hidden',
    marginHorizontal: iWidth * 15,
    backgroundColor: colors.white,
    borderRadius: iWidth * 8,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: iWidth * 8,
    elevation: 5,
  },

  imageSize: {
    width: '100%',
    height: iWidth * 220,
    borderTopEndRadius: iWidth * 8,
  },

  textContainer: {
    padding: iWidth * 10,
    gap: iWidth * 4,
  },
});
