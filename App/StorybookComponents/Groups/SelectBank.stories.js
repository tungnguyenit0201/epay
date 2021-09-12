import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import SelectBank from './SelectBank';
import {Images, Spacing, base} from 'themes';

const dataBank = [
  {
    id: 1,
    icon: Images.Bank.Vietinbank.default,
    name: 'Vietinbank',
    screen: 'Hello',
  },
  {
    id: 2,
    icon: Images.Bank.Eximbank.default,
    name: 'Eximbank',
    screen: 'hello',
  },
  {
    id: 3,
    icon: Images.Bank.Vietcombank.default,
    name: 'Vietcombank',
    screen: 'hello',
  },
];

const translation = require('../../Context/Language/vi.json');

storiesOf('Groups/SelectBank', module)
  .addDecorator(withKnobs)
  .add('SelectBank', () => (
    <SelectBank data={dataBank} label={'Chọn nguồn tiền '} />
  ));
