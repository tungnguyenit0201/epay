import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {scale} from 'utils/Functions';
import {Colors, Fonts} from 'themes';

import Notification from './Notification';
import EpaySuccess from './EpaySuccess';

storiesOf('Layout/Notification', module)
  .addDecorator(withKnobs)
  .add('Notification', () => <Notification />)
  .add('EpaySuccess', () => <EpaySuccess />);
