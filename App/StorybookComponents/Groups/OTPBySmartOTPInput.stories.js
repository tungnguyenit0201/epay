import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import OTPBySmartOTPInput from './OTPBySmartOTPInput';
import {Spacing} from 'themes'


storiesOf('Groups/OTPBySmartOTPInput', module)
  .addDecorator(withKnobs)
  .add('OTPBySmartOTPInput', () => <OTPBySmartOTPInput code={'123456'} />)
