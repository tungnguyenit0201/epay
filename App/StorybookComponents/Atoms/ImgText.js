import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './Text';
import {scale} from 'utils/Functions';

const Item = ({item, styleItem, styleWicon, styleIcon, styleText}) => {
  return (
    <TouchableOpacity
      style={[styles.item, styleItem]}
      onPress={() => {
        console.log('hello')
      }}>
      <View style={[styles.wicon, styleWicon]}>
        <Image source={item.icon.default} style={[styles.icon, styleIcon]} />
      </View>
      <Text centered size={12} mt={5} style={styleText}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  wicon: {
    width: scale(48),
    height: scale(48),
    backgroundColor: '#DAE9F8',
    borderRadius: 16,
    marginBottom: 5,
  },
  icon: {
    width: scale(28),
    height: scale(28),
    resizeMode: 'contain',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: scale(-14)}, {translateY: scale(-14)}],
  },
});

export default Item;
