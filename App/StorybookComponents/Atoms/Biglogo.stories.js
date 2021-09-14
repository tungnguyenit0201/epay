import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {scale} from 'utils/Functions'
import {Colors, Fonts} from 'themes'

import BigLogo from './BigLogo';

storiesOf('Atoms', module)
  .addDecorator(withKnobs)
  .add('BigLogo', () => <BigLogo />)

