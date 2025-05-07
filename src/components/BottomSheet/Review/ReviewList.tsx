import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, iWidth} from '../../../../globalStyle';
import IText from '../../IText';

type ReviewListProps = {
  dataInfo: any;
  loading: boolean;
};

const ReviewList = ({dataInfo, loading}: ReviewListProps) => {
  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollContainer}
      overScrollMode={'never'}
      contentContainerStyle={{
        paddingVertical: iWidth * 30,
        paddingHorizontal: iWidth * 10,
      }}>
      {loading ? (
        <View
          style={{
            height: iWidth * 400,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.yellow} />
        </View>
      ) : dataInfo.length === 0 ? (
        <View
          style={{
            height: iWidth * 400,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <IText fontStyle="fR" text={'리뷰가 없습니다'} />
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
                <IText
                  fontStyle="fM"
                  fontSize={14}
                  text={
                    data.userData && data.userData.nickname
                      ? data.userData.nickname
                      : '탈퇴한 사용자'
                  }
                />
                <View style={styles.starMainContainer}>
                  {points.map(point => (
                    <View key={point.label} style={styles.starContainer}>
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <Icon
                            key={index}
                            name={'star'}
                            size={iWidth * 18}
                            style={{
                              color:
                                index < point.value ? colors.yellow : '#d3d3d3',
                              marginRight: iWidth * 2,
                            }}
                          />
                        ))}
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.contentContainer}>
                <IText fontStyle="fR" text={data.reviewContent} />
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
    marginTop: iWidth * 20,
    height: iWidth * 480,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#d3d3d3',
  },

  container: {
    marginBottom: iWidth * 20,
  },

  pointContainer: {
    flexDirection: 'row',
  },

  starMainContainer: {
    marginLeft: iWidth * 10,
  },

  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  contentContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    minHeight: iWidth * 100,
    padding: iWidth * 10,
    width: '100%',
    marginTop: iWidth * 10,
  },
});
