import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Login from './Login';

export default {
  title: `Containers/Auth/Login`,
  component: Login,
  argTypes: {
  }
}

const Template = (args) => <Login {...args}/>

export const Default = Template.bind({})
Default.args = {
}
