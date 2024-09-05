import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAreaSelected, useContentsSelected} from '../../store/store';
import {useGetToreList} from '../../api/toreQuery';
import IButton from '../IButton';
import {useNavigation} from '@react-navigation/native';
import {iHeight, iWidth} from '../../../globalStyle';

const SelectedList = () => {
  const {areaSelected} = useAreaSelected();
  const {contentsSelected, contentTitle} = useContentsSelected();
  const navigation = useNavigation<any>();
  const {data, isLoading, refetch} = useGetToreList(
    areaSelected,
    4,
    contentsSelected,
  );
  useEffect(() => {
    refetch();
  }, [areaSelected, contentsSelected]);

  return (
    <View style={styles.container}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainTitleText}>
          {areaSelected}의&nbsp;
          {contentTitle}
        </Text>
        <IButton
          title="View All"
          buttonStyle="more"
          titleColor="#4e8df2"
          onPress={() => navigation.navigate('list')}
        />
      </View>
      <View style={styles.listItemContainer}>
        {isLoading ? (
          <View
            style={{
              height: iHeight * 245,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={data}
            contentContainerStyle={{height: iHeight * 245}}
            keyExtractor={item => item.contentid}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.95}
                onPress={() =>
                  navigation.navigate('detail', {
                    id: item.contentid,
                    contentType: item.contenttypeid,
                  })
                }>
                <View style={styles.itemCard}>
                  <Image
                    source={
                      item.firstimage
                        ? {uri: item.firstimage}
                        : require('../../assets/images/no_image.png')
                    }
                    style={styles.itemImg}
                    alt="아이템 이미지"
                  />
                  <View style={styles.cardTextContainer}>
                    <Text numberOfLines={1} style={{fontWeight: 'bold'}}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default SelectedList;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
  },

  mainTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItemContainer: {
    marginTop: 20,
  },
  itemCard: {
    width: iWidth * 200,
    height: iHeight * 240,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  itemImg: {width: '100%', height: iHeight * 200},
  cardTextContainer: {
    padding: 5,
  },
});
