import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Text from './Text';

export default {
  title: `Atoms/Text`,
  component: Text,
  argTypes: {
    fs: {
      options: ['sm', 'md', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'radio' }
    }
  }
}

const Template = (args) => <Text {...args}>hello</Text>

export const Default = Template.bind({})
Default.args = {
    fs: 'sm',
}
