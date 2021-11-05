import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Pressable} from 'react-native';
import {Search, Text, Header, HeaderBg} from 'components';
import {Colors, Images, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import region from './region';
import {useSelectRegion} from 'context/User/utils';
import {useTranslation} from 'context/Language';

const escapeRegex = string => string?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const RegionSelect = ({route}) => {
  const {items, type, parentType, callbackScreen} = route.params;
  const translation = useTranslation();
  const {onSelected} = useSelectRegion({
    items,
    type,
    parentType,
    callbackScreen,
  });

  const TITLES = {
    // TODO: translate
    cites: translation?.choose_provice,
    districts: translation?.choose_district,
    wards: translation?.choose_town,
  };
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
          backgroundColor: isSelected ? Colors.brd1 : Colors.bs4,
          padding: Spacing.PADDING,
          borderBottomColor: Colors.bs2,
          borderBottomWidth: 1,
        }}
      >
        <Text color={isSelected ? Colors.bs4 : Colors.tp3}>
          {item?.ProvinceName || item?.DistrictName || item?.WardName}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header title={TITLES[type]} back />
      </HeaderBg>
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
    backgroundColor: Colors.bs4,
  },
  wrap: {
    padding: Spacing.PADDING,
  },
});

export default RegionSelect;
