import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import QRPay from './QRPay';
import Transfer from './Transfer';
import TransferResults from './TransferResults';
import TransferSuccess from './TransferSuccess';

storiesOf('Layout/QRPay', module)
  .addDecorator(withKnobs)
  .add('index', () => <QRPay />)
  .add('Transfer', () => <Transfer />)
  .add('TransferResults', () => <TransferResults />)
  .add('TransferSuccess', () => <TransferSuccess />);
