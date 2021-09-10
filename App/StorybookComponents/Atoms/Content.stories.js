import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Colors, Fonts} from 'themes'

import Content from './Content';

storiesOf('Atoms/Content', module)
  .addDecorator(withKnobs)
  .add('Default', () => <Content title='tiêu đề content' text='Nội dung content' />)

