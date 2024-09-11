import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useContentsSelected} from '../../store/store';
import {contentList} from '../../utils/listData';
import IButton from '../IButton';
import {iHeight, iWidth} from '../../../globalStyle';

type CategoriesProps = {
  modal?: string;
};

const Categories = ({modal}: CategoriesProps) => {
  const {contentsSelected, setContentsSelected} = useContentsSelected();
  return (
    <View>
      {!modal && (
        <View style={styles.titleContainer}>
          <Text style={{fontWeight: 'bold'}}>Categories</Text>
        </View>
      )}
      <View style={styles.contentListContainer}>
        {contentList.map(item => (
          <ScrollView key={item.id}>
            <View key={item.id} style={styles.itemCard}>
              <IButton
                buttonStyle={!modal ? 'categories' : 'bottomCategories'}
                onPress={() => setContentsSelected(item.number, item.name)}>
                <Image
                  source={item.img}
                  style={{
                    width: !modal ? iWidth * 40 : iWidth * 50,
                    height: !modal ? iHeight * 40 : iHeight * 50,
                  }}
                  alt="카테고리"
                />
                <Text
                  style={[
                    styles.itemTitle,
                    {
                      color:
                        item.number === contentsSelected ? '#4a7bed' : '#777',
                      fontWeight:
                        item.number === contentsSelected ? 'bold' : 'normal',
                    },
                  ]}>
                  {item.name}
                </Text>
              </IButton>
            </View>
          </ScrollView>
        ))}
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 10,
  },

  contentListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  itemCard: {
    alignItems: 'center',
    marginVertical: 5,
  },

  itemTitle: {
    fontSize: 12,
    marginTop: 5,
  },
});
