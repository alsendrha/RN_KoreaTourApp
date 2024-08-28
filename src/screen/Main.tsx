import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {baseUrl} from '../api/axios';
import {ScrollView} from 'react-native-gesture-handler';
import {useAreaSelected} from '../store/store';

const Main = ({navigation}: any) => {
  const [data, setData] = useState([]);
  const {areaSelected} = useAreaSelected();
  const getData = async () => {
    try {
      const response = await baseUrl.get('', {
        params: {
          numOfRows: 10,
          pageNo: 1,
          keyword: areaSelected,
          contentTypeId: 12,
        },
      });
      console.log(response.data);
      setData(response.data.response.body.items.item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [areaSelected]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.listContainer}>
          {data.map((item: any) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('detail', {
                  id: item.contentid,
                  contentType: item.contentTypeId,
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
