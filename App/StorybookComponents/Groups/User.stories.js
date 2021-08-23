import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import User from './User';


storiesOf('Groups/User', module)
  .addDecorator(withKnobs)
  .add('Default', () => <User style={{marginBottom: 20}} />)
