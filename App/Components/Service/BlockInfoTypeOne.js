import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'components';
import {Images, Colors, Spacing, Fonts, base} from 'themes';

const BlockInfoTypeOne = ({title, onPress, 
  text,mb=16}) => (
  <View flexDirection='row' alignItems='center'
    style={[styles.boxItem, base.boxShadowGray,
      {marginBottom: mb}]} onPress={onPress}>
    <View flex={1}>
      <Text size={Fonts.LG} bold mb={16}>
        {title}
      </Text>
      {!!text && <Text size={Fonts.H6}>{text}</Text>}
    </View>

    <TouchableOpacity style={[styles.ml1,styles.boxCircle]}>
      <Image
        source={Images.Profile.Call}
        style={styles.icon1}
        resizeMode='contain'
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  ml1: {marginLeft: 20},
  //---------------
  icon1: {
    width: 32,
    height: 32,
    aspectRatio: 1,
  },
  //---------------
  boxItem: {
    paddingVertical: 17,
    paddingHorizontal: 16,
  },
  //---------------
  boxCircle: {
    width: 56,
    height: 56,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bs4,

    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
  },
});

export default BlockInfoTypeOne;
