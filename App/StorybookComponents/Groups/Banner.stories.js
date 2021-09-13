import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Images} from 'themes';
import Banner from './Banner';
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

storiesOf('Groups/Banner', module)
  .addDecorator(withKnobs)
  .add('Banner', () => <Banner data={dataBanner} />);
