import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {iWidth} from '../../../globalStyle';

type DetailMapProps = {
  latitude: string;
  longitude: string;
  markerTitle: string;
};

const DetailMap = ({latitude, longitude, markerTitle}: DetailMapProps) => {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.mapSize}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: Number(latitude),
          longitude: Number(longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          title={markerTitle}
          coordinate={{
            latitude: Number(latitude),
            longitude: Number(longitude),
          }}>
          <View>
            <FastImage
              source={require('../../assets/images/markerIcon.png')}
              style={{width: iWidth * 50, height: iWidth * 50}}
            />
          </View>
        </Marker>
      </MapView>
    </View>
  );
};

export default DetailMap;

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: iWidth * 10,
    marginBottom: iWidth * 88,
  },

  mapSize: {
    height: iWidth * 350,
  },
});
