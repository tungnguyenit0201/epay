import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Switch from './Switch';

storiesOf('Atoms', module)
  .addDecorator(withKnobs)
  .add('Switch', () => <Switch />)