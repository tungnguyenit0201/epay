import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, object, select } from '@storybook/addon-knobs';
import { scale } from 'utils/Functions'
import { Colors, Fonts } from 'themes'

import Language from './language';

storiesOf('Layout/Language', module)
    .addDecorator(withKnobs)
    .add('Chọn ngôn ngữ', () => <Language />)