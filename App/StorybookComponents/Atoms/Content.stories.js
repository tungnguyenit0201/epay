import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Colors, Fonts} from 'themes'

import Content from './Content';

import DatePicker from './DatePicker';

storiesOf('Atoms', module)
  .addDecorator(withKnobs)
  .add('Content', () => (
    <Content title="tiêu đề content" text="Nội dung content" />
  ))
  .add('DatePicker', () => <DatePicker label={'Ngày sinh (dd/mm/yyyy)'} />)

