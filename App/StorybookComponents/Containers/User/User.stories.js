import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {scale} from 'utils/Functions';
import {Colors, Fonts} from 'themes';

import ChooseIdentityCard from './VerifyInfo/ChooseIdentityCard';
import VerifyEmail from './VerifyInfo/VerifyEmail';
import VerifyEmailResult from './VerifyInfo/VerifyEmailResult';
import VerifyIdentityCard from './VerifyInfo/VerifyIdentityCard';
import VerifySuccess from './VerifyInfo/VerifySuccess';
import VerifyUserInfo from './VerifyInfo/VerifyUserInfo';
import VerifyUserPortrait from './VerifyInfo/VerifyUserPortrait';
import AutoPayment from './AutoPayment';
import ChangePassword from './ChangePassword';
import EditInfo from './EditInfo';
import User from './User';
import LanguageSetting from './LanguageSetting';
import NewPassword from './NewPassword';
import PaymentSettings from './PaymentSettings';
import Security from './Security';

import ActiveSmartOtp from './SmartOTP/ActiveSmartOTP';
import SmartOTP from './SmartOTP/SmartOTP';
import SmartOTPFailure from './SmartOTP/SmartOTPFailure';
import SmartOTPPassword from './SmartOTP/SmartOTPPassword';
import SmartOTPResult from './SmartOTP/SmartOTPResult';
import SyncSmartOTP from './SmartOTP/SyncSmartOTP';
import SyncSmartOTPResult from './SmartOTP/SyncSmartOTPResult';

storiesOf('Layout/User/VerifyInfo', module)
  .addDecorator(withKnobs)
  .add('ChooseIdentityCard', () => <ChooseIdentityCard />)
  .add('VerifyEmail', () => <VerifyEmail />)
  .add('VerifyEmailResult/True', () => <VerifyEmailResult success={true} />)
  .add('VerifyEmailResult/False', () => <VerifyEmailResult success={false} />)
  .add('VerifyIdentityCard', () => <VerifyIdentityCard />)
  .add('VerifySuccess', () => <VerifySuccess />)
  .add('VerifyUserInfo/Step1', () => <VerifyUserInfo identityCard={1} />)
  .add('VerifyUserPortrait', () => <VerifyUserPortrait />);

storiesOf('Layout/User/Default', module)
  .addDecorator(withKnobs)
  .add('AutoPayment', () => <AutoPayment />)
  .add('ChangePassword', () => <ChangePassword />)
  .add('EditInfo', () => <EditInfo />)
  .add('User', () => <User />)
  .add('LanguageSetting', () => <LanguageSetting />)
  .add('NewPassword', () => <NewPassword />)
  .add('PaymentSettings', () => <PaymentSettings />)
  .add('Security', () => <Security />);

storiesOf('Layout/User/SmartOtp', module)
  .addDecorator(withKnobs)
  .add('ActiveSmartOtp', () => <ActiveSmartOtp />)
  .add('SmartOTP', () => <SmartOTP />)
  .add('SmartOTPFailure', () => <SmartOTPFailure />)
  .add('SmartOTPPassword', () => <SmartOTPPassword />)
  .add('SmartOTPResult', () => <SmartOTPResult />)
  .add('SyncSmartOTP', () => <SyncSmartOTP />)
  .add('SyncSmartOTPResult', () => <SyncSmartOTPResult />);
