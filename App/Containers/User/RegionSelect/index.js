import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Pressable} from 'react-native';
import {Search, Text, Header} from 'components';
import {Colors, Images, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import region from './region';

const TITLES = {
  cites: 'Chọn thành phố / tỉnh',
  districts: 'Chọn quận / huyện',
  wards: 'Chọn phường / xã',
};
const escapeRegex = string => string?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const RegionSelect = ({route}) => {
  const {items, type, parentType} = route.params;
  const [values, setValues] = useState(items.filter(item => !!item.value));
  const [search, setSearch] = useState('');

  const onSelected = item => {
    let field = '';
    if (type === 'cites') {
      field = 'city';
      const _items = region?.districts?.filter(i => i.city_id == item.value);
      Navigator.push('RegionSelect', {
        items: _items,
        type: 'districts',
        parentType,
      });
    } else if (type === 'districts') {
      field = 'district';
      const _items = region?.wards?.filter(i => i.district_id == item.value);
      if (!_items?.length) {
        Navigator.navigate('VerifyUserPortrait');
      } else {
        Navigator.push('RegionSelect', {
          items: _items,
          type: 'wards',
          parentType,
        });
      }
    } else if (type === 'wards') {
      field = 'ward';
      Navigator.navigate('VerifyUserPortrait', {type: parentType});
    }
  };

  useEffect(() => {
    setValues(
      items?.filter(item => {
        return (
          !!item.value &&
          RegExp(`${escapeRegex(search)}`, 'i').test(item?.label)
        );
      }),
    );
  }, [search]);
  const renderItem = ({item}) => {
    let isSelected = false;
    if (type === 'cites') {
      isSelected = item.value === region?.city?.value;
    } else if (type === 'districts') {
      isSelected = item.value === region?.district?.value;
    } else {
      isSelected = item.value === region?.ward?.value;
    }

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
          {item?.full_name}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={TITLES[type]} back />
      <View style={[styles.wrap, {paddingVertical: 12}]}>
        <Search onChange={setSearch} />
      </View>
      <FlatList
        data={values}
        renderItem={renderItem}
        keyExtractor={item => item.value}
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
