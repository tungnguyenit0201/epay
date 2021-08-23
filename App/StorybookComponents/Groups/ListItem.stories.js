import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Images} from 'themes';
import ListItem from './ListItem';

const dataEpay = [
  {
    icon: Images.Homes.NapViTuDong,
    name: 'Danh sách xe',
    screen: 'transfer',
  },
  {
    icon: Images.Homes.ThanhToanGt,
    name: 'Thanh toán vi phạm giao thông',
    screen: 'Withdraw',
  },
  {
    icon: Images.Homes.DichVuGt,
    name: 'Dịch vụ phi giao thông',
    screen: 'QRPay',
  },
];

storiesOf('Groups/ListItem', module)
  .addDecorator(withKnobs)
  .add('Default', () => <ListItem scroll space={1} col={4} data={dataEpay} />)
  .add('Blue', () => <ListItem
                        scroll
                        space={10}
                        col={4}
                        data={dataEpay}
                        styleText={[{fontSize: 14}]}
                        styleWicon={[{backgroundColor: '#437EC0'}]}
                        styleIcon={[{tintColor: '#fff'}]}/>)
