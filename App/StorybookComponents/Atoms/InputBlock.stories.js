import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import InputBlock from './InputBlock';
import Radio from './Radio';
const translation = require('../../Context/Language/vi.json');

storiesOf('Atoms/Input', module)
  .addDecorator(withKnobs)
  .add('InputBlock', () => (
    <InputBlock
      password={true}
      placeholder="Nhập mật khẩu"
      label={'Mật khẩu'}
      required={true}
    />
  ))
  .add('Radio', () => (
    <Radio
      items={[
        {label: translation.male, value: 1},
        {label: translation.female, value: 2},
        {label: translation.others, value: 3},
      ]}
    />
  ));
