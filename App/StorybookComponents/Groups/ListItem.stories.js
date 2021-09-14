import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Images, Colors} from 'themes';
import ListItemSimple from './ListItemSimple';
import {scale} from 'utils/Functions';

const dataMenu = [
  {
    icon: Images.Homes.NapTien,
    name: 'Nạp tiền',
    screen: 'hello',
    checkSmartOTP: true,
  },
  {
    icon: Images.Homes.RutTien,
    name: 'Rút tiền',
    screen: 'hello',
    checkSmartOTP: true,
  },

  {
    icon: Images.Homes.ChuyenTien,
    name: 'Chuyển ti',
    screen: 'hello',
    checkSmartOTP: true,
  },
  {
    icon: Images.Homes.LichSuGd,
    name: 'Lịch sử',
    screen: 'hello',
  },
  {
    icon: Images.Homes.LichSuGd,
    name: 'QRPAY',
    screen: 'hello',
  },
];

storiesOf('Groups/ListItemSimple', module)
  .addDecorator(withKnobs)
  .add('ListItemSimple', () => (
    <ListItemSimple
      scroll
      space={1}
      col={4}
      data={dataMenu}
      styleText={[{fontSize: 14, color: Colors.black}]}
      styleWicon={[{backgroundColor: Colors.cl2}]}
      styleIcon={[{}]}
    />
  ));
