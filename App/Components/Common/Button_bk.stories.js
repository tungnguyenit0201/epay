import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Button from './Button_bk';

storiesOf('Atoms/Bottom_bk', module)
  .addDecorator(withKnobs)
  .add('Default', () => 
  <SafeAreaProvider>
    <Button />
  </SafeAreaProvider>
  );