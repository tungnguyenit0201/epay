import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import Xacthuc from './XacThuc';


storiesOf('Groups/Xacthuc', module)
  .addDecorator(withKnobs)
  .add('Default', () => <Xacthuc />)
