import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {iWidth} from '../../../globalStyle';
import {useContentsSelected} from '../../store/store';
import {contentList} from '../../utils/listData';
import IButton from '../IButton';
import IText from '../IText';

type CategoriesProps = {
  modal?: string;
};

const Categories = ({modal}: CategoriesProps) => {
  const {contentsSelected, setContentsSelected} = useContentsSelected();
  return (
    <View>
      {!modal && (
        <View style={styles.titleContainer}>
          <IText fontStyle="fB" text={'Categories'} />
        </View>
      )}
      <View style={styles.contentListContainer}>
        {contentList.map(item => (
          <ScrollView key={item.id}>
            <View key={item.id} style={styles.itemCard}>
              <IButton
                buttonStyle={!modal ? 'categories' : 'bottomCategories'}
                onPress={() => setContentsSelected(item.number, item.name)}>
                {item.img}
                <View style={styles.itemTitle}>
                  <IText
                    fontStyle={item.number === contentsSelected ? 'fB' : 'fR'}
                    fontSize={12}
                    textColor={
                      item.number === contentsSelected ? '#4a7bed' : '#777'
                    }
                    text={item.name}
                  />
                </View>
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
    marginVertical: iWidth * 10,
  },

  contentListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  itemCard: {
    alignItems: 'center',
    paddingVertical: iWidth * 5,
  },

  itemTitle: {
    paddingTop: iWidth * 5,
  },
});
