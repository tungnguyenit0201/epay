import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import Notification from './Notification';
import {Spacing} from 'themes'


storiesOf('Groups/Notification', module)
  .addDecorator(withKnobs)
  .add('Default', () => <Notification data={5} />)
