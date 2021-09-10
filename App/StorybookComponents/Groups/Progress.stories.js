import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, object, select } from '@storybook/addon-knobs';
import { Images } from 'themes';
import Progress from './Progress';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const data = [
    { name: 'Chụp hình cmnd' },
    { name: 'Chụp ảnh chân dung' },
    { name: 'Thông tin cá nhân' },
];
storiesOf('Groups/Progress', module)
    .addDecorator(withKnobs)
    .add('Progress', () => <Progress data={data} />)
