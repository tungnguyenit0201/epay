import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Button from './Button';

storiesOf('Atoms/Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => <Button label="Heelllo" />)
  .add('red', () => (
    <Button
      label={text('Text', 'This is Button')}
      style={object('Style', {backgroundColor: 'red', margin: 20})}
      mode={select(
        'Mode',
        {
          Text: 'text',
          Outlined: 'outlined',
          Contained: 'contained',
        },
        'contained',
      )}
    />
  ));
