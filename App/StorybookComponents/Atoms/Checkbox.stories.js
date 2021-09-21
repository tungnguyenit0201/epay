import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Checkbox from './Checkbox';

storiesOf('Atoms/Checkbox', module)
  .addDecorator(withKnobs)
  .add('Checkbox', () => <Checkbox />);
