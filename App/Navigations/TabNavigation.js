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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import {SCREEN} from 'configs/Constants';

import {Colors, Fonts, Images, Spacing} from 'themes';

const Tab = createBottomTabNavigator();

import User from 'containers/User';
import Home from 'containers/Home';
import Notification from 'containers/Notification';

import {useTranslation} from 'context/Language';

const TabIcons = {
  Home: Images.TabBar.Home,
  User: Images.TabBar.User,
};

const TabNavigation = () => {
  const {bottom} = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();
  const translation = useTranslation();
  const TabLabels = {
    Home: 'Trang chủ', // TODO: translate
    User: translation.account,
  };

  function TabBarCustom({state, descriptors, navigation}) {
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
                style={styles.tab}>
                <Image
                  source={TabIcons[route.name]}
                  style={[
                    styles.icon,
                    route.name != 'Home' && {
                      tintColor: isFocused ? Colors.cl1 : Colors.gray,
                    },
                  ]}
                  resizeMode={'cover'}
                />
                <Text
                  style={{
                    color: isFocused ? Colors.cl1 : Colors.graycused,
                  }}>
                  {TabLabels[label]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.wrapTabImg}>
          <Image
            source={Images.TabBar.BottomTab}
            style={[{width: width}, styles.tabImage]}
          />
        </View>
        <TouchableOpacity
          style={[styles.wrapQR, {left: width / 2 - scale(56 / 2)}]}
          onPress={() => Alert.alert('', 'Coming soon')}>
          <Image source={Images.TabBar.QR} style={styles.qrImg} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator tabBar={props => <TabBarCustom {...props} />}>
        <Tab.Screen name={SCREEN.HOME} component={Home} />
        <Tab.Screen name={SCREEN.USER} component={User} />
        <Tab.Screen name={SCREEN.NOTIFICATION} component={Notification} />
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
  },
});

export default TabNavigation;
