import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import BlueHeader from './BlueHeader';

storiesOf('Atoms/BlueHeader', module)
  .addDecorator(withKnobs)
  .add('BlueHeader', () => <BlueHeader />);
