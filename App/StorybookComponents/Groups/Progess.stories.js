import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import Progress from './Progress';
import {Spacing} from 'themes'


storiesOf('Groups/Progress', module)
  .addDecorator(withKnobs)
  .add('Default', () => <Progress step={1} />);
