import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MyBottomSheet from '../components/MyBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {baseUrl} from '../api/axios';
import {ScrollView} from 'react-native-gesture-handler';

const Main = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await baseUrl.get('', {
        params: {
          numOfRows: 10,
          pageNo: 1,
          keyword: '서울',
          contentTypeId: 12,
        },
      });
      setData(response.data.response.body.items.item);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openBottomSheet}>
        <View style={styles.textBox}>
          <Text>Main</Text>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View>
          {data.map((item: any) => (
            <View key={item.contentid}>
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
              <Text>{item.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <MyBottomSheet bottomSheetRef={bottomSheetRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
  },
  imageSize: {
    width: 100,
    height: 100,
  },
});

export default Main;
