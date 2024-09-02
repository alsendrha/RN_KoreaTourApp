import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {DetailItemType} from '../types/detailType';
import {ScrollView} from 'react-native-gesture-handler';
import {useGetDetailData, useGetDetailImage} from '../api/toreQuery';
import IButton from '../components/IButton';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import {RenderHTML} from 'react-native-render-html';

type DetailProps = {
  route: {
    params: {
      id: number;
      contentTypeId: number;
    };
  };
};

const Detail = ({route}: DetailProps) => {
  const {id, contentTypeId} = route.params;
  const {data, isLoading} = useGetDetailData(id, contentTypeId);
  const {data: detailImages = [], isLoading: imagesLoading} =
    useGetDetailImage(id);
  const [imagesIndex, setImagesIndex] = useState(0);
  const {width} = useWindowDimensions();

  const next = () => {
    setImagesIndex(prev => (prev + 1 >= detailImages.length ? 0 : prev + 1));
  };
  const prev = () => {
    setImagesIndex(prev => (prev - 1 < 0 ? detailImages.length - 1 : prev - 1));
  };

  if (isLoading || imagesLoading)
    return <ActivityIndicator size="large" color="#0000ff" />;
  return (
    <ScrollView>
      {data.map((item: DetailItemType) => (
        <View key={item.contentid}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={
                detailImages.length > 0
                  ? {uri: detailImages[imagesIndex].originimgurl}
                  : item.firstimage
                  ? {uri: item.firstimage}
                  : require('../assets/images/no_image.png')
              }
              alt="이미지"
            />
            {detailImages.length > 0 && (
              <>
                <IButton buttonStyle="arrowLeft" onPress={prev}>
                  <Icon name="chevron-back-outline" size={24} />
                </IButton>

                <IButton buttonStyle="arrowRight" onPress={next}>
                  <Icon name="chevron-forward-outline" size={24} />
                </IButton>
              </>
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text>주소 : {item.addr1}</Text>
            <Text>연락처 : {item.tel ? item.tel : '-'}</Text>
            {item.homepage && (
              <RenderHTML contentWidth={width} source={{html: item.homepage}} />
            )}
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
  imgContainer: {
    position: 'relative',
    width: '100%',
    height: 275,
  },

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  textContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  mapContainer: {
    marginTop: 20,
  },

  mapSize: {
    height: 400,
  },
});
