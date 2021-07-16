import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import OTP from './OTP';

storiesOf('Screens/OTP', module).add('Default', () => (
  <SafeAreaProvider>
    <OTP />
  </SafeAreaProvider>
));
