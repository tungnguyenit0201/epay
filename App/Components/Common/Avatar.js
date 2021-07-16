import React from 'react';
import {Image} from 'react-native';
import Spacing from 'themes/Spacing';
import {scale} from 'utils/Functions';

const Avatar = ({style, avatar, size}) => {
  return (
    <Image
      source={{uri: avatar}}
      style={[
        {
          marginTop: scale(5),
          marginBottom: scale(2),
          width: size || Spacing.PADDING,
          height: size || Spacing.PADDING,
          borderRadius: (size || Spacing.PADDING) / 2,
        },
        style,
      ]}
      resizeMode={'contain'}
    />
  );
};
export default Avatar;
