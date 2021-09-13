import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import SlideIcon from './SlideIcon';
import {Images} from 'themes';

const dataHome = [
  {
    icon: Images.Homes.GiaoThong,
    name: 'Vi phạm giao thông',
    screen: 'hello',
  },
  {
    icon: Images.Homes.BaoHiem,
    name: 'Vaccine',
    screen: 'hello',
  },
  {
    icon: Images.Homes.GiaoThong,
    name: 'Giao thông',
    screen: 'hello',
  },
  {
    icon: Images.Homes.BaoHiem,
    name: 'Bảo hiểm',
    screen: 'hello',
  },
  {
    icon: Images.Homes.YTe,
    name: 'Y tế',
    screen: 'hello',
  },
  {
    icon: Images.Homes.SanBay,
    name: 'Sân bay ',
    screen: 'hello',
  },
];

storiesOf('Groups/SlideIcon', module)
  .addDecorator(withKnobs)
  .add('SlideIcon', () => <SlideIcon data={dataHome} />);
