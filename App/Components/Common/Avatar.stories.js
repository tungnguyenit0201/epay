import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';

import Avatar from './Avatar';

storiesOf('Atoms/Avatar', module)
  .addDecorator(withKnobs)
  .add('Default', () => <Avatar avatar={'https://scontent-sin6-2.xx.fbcdn.net/v/t1.6435-9/173437233_3918340391564306_537968573221894569_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=KEoAda_DBSsAX8JhW4u&_nc_ht=scontent-sin6-2.xx&oh=bd9a4d37bbf07c4ec0855e08e4967fa8&oe=6142D365'} />);

