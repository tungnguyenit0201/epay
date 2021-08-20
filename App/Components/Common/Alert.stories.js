import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Alert from './Alert';

storiesOf('Atoms/Alert', module)
  .addDecorator(withKnobs)
  .add('Default', () => <Alert />);
