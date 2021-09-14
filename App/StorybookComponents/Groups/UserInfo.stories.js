import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import UserInfo from './UserInfo';


storiesOf('Groups/UserInfo', module)
  .addDecorator(withKnobs)
  .add('Default', () => <UserInfo />)
