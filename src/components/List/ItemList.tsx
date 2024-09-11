import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {colors, iHeight, iWidth} from '../../../globalStyle';
import {useGetToreList1} from '../../api/toreQuery';
import {useQueryClient} from '@tanstack/react-query';
import {
  useAreaSelected,
  useContentsSelected,
  useScrollRef,
} from '../../store/store';
import {TourListType} from '../../types/dataListType';
import {useNavigation} from '@react-navigation/native';
import CustomIndicator from '../CustomIndicator';

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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('detail', {
            id: item.contentid,
            contentType: item.contenttypeid,
          })
        }
        key={item.contentid}
        activeOpacity={0.8}>
        <View style={styles.itemCard}>
          <Image
            style={styles.imageSize}
            source={
              item.firstimage
                ? {uri: item.firstimage}
                : require('../../assets/images/no_image.png')
            }
            alt="이미지"
          />
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.textStyle}>
              {item.title}
            </Text>
            <Text>
              {item.addr1}
              {item.addr2}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const items =
    data?.pages
      .flatMap(page => page.items)
      .filter(item => item !== undefined) || [];

  return (
    <View>
      {isLoading && <CustomIndicator marginTop={iHeight * -100} />}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item?.contentid || 'default-key'}
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
                width: Dimensions.get('screen').width,
                height: Dimensions.get('screen').height - iHeight * 300,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>검색 결과가 없습니다</Text>
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
    marginVertical: iWidth * 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  imageSize: {
    width: '100%',
    height: iHeight * 250,
    borderTopEndRadius: 8,
    objectFit: 'cover',
  },

  textContainer: {
    margin: iWidth * 10,
  },

  textStyle: {
    fontWeight: 'bold',
  },
});
