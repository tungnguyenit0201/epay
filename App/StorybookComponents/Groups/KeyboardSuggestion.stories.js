import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Images} from 'themes';
import KeyboardSuggestion from './KeyboardSuggestion';
import {SafeAreaProvider} from 'react-native-safe-area-context';

storiesOf('Groups/KeyboardSuggestion', module)
  .addDecorator(withKnobs)
  .add('KeyboardSuggestion', () => <KeyboardSuggestion />);
