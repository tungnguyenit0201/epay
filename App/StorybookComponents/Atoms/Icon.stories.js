import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Icon from './Icon';

const icon = require('images/arrow-right.png');

export default {
  title: `Atoms/Icon`,
  component: Icon,
}

const Template = (args) => <Icon {...args} icon={icon}/>

export const Default = Template.bind({})
Default.args = {
    icon: icon,
}
