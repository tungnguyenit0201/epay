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
/* import TransactionSuccess from './TransactionSuccess'; */
import Transfer from './Transfer';
import TransferBank from './TransferBank';
import TransferPhone from './TransferPhone';
import PromoCode from './PromoCode';
import Withdraw from './Withdraw';
import BankDetail from './Bank/BankDetail';
import BankInfo from './Bank/BankInfo';
import BankLinked from './Bank/BankLinked';
import BankList from './Bank/BankList';
/* import BankResult from './Bank/BankResult'; */
import TransactionHistory from './History';
import TransactionDetails from './History/Detail';
import Empty from './History/Empty';

import LinkingAddress from './Bank/LinkingAddress';
import LinkingInfo from './Bank/LinkingInfo';
import LinkingConfirm from './Bank/LinkingConfirm';
import LinkingResult from './Bank/LinkingResult';

import PaymentConfirm from './PaymentConfirm';
import TransferSuccess from './TransferSuccess';
storiesOf('Layout/Wallet/Default', module)
  .addDecorator(withKnobs)
  .add('Confirmation', () => <Confirmation />)
  .add('Contacts', () => <Contacts />)
  .add('LimitSetting', () => <LimitSetting />)
  .add('OTPBySmartOTP', () => <OTPBySmartOTP />)
  .add('TopUp', () => <TopUp />)
  .add('TransactionFailure', () => <TransactionFailure />)
  /* .add('TransactionSuccess', () => <TransactionSuccess />) */
  .add('TransferBank', () => <TransferBank />)
  .add('TransferPhone', () => <TransferPhone />)
  .add('Withdraw', () => <Withdraw />);

storiesOf('Layout/Wallet/Bank', module)
  .addDecorator(withKnobs)
  .add('BankDetail', () => <BankDetail />)
  .add('BankInfo', () => <BankInfo />)
  .add('BankLinked', () => <BankLinked />)
  .add('SelectBank / 1', () => <BankList />)
  .add('SelectBank / 2', () => <BankList type={2} />)
  /* .add('BankResult', () => <BankResult />) */
  .add('LinkingAddress', () => <LinkingAddress />)
  .add('LinkingInfo', () => <LinkingInfo />)
  .add('LinkingConfirm', () => <LinkingConfirm />)
  .add('LinkingResult', () => <LinkingResult />);

storiesOf('Layout/Wallet/History', module)
  .addDecorator(withKnobs)
  .add('TransactionHistory', () => <TransactionHistory />)
  .add('TransactionDetails', () => <TransactionDetails />)
  .add('TransactionEmpty', () => <Empty />);

storiesOf('Layout/Wallet/QRPay', module)
  .addDecorator(withKnobs)
  .add('QRPay', () => <QRPay />)
  .add('SelectMoney', () => <SelectMoney />)
  .add('PromoCode', () => <PromoCode />)
  .add('Transfer', () => <Transfer />)
  .add('PaymentConfirm', () => <PaymentConfirm />)
  .add('TransferSuccess', () => <TransferSuccess />);
