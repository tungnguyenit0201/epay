import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Header from './Header';

export default {
  title: `Atoms/Header`,
  component: Header,
}

const Template = (args) => <Header title={'Quên mật khẩu'}/>

export const Default = Template.bind({})
Default.args = {
  title: 'Quên mật khẩu',
}
