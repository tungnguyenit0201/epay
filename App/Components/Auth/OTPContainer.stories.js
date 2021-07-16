import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {Spacing} from 'themes';

import OTPContainer from './OTPContainer';

storiesOf('Components/OTPContainer', module).add('Default', () => (
  <View style={{marginHorizontal: Spacing.PADDING}}>
    <OTPContainer />
  </View>
));
