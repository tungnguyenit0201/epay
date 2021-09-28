import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {scale} from 'utils/Functions';
import {Colors, Fonts} from 'themes';

import Home from './Home';
import MyWallet from './MyWallet';
/* import SplashScreen from './Splash'; */

storiesOf('Layout/Home', module)
  .addDecorator(withKnobs)
  .add('HomePage', () => <Home />)
  .add('MyWallet', () => <MyWallet />);
/* .add('SplashScreen', () => <SplashScreen />); */
