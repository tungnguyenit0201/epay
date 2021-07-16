import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Colors, Images } from 'themes';
import Text from './Text';
import Navigator from 'navigations/Navigator';
import { useSelector } from 'react-redux';

const RegionSwitch = ({ showLabel }) => {
  const city = useSelector((state) => state.region.city);

  return (
    <View centerV row right>
      {showLabel && (
        <Text medium size={12}>
          Chọn khu vực
        </Text>
      )}
      <Pressable onPress={() => Navigator.navigate('RegionSwitch')}>
        <View
          row
          centerV
          border
          borderRadius={5}
          paddingV-12
          paddingH-10
          marginL-10>
          <Text medium size={12}>
            {city?.label || 'Tỉnh / Thành phố'}
          </Text>
          <Image
            source={Images.Down}
            style={styles.downArrow}
            resizeMode={'contain'}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  downArrow: {
    marginLeft: 15,
    width: 11,
    height: 6
  }
});

export default RegionSwitch;
