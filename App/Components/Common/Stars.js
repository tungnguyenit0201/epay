import React from 'react';
import {Image, View} from 'react-native';
import {Colors, Images} from 'themes';
import Text from './Text';

const Stars = ({value, countStyle, hideCount, size = 10, style, count = 0}) => (
  <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
    {[1, 2, 3, 4, 5].map((item, index) => (
      <Image
        key={index}
        source={+value >= item ? Images.StarHilight : Images.Star}
        style={{
          width: size,
          height: size,
          marginRight: index < 4 ? size / 2 : 0,
        }}
      />
    ))}
    {!hideCount && (
      <Text
        size={12}
        color={Colors.tp3}
        style={[{marginLeft: size / 2}, countStyle]}
      >
        ({count})
      </Text>
    )}
  </View>
);

export default Stars;
