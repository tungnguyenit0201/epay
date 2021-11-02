import React from 'react';
import {scale} from 'utils/Functions';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {Text} from 'components';
import Navigator from 'navigations/Navigator';

const Title = ({
  size=Fonts.LG,
  mb=16,
  children,
  style,
}) => {
  return (
    <Text size={size} bold mb={mb} style={style}>{children}</Text>
  );
};

export default Title;
