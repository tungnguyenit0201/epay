import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Images} from 'themes';
import DinhDanh from './DinhDanh';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const dataBanner = [
  {
    img: require('images/home/banner-1.jpg'),
    screen: 'hello',
  },
  {
    img: require('images/home/banner-2.jpg'),
    screen: 'hello',
  },
];

storiesOf('Groups/DinhDanh', module)
  .addDecorator(withKnobs)
  .add('DinhDanh', () => <DinhDanh />);
