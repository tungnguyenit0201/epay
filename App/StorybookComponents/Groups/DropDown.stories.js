import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import DropDown from './DropDown';
let cardList = [
  {label: 'CMND/CCCD', ICType: 1},
  {label: 'Chứng minh thư quân đội', ICType: 3},
  {label: 'Hộ chiếu', ICType: 2},
];
storiesOf('Groups/DropDown', module)
  .addDecorator(withKnobs)
  .add('DropDown', () => (
    <SafeAreaProvider>
      <DropDown data={cardList} />
    </SafeAreaProvider>
  ));
