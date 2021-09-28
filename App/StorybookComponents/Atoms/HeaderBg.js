import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Colors, Images, Spacing, base} from 'themes';
import {scale} from 'utils/Functions';

const Header = ({children, style}) => {
  return (
    <View style={[base.container, styles.header, {paddingTop: top + 5}, style]}>
      <View style={styles.bg}>
        <Image source={Images.Homes.BgHeader.default} style={styles.img} />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
    marginBottom: 20,
  },
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    backgroundColor: Colors.cl1,
  },
  img: {
    width: 400,
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    resizeMode: 'cover',
  },
});

export default Header;
