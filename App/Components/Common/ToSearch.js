import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, FlatList} from 'react-native';
import {Colors, Fonts, Images, Spacing} from 'themes';
import {Text} from 'components';
import {stripTags, scale} from 'utils/Functions';

const ToSearch = ({searchText}) => {
  let [searchList, setSearchList] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // let res = await Course.getListCourses({keyword: searchText});
  //     let res = ProductService.getProducts({keyword: searchText});
  //     setSearchList(res);
  //   };
  //   fetchData();
  // }, [searchText]);

  const renderItem = ({item}) => (
    <View style={styles.title}>
      <Image
        source={Images.Search}
        style={{width: scale(15), height: scale(15)}}
      />
      <View style={{paddingLeft: Spacing.PADDING}}>
        <Text style={{fontSize: Fonts.FONT_LARGE}}>
          {stripTags(item?.name)}
        </Text>
      </View>
    </View>
  );
  return (
    <View style={[styles.container]}>
      {searchList && (
        <FlatList
          data={searchList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bs4,
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING,
  },
  title: {
    paddingVertical: Spacing.PADDING,
    flexDirection: 'row',
  },
});
export default ToSearch;
