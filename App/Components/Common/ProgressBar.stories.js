import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, boolean, number} from '@storybook/addon-knobs';

import ProgressBar from './ProgressBar';

storiesOf('Atoms/ProgressBar', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <ProgressBar
      rate={number('Rate', 0.7)}
      style={object('Style', {width: '90%', height: 30, alignSelf: 'center'})}
      color={text('Color', 'green')}
    />
  ));
