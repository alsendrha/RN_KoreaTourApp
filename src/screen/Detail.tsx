import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {detailUrl} from '../api/axios';
import {DetailItemType} from '../types/detailType';
import {ScrollView} from 'react-native-gesture-handler';
type DetailProps = {
  route: any;
};

const Detail = ({route}: DetailProps) => {
  const {id, contentTypeId} = route.params;
  const [data, setData] = useState<DetailItemType[]>([]);
  const getDetailData = async () => {
    try {
      const response = await detailUrl.get('', {
        params: {
          contentId: id,
          contentTypeId,
        },
      });
      setData(response.data.response.body.items.item);
      console.log(response.data.response.body.items.item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailData();
  }, []);

  return (
    <View>
      {data.map(item => (
        <ScrollView key={item.contentid}>
          <Image
            style={styles.img}
            source={
              item.firstimage
                ? {uri: item.firstimage}
                : require('../assets/images/no_image.png')
            }
            alt="이미지"
          />
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text>{item.overview.replace(/<br\s*\/?>/gi, '\n')}</Text>
          </View>
        </ScrollView>
      ))}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 300,
  },

  textContainer: {
    marginTop: 10,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
