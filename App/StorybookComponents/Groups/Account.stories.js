import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import Account from './Account';

storiesOf('Groups/Account', module)
  .addDecorator(withKnobs)
  .add('Account', () => <Account />);
