import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {iHeight} from '../../../globalStyle';

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
            <Image
              source={require('../../assets/images/markerIcon.png')}
              style={{width: 50, height: 50}}
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
    marginTop: iHeight * 10,
    marginBottom: 88,
  },

  mapSize: {
    height: iHeight * 350,
  },
});
