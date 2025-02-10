import FastImage from '@d11/react-native-fast-image';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import {colors, iHeight} from '../../globalStyle';
import {useGetDetailData, useGetDetailImage} from '../api/toreQuery';
import DetailMap from '../components/Detail/DetailMap';
import DetailTextContent from '../components/Detail/DetailTextContent';
import ImageDot from '../components/Detail/ImageDot';
import {useBottomSheetRef, useItemInfo, usePageInfo} from '../store/store';
import {DetailItemType} from '../types/detailType';
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
  const previousPageInfo = useRef<string | null>(null);

  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });
  const navigation = useNavigation();

  const goBack = () => {
    bottomSheetRef.current?.close();
    const currentState = navigation.getState(); // 현재 네비게이션 상태
    const previousRoute = currentState?.routes[currentState.index - 1]; // 이전 페이지 가져오기
    const previousPageName = previousRoute ? previousRoute.name : null;
    return false;
  };

  useEffect(() => {
    previousPageInfo.current = currentRouteName;
    setPageInfo(previousPageInfo.current!);
  }, [currentRouteName]);

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
                <FastImage
                  style={styles.img}
                  source={
                    item.originimgurl
                      ? {uri: item.originimgurl}
                      : item
                      ? {uri: item}
                      : require('../assets/images/no_image.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              )}
            />
            <ImageDot detailImages={detailImages} imagesIndex={imagesIndex} />
          </View>
          <DetailTextContent
            title={item.title}
            address={item.addr1}
            tel={item.tel}
            page={item.homepage}
            overview={item.overview}
          />
          <DetailMap
            latitude={item.mapy}
            longitude={item.mapx}
            markerTitle={item.title}
          />
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
});
