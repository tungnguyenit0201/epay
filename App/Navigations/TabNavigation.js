import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {Text} from 'components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import _ from 'lodash';

import {Colors, Fonts, Images} from 'themes';

const Tab = createBottomTabNavigator();

import User from 'containers/User';
import Home from 'containers/Home';
import Transaction from 'containers/Transaction';
import {scale} from 'utils/Functions';
import {TEXT} from 'configs/Constants';

const TabIcons = {
  Home: Images.TabBar.Home,
  Transaction: Images.TabBar.Category,
  User: Images.TabBar.User,
};

const TabLabels = {
  Home: TEXT.HOME,
  Transaction: TEXT.TRANSACTION_HISTORY,
  User: TEXT.PROFILE,
};

const TabNavigation = () => {
  const {bottom} = useSafeAreaInsets();
  let avatar = '';

  return (
    <View style={{flex: 1, backgroundColor: Colors.BACKGROUNDCOLOR}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                source={
                  Boolean(route.name === 'User' && avatar)
                    ? {
                        uri: avatar,
                      }
                    : TabIcons[route.name]
                }
                style={[
                  {
                    marginTop: scale(5),
                    marginBottom: scale(2),
                    width: scale(15),
                    height: scale(15),
                    tintColor: focused ? Colors.PRIMARY : Colors.TEXT,
                  },
                  Boolean(route.name === 'User' && avatar) && {
                    borderRadius: scale(13),
                  },
                ]}
                resizeMode={'cover'}
              />
            );
          },
          tabBarLabel: ({color}) => (
            <Text color={color} size={Fonts.FONT_SMALL} lineHeight={scale(16)}>
              {TabLabels[route.name]}
            </Text>
          ),
        })}
        tabBarOptions={{
          adaptive: false,
          showLabel: true,
          activeTintColor: Colors.PRIMARY,
          inactiveTintColor: Colors.TEXT,
          style: {
            borderTopWidth: 0,
            borderTopColor: 'transparent',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: scale(40) + bottom,
            shadowColor: '#aaa',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 2,
            marginBottom: bottom ? (-bottom / 5) * 2 : 0,
          },
        }}>
        <Tab.Screen name={'Home'} component={Home} />
        <Tab.Screen name={'Transaction'} component={Transaction} />
        <Tab.Screen name={'User'} component={User} />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigation;
