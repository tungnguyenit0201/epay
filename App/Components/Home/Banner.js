import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {View} from 'react-native-ui-lib';
import {scale} from 'utils/Functions';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';

const Banner = ({
  data,
  space = 10,
  width = 300,
  style,
  styleItem,
  styleImg,
}) => {
  const Item = ({item}) => (
    <TouchableOpacity
      style={[styles.item, styleItem]}
      onPress={() => {
        Navigator.push(item.screen);
      }}>
      <Image source={item.img} style={[styles.img, styleImg]} />
    </TouchableOpacity>
  );

  const renderItem = ({item, index}) => (
    <View
      style={[
        index && {marginLeft: scale(space)},
        {
          width: scale(width),
        },
      ]}>
      <Item item={item} styleItem={styleItem} styleImg={styleImg} />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.name}
      //showsHorizontalScrollIndicator={true}
      horizontal={true}
      style={[styles.list, style]}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 20,
    marginRight: -Spacing.PADDING,
  },
  item: {},
  img: {
    width: '100%',
    height: scale(112),
    resizeMode: 'contain',
  },
});

export default Banner;
