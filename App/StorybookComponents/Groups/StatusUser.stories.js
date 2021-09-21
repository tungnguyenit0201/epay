import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import StatusUser from './StatusUser';
import {Spacing} from 'themes';

storiesOf('Groups', module)
  .addDecorator(withKnobs)
  .add('StatusUser', () => <StatusUser />);
