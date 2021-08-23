import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Home from './Home';

export default {
  title: `Layout/Home`,
  component: Home,
  argTypes: {
  }
}

const Template = (args) => <Home {...args}/>

export const Default = Template.bind({})
Default.args = {
}
