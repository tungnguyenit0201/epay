import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import TextInput from './TextInput';

export default {
  title: `Atoms/TextInput`,
  component: TextInput,
  argTypes: {
  }
}

const Template = (args) => <TextInput {...args}/>

export const Default = Template.bind({})
Default.args = {
    placeholder: 'Please enter something',
    error: true,
    style: {},
    onChange: console.log('hhhh'),
    password: true,
    numeric: true,
    phone: false,
    rightComponent: '',
    required: true,
    placeholderTextColor: 'blue'
}
