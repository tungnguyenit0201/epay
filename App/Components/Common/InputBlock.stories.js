import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, boolean, number} from '@storybook/addon-knobs';

import InputBlock from './InputBlock';

storiesOf('Atoms/InputBlock', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <InputBlock
      label={text('label', 'Input block')}
      password={boolean('password', false)}
      email={boolean('email', false)}
      numeric={boolean('numeric', false)}
      //   error,
      value={text('value', 'This is value of input block')}
      //   required,
      //   rightIcon,
      //   isSelect,
      inputStyle={object('inputStyle', {})}
    />
  ))
  .add('Password', () => (
    <InputBlock
      label={text('label', 'Password')}
      password={boolean('password', true)}
      email={boolean('email', false)}
      numeric={boolean('numeric', false)}
      //   error,
      value={text('value', 'This is value of input block')}
      //   required,
      //   rightIcon,
      //   isSelect,
      inputStyle={object('inputStyle', {})}
    />
  ));
