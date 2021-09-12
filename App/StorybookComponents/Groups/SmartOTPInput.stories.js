import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import SmartOTPInput from './SmartOTPInput';
import {Spacing} from 'themes'


storiesOf('Groups', module)
  .addDecorator(withKnobs)
  .add('SmartOTPInput', () => <SmartOTPInput message="Hãy nhập mã OTP" />);
