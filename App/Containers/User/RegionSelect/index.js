import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Pressable} from 'react-native';
import {Search, Text, Header} from 'components';
import {Colors, Images, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import region from './region';
import {useSelectRegion} from 'context/User/utils';

const TITLES = {
  //translate
  cites: 'Chọn thành phố / tỉnh',
  districts: 'Chọn quận / huyện',
  wards: 'Chọn phường / xã',
};
const escapeRegex = string => string?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const RegionSelect = ({route}) => {
  const {items, type, parentType} = route.params;
  const {onSelected} = useSelectRegion({items, type, parentType});
  const renderItem = ({item}) => {
    let isSelected = false;
    // if (type === 'cites') {
    //   isSelected = item.value === region?.city?.value;
    // } else if (type === 'districts') {
    //   isSelected = item.value === region?.district?.value;
    // } else {
    //   isSelected = item.value === region?.ward?.value;
    // }

    return (
      <Pressable
        onPress={() => onSelected(item)}
        style={{
          backgroundColor: isSelected ? Colors.PRIMARY : 'white',
          padding: Spacing.PADDING,
          borderBottomColor: Colors.BORDER,
          borderBottomWidth: 1,
        }}>
        <Text color={isSelected ? 'white' : Colors.TEXT}>
          {item?.ProvinceName || item?.DistrictName || item?.WardName}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={TITLES[type]} back />
      <View style={[styles.wrap, {paddingVertical: 12}]}>
        {/* <Search onChange={setSearch} /> */}
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => `${type}-${Math.random(1, 100)}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    padding: Spacing.PADDING,
  },
});

export default RegionSelect;
