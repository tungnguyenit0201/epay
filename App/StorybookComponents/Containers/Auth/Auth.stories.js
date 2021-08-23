import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Auth from './Auth';

export default {
  title: `Layout/Auth/index`,
  component: Auth,
  argTypes: {
  }
}

const Template = (args) => <Auth {...args}/>

export const Default = Template.bind({})
Default.args = {
}
