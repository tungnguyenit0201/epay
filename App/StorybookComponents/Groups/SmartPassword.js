import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Images} from 'themes';
const SmartPassword = ({active}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        width: 150,
        justifyContent: 'space-between',
      }}>
      <Image
        source={
          active
            ? require('images/storybook/dot.png').default
            : require('images/storybook/dot_black.png').default
        }
        style={{width: 14, height: 14}}
      />
      <Image
        source={
          active
            ? require('images/storybook/dot.png').default
            : require('images/storybook/dot_black.png').default
        }
        style={{width: 14, height: 14}}
      />
      <Image
        source={
          active
            ? require('images/storybook/dot.png').default
            : require('images/storybook/dot_black.png').default
        }
        style={{width: 14, height: 14}}
      />
      <Image
        source={
          active
            ? require('images/storybook/dot.png').default
            : require('images/storybook/dot_black.png').default
        }
        style={{width: 14, height: 14}}
      />
      <Image
        source={
          active
            ? require('images/storybook/dot.png').default
            : require('images/storybook/dot_black.png').default
        }
        style={{width: 14, height: 14}}
      />
      <Image
        source={
          active
            ? require('images/storybook/dot.png').default
            : require('images/storybook/dot_black.png').default
        }
        style={{width: 14, height: 14}}
      />
    </View>
  );
};
export default SmartPassword;
