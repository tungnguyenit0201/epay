import React from 'react';
import {Image} from 'react-native';
import {Colors} from 'themes';
import {scale} from 'utils/Functions';

export default ({style, icon, size, tintColor}) => {
  return (
    <Image
      source={icon}
      style={[
        {
          width: !!size ? size : scale(24),
          height: !!size ? size : scale(24),
          tintColor: !!tintColor ? tintColor : Colors.ICONGRAY,
        },
        style,
      ]}
    />
  );
};
