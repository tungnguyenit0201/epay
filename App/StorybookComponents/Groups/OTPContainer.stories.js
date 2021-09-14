import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import OTPContainer from './OTPContainer';
import {Spacing} from 'themes'


storiesOf('Groups/OTPContainer', module)
  .addDecorator(withKnobs)
  .add('Default', () => <OTPContainer />)
