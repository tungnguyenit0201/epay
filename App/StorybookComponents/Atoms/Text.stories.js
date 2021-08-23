import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Text from './Text';

storiesOf('Atoms/Text', module)
  .addDecorator(withKnobs)
  .add('sm', () => <Text fs="sm">hello</Text>)
  .add('md', () => <Text fs="md">hello</Text>)
  .add('h1', () => <Text fs="h1">hello</Text>)
  .add('h2', () => <Text fs="h2">hello</Text>)
  .add('h3', () => <Text fs="h3">hello</Text>)
  .add('h4', () => <Text fs="h4">hello</Text>)
  .add('h5', () => <Text fs="h5">hello</Text>)
  .add('h6', () => <Text fs="h6">hello</Text>)