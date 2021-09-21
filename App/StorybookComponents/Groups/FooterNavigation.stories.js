import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import FooterNavigation from './FooterNavigation';

storiesOf('Groups/FooterNavigation', module)
  .addDecorator(withKnobs)
  .add('FooterNavigation', () => (
    <SafeAreaProvider style={{marginTop: 25}}>
      <FooterNavigation />
    </SafeAreaProvider>
  ));
