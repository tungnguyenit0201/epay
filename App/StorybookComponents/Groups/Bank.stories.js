import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import Bank from './Bank';

storiesOf('Groups/Bank', module)
  .addDecorator(withKnobs)
  .add('Bank', () => <Bank />);
