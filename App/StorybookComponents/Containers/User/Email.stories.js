import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, object, select } from '@storybook/addon-knobs';
import Email from './Email';
import VerifySuccess from './VerifySuccess';

storiesOf('Layout/User/Email', module)
    .addDecorator(withKnobs)
    .add('Nhập Email', () => <Email />)
    .add('Xác thực thành công', () => <VerifySuccess />)