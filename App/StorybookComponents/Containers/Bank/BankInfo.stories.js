import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Images} from 'themes';
import BankInfo from './BankInfo';

storiesOf('Layout/Bank/Bankinfo', module).addDecorator(withKnobs);
/* .add('Default', () => <BankInfo />) */
