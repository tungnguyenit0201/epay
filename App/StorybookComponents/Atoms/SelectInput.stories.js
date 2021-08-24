import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import SelectInput from './SelectInput';

storiesOf('Atoms/SelectInput', module)
  .addDecorator(withKnobs)
  .add('Default', () => <SelectInput optionList={[
    {label: 'CMND', value: 'cmnd'},
    {label: 'Căn cước', value: 'cancuoc'},
  ]} defaultValue={'cancuoc'} />)
