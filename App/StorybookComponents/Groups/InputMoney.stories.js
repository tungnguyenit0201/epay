import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Images} from 'themes';
import InputMoney from './InputMoney';
import {SafeAreaProvider} from 'react-native-safe-area-context';

storiesOf('Groups/InputMoney', module)
  .addDecorator(withKnobs)
  .add('InputMoney', () => <InputMoney />);
