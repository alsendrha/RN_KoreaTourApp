import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  useAreaSelected,
  useContentsSelected,
  useScrollRef,
} from '../store/store';
import {useGetToreList} from '../api/toreQuery';
import {TourListType} from '../types/dataListType';

const Main = ({navigation}: any) => {
  const {areaSelected} = useAreaSelected();
  const {contentsSelected} = useContentsSelected();
  const scrollViewRef = useRef<ScrollView>(null);
  const {setScrollRef} = useScrollRef();
  const {data, isLoading, refetch} = useGetToreList(
    areaSelected,
    10,
    contentsSelected,
  );

  useEffect(() => {
    setScrollRef(scrollViewRef);
    refetch();
  }, [areaSelected, contentsSelected]);

  if (isLoading) return <Text>Loading...</Text>;
  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.listContainer}>
          {data.map((item: TourListType) => (
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
                      ? {
                          uri: item.firstimage,
                        }
                      : require('../assets/images/no_image.png')
                  }
                  alt="이미지"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.textStyle}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  listContainer: {
    margin: 15,
  },

  itemCard: {
    overflow: 'hidden',
    marginBottom: 20,
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
});

export default Main;
