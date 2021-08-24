import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import User from './User';

export default {
  title: `Layout/User`,
  component: User,
  argTypes: {
  }
}

const Template = (args) => <User {...args}/>

export const Default = Template.bind({})
Default.args = {
}
