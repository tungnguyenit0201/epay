import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from 'react-native';
import {Text} from 'components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import {SCREEN} from 'configs/Constants';

import {Colors, Fonts, Images, Spacing} from 'themes';

const Tab = createBottomTabNavigator();

import User from 'containers/User';
import Home from 'containers/Home';
import Notification from 'containers/Notification';
import EpaySuccess from 'containers/Notification/EpaySuccess';
import History from 'containers/Wallet/History';

import {useTranslation} from 'context/Language';
import {useCheckInfo} from 'context/Home/utils';

const TabIcons = {
  Home: Images.TabBar.Home,
  User: Images.TabBar.User,
};
const TabIconsActive = {
  Home: Images.TabBar.Home,
  User: Images.TabBar.User,
};

const TabNavigation = () => {
  const {width, height} = useWindowDimensions();
  const translation = useTranslation();
  const TabLabels = {
    Home: translation.home,
    User: translation.account,
  };

  function TabBarCustom({state, descriptors, navigation}) {
    const {checkInfo} = useCheckInfo();

    const onCheck = async () => {
      let result = await checkInfo(SCREEN.QRPAY);
      Boolean(result) && navigation.navigate(SCREEN.QRPAY);
    };

    return (
      <View style={styles.container}>
        <View style={[styles.wrapTab, {width: width}]}>
          {state.routes?.slice(0, 2).map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({name: route.name, merge: true});
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={route?.name}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={label === 'Home' ? styles.tabH : styles.tabU}
              >
                <Image
                  source={
                    !isFocused
                      ? TabIcons[route.name]
                      : TabIconsActive[route.name]
                  }
                  style={[styles.icon, isFocused || {tintColor: Colors.tp3}]}
                  resizeMode={'contain'}
                />
                <Text
                  style={{
                    color: isFocused ? Colors.brd1 : Colors.tp3,
                  }}
                  centered
                >
                  {TabLabels[label]}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[styles.wrapQR, {left: width / 2 - scale(56 / 2)}]}
            onPress={onCheck}
          >
            <Image source={Images.TabBar.QR} style={styles.qrImg} />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapTabImg}>
          <Image
            source={Images.TabBar.BottomTab}
            style={[{width: width}, styles.tabImage]}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator tabBar={props => <TabBarCustom {...props} />}>
        <Tab.Screen name={SCREEN.HOME} component={Home} />
        <Tab.Screen name={SCREEN.USER} component={User} />
        <Tab.Screen name={SCREEN.NOTIFICATION} component={Notification} />
        <Tab.Screen name={SCREEN.EPAY_SUCCESS} component={EpaySuccess} />
        <Tab.Screen name={SCREEN.HISTORY} component={History} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scale(80),
    position: 'absolute',
    elevation: 0,
    bottom: 0,
    shadowColor: Colors.tp5,
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
    height: scale(80),
  },
  tabImage: {
    height: scale(80),
  },
  tabH: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: scale(12),
    marginRight: scale(40),
  },
  tabU: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: scale(12),
    /* marginLeft: scale(15), */
  },
  icon: {
    marginTop: Spacing.PADDING / 2,
    marginBottom: scale(2),
    width: scale(27),
    height: scale(27),
    zIndex: 10,
  },
  wrapQR: {
    position: 'absolute',
    top: -scale(56 / 12 + 5),
    width: scale(56),
  },
  qrImg: {
    width: scale(56),
    height: scale(56),
  },
});

export default TabNavigation;
