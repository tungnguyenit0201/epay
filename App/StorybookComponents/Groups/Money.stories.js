import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import Money from './Money';
import {Spacing} from 'themes'


storiesOf('Groups/Money', module)
  .addDecorator(withKnobs)
  .add('Default', () => <Money
    style={[
      {
        position: 'absolute',
        left: Spacing.PADDING,
        right: Spacing.PADDING,
      },
    ]}
  />)
