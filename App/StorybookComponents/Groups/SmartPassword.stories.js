import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import SmartPassword from './SmartPassword';

storiesOf('Groups', module)
  .addDecorator(withKnobs)
  .add('SmartPassword', () => <SmartPassword />);
