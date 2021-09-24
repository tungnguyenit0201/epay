import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import {SCREEN} from 'configs/Constants';

import {Colors, Fonts, Images, Spacing} from 'themes';

const Tab = createBottomTabNavigator();
import Text from '../Atoms/Text';

const TabNavigation = () => {
  const {width, height} = useWindowDimensions();
  const routes = [
    {name: 'Trang chủ', image: Images.TabBar.Home.default},
    {name: 'Tài khoản', image: Images.TabBar.User.default},
  ];
  function TabBarCustom({state, descriptors, navigation}) {
    return (
      <View>
        <View style={[styles.wrapTab]}>
          {routes.map((route, index) => {
            return (
              <TouchableOpacity style={[styles.tab]}>
                <Image
                  source={route.image}
                  style={[styles.icon]}
                  resizeMode={'cover'}
                />
                <Text
                  style={
                    route.name == 'Trang chủ'
                      ? {color: Colors.cl1}
                      : {color: 'red'}
                  }>
                  {route.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.wrapTabImg}>
          <Image
            source={Images.TabBar.BottomTab.default}
            style={[{width: width - 25}, styles.tabImage]}
          />
        </View>
        <TouchableOpacity
          style={[styles.wrapQR, {left: width / 2 - scale(56 / 2)}]}
          onPress={() => console.log('onPress')}>
          <Image source={Images.TabBar.QR.default} style={[styles.qrImg]} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        width: width - 32,
        height: 150,
      }}>
      <View style={[styles.wrapTab]}>
        {routes.map((route, index) => {
          return (
            <TouchableOpacity style={[styles.tab]}>
              <Image
                source={route.image}
                style={[styles.icon]}
                resizeMode={'cover'}
              />
              <Text
                style={
                  route.name == 'Trang chủ'
                    ? {color: Colors.cl1}
                    : {color: Colors.g5}
                }>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.wrapTabImg}>
        <Image
          source={Images.TabBar.BottomTab.default}
          style={[styles.tabImage]}
        />
      </View>
      <TouchableOpacity
        style={[styles.wrapQR, {left: width / 2 - scale(37)}]}
        onPress={() => console.log('onPress')}>
        <Image source={Images.TabBar.QR.default} style={[styles.qrImg]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  container: {
    height: scale(80),
    position: 'absolute',
    elevation: 0,
    bottom: 0,
    shadowColor: Colors.l5,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  wrapTab: {
    flexDirection: 'row',
    zIndex: 1,
  },
  wrapTabImg: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: scale(80),
  },
  tabImage: {
    height: scale(80),
    zIndex: 1,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    marginTop: Spacing.PADDING / 2,
    marginBottom: scale(2),
    width: scale(27),
    height: scale(27),
  },
  wrapQR: {
    position: 'absolute',
    top: -scale(56 / 2 + 5),
    width: scale(56),
  },
  qrImg: {
    width: scale(56),
    height: scale(56),
    position: 'absolute',
    right: scale(6),
  },
});

export default TabNavigation;
