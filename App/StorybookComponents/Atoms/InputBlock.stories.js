import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import InputBlock from './InputBlock';

storiesOf('Atoms/InputBlock', module)
  .addDecorator(withKnobs)
  .add('Default', () => <InputBlock password={true} placeholder="Nhập mật khẩu" label={"Mật khẩu"} required={true} />)
