import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  useAreaSelected,
  useContentsSelected,
  useScrollRef,
} from '../store/store';
import {useGetToreList, useGetToreList1} from '../api/toreQuery';
import {TourListType} from '../types/dataListType';
import {useQueryClient} from '@tanstack/react-query';

const Main = ({navigation}: any) => {
  const {areaSelected} = useAreaSelected();
  const {contentsSelected} = useContentsSelected();
  const scrollViewRef = useRef<ScrollView>(null);
  const {setScrollRef} = useScrollRef();
  const {data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useGetToreList1(areaSelected, 10, contentsSelected);
  const queryClient = useQueryClient();

  useEffect(() => {
    setScrollRef(scrollViewRef);
    queryClient.resetQueries({
      queryKey: ['tourList' + areaSelected],
      exact: true,
    });
  }, [areaSelected, contentsSelected]);

  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({item}: {item: TourListType}) => (
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
              : require('../assets/images/no_image.png')
          }
          alt="이미지"
        />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.textStyle}>
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.pages.flatMap(page => page.items)}
        renderItem={renderItem}
        keyExtractor={item => item.contentid.toString()}
        onEndReached={handleFetchNextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  itemCard: {
    overflow: 'hidden',
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  textContainer: {
    margin: 10,
  },

  textStyle: {
    fontWeight: 'bold',
  },

  imageSize: {
    width: '100%',
    height: 300,
    borderTopEndRadius: 8,
    objectFit: 'cover',
  },

  scrollDiv: {
    height: 10,
  },
});

export default Main;
