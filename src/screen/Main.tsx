import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MyBottomSheet from '../components/MyBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {baseUrl} from '../api/axios';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Main = ({navigation}: any) => {
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
          <Text>menu</Text>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.listContainer}>
          {data.map((item: any) => (
            <TouchableOpacity onPress={() => navigation.navigate('detail')}>
              <View key={item.contentid} style={styles.itemCard}>
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
      <MyBottomSheet bottomSheetRef={bottomSheetRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // A
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
  },
});

export default Main;
