import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Accordion from './Accordion';

storiesOf('Atoms/Accordion', module)
  .addDecorator(withKnobs)
  .add('Default', () => <Accordion title={'hello'} rightTitle={'rightTitle'} />)
  .add('Type2', () => <Accordion title={'hello'} rightTitle={'rightTitle'} />);
