import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {scale} from 'utils/Functions';
import {Colors, Fonts} from 'themes';
import Confirmation from './Confirmation';
import Contacts from './Contacts';
import LimitSetting from './LimitSetting';
import OTPBySmartOTP from './OTPBySmartOTP';
import QRPay from './QRPay';
import SelectMoney from './SelectMoney';
import TopUp from './TopUp';
import TransactionFailure from './TransactionFailure';
import TransactionSuccess from './TransactionSuccess';
import Transfer from './Transfer';
import TransferBank from './TransferBank';
import TransferPhone from './TransferPhone';
import Withdraw from './Withdraw';
import BankDetail from './Bank/BankDetail';
import BankInfo from './Bank/BankInfo';
import BankLinked from './Bank/BankLinked';
import BankList from './Bank/BankList';
import BankResult from './Bank/BankResult';
import TransactionHistory from './History';
storiesOf('Layout/Wallet/Default', module)
  .addDecorator(withKnobs)
  .add('Confirmation', () => <Confirmation />)
  .add('Contacts', () => <Contacts />)
  .add('LimitSetting', () => <LimitSetting />)
  .add('OTPBySmartOTP', () => <OTPBySmartOTP />)
  .add('QRPay', () => <QRPay />)
  .add('SelectMoney', () => <SelectMoney />)
  .add('TopUp', () => <TopUp />)
  .add('TransactionFailure', () => <TransactionFailure />)
  .add('TransactionSuccess', () => <TransactionSuccess />)
  .add('Transfer', () => <Transfer />)
  .add('TransferBank', () => <TransferBank />)
  .add('TransferPhone', () => <TransferPhone />)
  .add('Withdraw', () => <Withdraw />);

storiesOf('Layout/Wallet/Bank', module)
  .addDecorator(withKnobs)
  .add('BankDetail', () => <BankDetail />)
  .add('BankInfo', () => <BankInfo />)
  .add('BankLinked', () => <BankLinked />)
  .add('BankList', () => <BankList />)
  .add('BankResult', () => <BankResult />);

storiesOf('Layout/Wallet/History', module)
  .addDecorator(withKnobs)
  .add('TransactionHistory', () => <TransactionHistory />);
