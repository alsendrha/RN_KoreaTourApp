import {
  ActivityIndicator,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DetailItemType} from '../types/detailType';
import {ScrollView} from 'react-native-gesture-handler';
import {useGetDetailData, useGetDetailImage} from '../api/toreQuery';
import MapView, {Marker} from 'react-native-maps';
import HTMLView from 'react-native-htmlview';
import {colors, iHeight, iWidth} from '../../globalStyle';
import Carousel from 'react-native-reanimated-carousel';
import {useBottomSheetRef, useItemInfo, usePageInfo} from '../store/store';
import {useNavigationState} from '@react-navigation/native';

const Detail = ({route}: any) => {
  const {id, contentType} = route.params;
  const {data, isLoading} = useGetDetailData(id, contentType);
  const {data: detailImages = [], isLoading: imagesLoading} =
    useGetDetailImage(id);
  const [imagesIndex, setImagesIndex] = useState(0);
  const {width} = useWindowDimensions();
  const {bottomSheetRef} = useBottomSheetRef();
  const {setPageInfo} = usePageInfo();
  const {setItemId, setItemTitle, setContentTypeId} = useItemInfo();
  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });

  useEffect(() => {
    setPageInfo(currentRouteName);
  }, [currentRouteName]);

  const goBack = () => {
    bottomSheetRef.current?.close();
    return false;
  };

  useEffect(() => {
    if (isLoading) return;
    setItemId(id);
    setItemTitle(data[0].title);
    setContentTypeId(contentType);
  }, [isLoading]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', goBack);
    };
  }, []);

  if (isLoading || imagesLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  return (
    <ScrollView style={styles.backColor}>
      {data.map((item: DetailItemType) => (
        <View key={item.contentid}>
          <View style={styles.imgContainer}>
            <Carousel
              data={detailImages.length > 0 ? detailImages : [item.firstimage]}
              width={width}
              onSnapToItem={index => setImagesIndex(index)}
              loop={true}
              renderItem={({item}: any) => (
                <Image
                  style={styles.img}
                  source={
                    item.originimgurl
                      ? {uri: item.originimgurl}
                      : item
                      ? {uri: item}
                      : require('../assets/images/no_image.png')
                  }
                  alt="이미지"
                />
              )}
            />

            <View style={styles.dotContainer}>
              {detailImages.map((img: string[], index: number) => (
                <View
                  key={index}
                  style={{
                    width: index === imagesIndex ? 12 : 10,
                    height: index === imagesIndex ? 12 : 10,
                    borderRadius: 50,
                    borderColor: colors.white,
                    backgroundColor:
                      index === imagesIndex ? colors.white : colors.gray,
                    bottom: 10,
                    marginHorizontal: 2,
                  }}></View>
              ))}
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text>주소 : {item.addr1}</Text>
              <Text>연락처 : {item.tel ? item.tel : '-'}</Text>
              <HTMLView value={item.homepage} style={{marginVertical: 5}} />
            </View>
            <Text style={{marginTop: 10}}>
              {item.overview.replace(/<br\s*\/?>/gi, '\n')}
            </Text>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.mapSize}
              zoomEnabled={true}
              zoomControlEnabled={true}
              initialRegion={{
                latitude: Number(item.mapy),
                longitude: Number(item.mapx),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                title={item.title}
                coordinate={{
                  latitude: Number(item.mapy),
                  longitude: Number(item.mapx),
                }}>
                <View>
                  <Image
                    source={require('../assets/images/markerIcon.png')}
                    style={{width: 50, height: 50}}
                  />
                </View>
              </Marker>
            </MapView>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  backColor: {
    backgroundColor: colors.white,
  },

  imgContainer: {
    position: 'relative',
    width: '100%',
    height: iHeight * 350,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    backgroundColor: colors.white,
  },

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  dotContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    marginTop: 10,
    marginHorizontal: iWidth * 10,
  },

  titleContainer: {
    paddingVertical: iHeight * 15,
    borderBottomWidth: 0.5,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  mapContainer: {
    marginTop: iHeight * 10,
    marginBottom: 88,
  },

  mapSize: {
    height: iHeight * 350,
  },
});
