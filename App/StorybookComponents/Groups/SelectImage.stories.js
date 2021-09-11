import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import SelectImage from './SelectImage';
import {Spacing} from 'themes'


storiesOf('Groups/SelectImage', module)
  .addDecorator(withKnobs)
  .add('Default', () => <SelectImage />);
