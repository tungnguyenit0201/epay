import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {Spacing} from 'themes';

import Password from './Password';

storiesOf('Components/Password', module).add('Default', () => (
  <View style={{marginHorizontal: Spacing.PADDING}}>
    <Password />
  </View>
));
