import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Images} from 'themes';
import HelpModal from './HelpModal';
import {SafeAreaProvider} from 'react-native-safe-area-context';

storiesOf('Groups/HelpModal', module)
  .addDecorator(withKnobs)
  .add('HelpModal', () => <SafeAreaProvider><HelpModal showModal={true}/></SafeAreaProvider>)
