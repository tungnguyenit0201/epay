import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {Text} from 'components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import {TEXT, SCREEN} from 'configs/Constants';

import {Colors, Fonts, Images} from 'themes';

const Tab = createBottomTabNavigator();

import User from 'containers/User';
import Home from 'containers/Home';
import History from 'containers/Wallet/History';

const TabIcons = {
  Home: Images.TabBar.Home,
  History: Images.TabBar.Category,
  User: Images.TabBar.User,
};

const TabLabels = {
  Home: TEXT.HOME,
  History: TEXT.TRANSACTION_HISTORY,
  User: TEXT.PROFILE,
};

const TabNavigation = () => {
  const {bottom} = useSafeAreaInsets();
  const {width, heigth} = useWindowDimensions();
  let avatar = '';
  const pathRef = useRef({
    pathX: '357',
    pathY: '675',
    pathA: '689',
    pathB: '706',
  });

  function TabBarCustom({state, descriptors, navigation}) {
    return (
      <View style={styles.conatainer}>
        <Text>asdasda</Text>
        <View style={{flexDirection: 'row', zIndex: 100}}>
          {state.routes.map((route, index) => {
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
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{flex: 1}}>
                <Text>{label}</Text>
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
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.BACKGROUNDCOLOR}}>
      <Tab.Navigator
        // screenOptions={({route}) => ({
        //   tabBarIcon: ({size, focused}) => {
        //     return (
        //       <Image
        //         source={
        //           Boolean(route.name === 'User' && avatar)
        //             ? {
        //                 uri: avatar,
        //               }
        //             : TabIcons[route.name]
        //         }
        //         style={[
        //           {
        //             marginTop: scale(5),
        //             marginBottom: scale(2),
        //             width: scale(15),
        //             height: scale(15),
        //             tintColor: focused ? Colors.cl1 : Colors.TEXT,
        //           },
        //           Boolean(route.name === 'User' && avatar) && {
        //             borderRadius: scale(13),
        //           },
        //         ]}
        //         resizeMode={'cover'}
        //       />
        //     );
        //   },
        //   tabBarLabel: ({color}) => (
        //     <Text color={color} size={Fonts.FONT_SMALL} lineHeight={scale(16)}>
        //       {TabLabels[route.name]}
        //     </Text>
        //   ),
        // })}
        // tabBarOptions={{
        //   adaptive: false,
        //   showLabel: true,
        //   activeTintColor: Colors.cl1,
        //   inactiveTintColor: Colors.TEXT,
        //   style: {
        //     borderTopWidth: 0,
        //     borderTopColor: 'transparent',
        //     borderTopLeftRadius: 10,
        //     borderTopRightRadius: 10,
        //     height: scale(40) + bottom,
        //     shadowColor: Colors.l5,
        //     shadowOffset: {width: 0, height: 0},
        //     shadowOpacity: 0.5,
        //     shadowRadius: 4,
        //     elevation: 2,
        //     marginBottom: bottom ? (-bottom / 5) * 2 : 0,
        //   },
        // }}>
        tabBar={props => <TabBarCustom {...props} />}>
        <Tab.Screen name={SCREEN.HOME} component={Home} />
        <Tab.Screen name={SCREEN.HISTORY} component={History} />
        <Tab.Screen name={SCREEN.USER} component={User} />
      </Tab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  conatainer: {
    height: scale(80),
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
  wrapTabImg: {
    position: 'absolute',
  },
  tabImage: {
    height: scale(80),
    zIndex: 1,
  },
});

export default TabNavigation;
