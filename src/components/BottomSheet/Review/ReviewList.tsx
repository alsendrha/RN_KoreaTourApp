import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {iHeight} from '../../../../globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

type ReviewListProps = {
  dataInfo: any;
  loading: boolean;
};

const ReviewList = ({dataInfo, loading}: ReviewListProps) => {
  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollContainer}
      contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 10}}>
      {loading ? (
        <View
          style={{
            height: iHeight * 400,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#ffca42" />
        </View>
      ) : dataInfo.length === 0 ? (
        <View
          style={{
            height: iHeight * 400,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>리뷰가 없습니다</Text>
        </View>
      ) : (
        dataInfo.map((data: any) => {
          const points = [
            {label: 'point01', value: data.point01},
            {label: 'point02', value: data.point02},
            {label: 'point03', value: data.point03},
            {label: 'point04', value: data.point04},
            {label: 'point05', value: data.point05},
          ].filter(point => point.value !== 0);
          return (
            <View key={data.userId} style={styles.container}>
              <View style={styles.pointContainer}>
                <Text style={styles.nicknameText}>
                  {data.userData && data.userData.nickname
                    ? data.userData.nickname
                    : '탈퇴한 사용자'}
                </Text>

                <View style={styles.starMainContainer}>
                  {points.map(point => (
                    <View key={point.label} style={styles.starContainer}>
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <Icon
                            key={index}
                            name={'star'}
                            size={18}
                            style={{
                              color:
                                index < point.value ? '#ffca42' : '#d3d3d3',
                              marginRight: 2,
                            }}
                          />
                        ))}
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.contentContainer}>
                <Text>{data.reviewContent}</Text>
              </View>
            </View>
          );
        })
      )}
    </BottomSheetScrollView>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: iHeight * 20,
    height: iHeight * 480,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#d3d3d3',
  },

  container: {
    marginBottom: 20,
  },

  pointContainer: {
    flexDirection: 'row',
  },

  nicknameText: {
    fontSize: 14,
    fontWeight: '500',
  },

  starMainContainer: {
    marginLeft: 10,
  },

  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  contentContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    minHeight: iHeight * 100,
    padding: 10,
    width: '100%',
    marginTop: 10,
  },
});
