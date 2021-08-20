import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import BottomButton from './BottomButton';

storiesOf('Atoms/BottomButton', module)
  .addDecorator(withKnobs)
  .add('Default', () => 
  <SafeAreaProvider>
    <BottomButton />
  </SafeAreaProvider>
  );


