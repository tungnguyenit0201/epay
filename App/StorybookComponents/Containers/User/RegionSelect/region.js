import React from 'react';
import {View, FlatList, StyleSheet, Pressable} from 'react-native';
import {Colors, Spacing} from 'themes';

import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
const escapeRegex = string => string?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const cites = [
  {
    value: '14',
    label: 'An Giang',
    full_name: 'Tỉnh An Giang',
    country_id: 'VN',
    region: 'south,region_1',
  },
  {
    value: '11',
    label: 'Bà Rịa - Vũng Tàu',
    full_name: 'Tỉnh Bà Rịa - Vũng Tàu',
    country_id: 'VN',
    region: 'south,region_1',
  },
  {
    value: '7',
    label: 'Bình Dương',
    full_name: 'Tỉnh Bình Dương',
    country_id: 'VN',
    region: 'south,region_1',
  },
  {
    value: '18',
    label: 'Bình Phước',
    full_name: 'Tỉnh Bình Phước',
    country_id: 'VN',
    region: 'south,region_1',
  },
  {
    value: '9',
    label: 'Bình Thuận',
    full_name: 'Tỉnh Bình Thuận',
    country_id: 'VN',
    region: 'south,region_1',
  },
  {
    value: '27',
    label: 'Bình Định',
    full_name: 'Tỉnh Bình Định',
    country_id: 'VN',
    region: 'south,region_2',
  },
  {
    value: '50',
    label: 'Bạc Liêu',
    full_name: 'Tỉnh Bạc Liêu',
    country_id: 'VN',
    region: 'south',
  },
  {
    value: '62',
    label: 'Bắc Giang',
    full_name: 'Tỉnh Bắc Giang',
    country_id: 'VN',
    region: 'north,region_4',
  },
  {
    value: '63',
    label: 'Bắc Kạn',
    full_name: 'Tỉnh Bắc Kạn',
    country_id: 'VN',
    region: 'north,region_4',
  },
  {
    value: '8',
    label: 'Bắc Ninh',
    full_name: 'Tỉnh Bắc Ninh',
    country_id: 'VN',
    region: 'north,region_4',
  },
  {
    value: '37',
    label: 'Bến Tre',
    full_name: 'Tỉnh Bến Tre',
    country_id: 'VN',
    region: 'south',
  },
  {
    value: '38',
    label: 'Cao Bằng',
    full_name: 'Tỉnh Cao Bằng',
    country_id: 'VN',
    region: 'north',
  },
  {
    value: '12',
    label: 'Cà Mau',
    full_name: 'Tỉnh Cà Mau',
    country_id: 'VN',
    region: 'south',
  },
  {
    value: '10',
    label: 'Cần Thơ',
    full_name: 'Thành phố Cần Thơ',
    country_id: 'VN',
    region: 'south,region_1',
  },
  {
    value: '41',
    label: 'Gia Lai',
    full_name: 'Tỉnh Gia Lai',
    country_id: 'VN',
    region: 'south,region_2',
  },
  {
    value: '42',
    label: 'Hoà Bình',
    full_name: 'Tỉnh Hoà Bình',
    country_id: 'VN',
    region: 'north,region_4',
  },
  {
    value: '30',
    label: 'Hà Giang',
    full_name: 'Tỉnh Hà Giang',
    country_id: 'VN',
    region: 'north,region_4',
  },
];
const RegionSelect = () => {
  const renderItem = ({item}) => {
    let isSelected = false;
    return (
      <Pressable
        onPress={() => console.log('onPress')}
        style={{
          backgroundColor: isSelected ? Colors.cl1 : Colors.white,
          padding: Spacing.PADDING,
          borderBottomColor: Colors.BORDER,
          borderBottomWidth: 1,
        }}>
        <Text color={isSelected ? Colors.white : Colors.TEXT}>
          {item?.full_name}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header title={'Chọn thành phố / tỉnh'} back />
      </HeaderBg>
      <View style={[styles.wrap, {paddingVertical: 12}]}>
        {/* <Search onChange={setSearch} /> */}
      </View>
      <FlatList
        data={cites}
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
