import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {scale} from 'utils/Functions'
import {Colors, Fonts} from 'themes'

import ChooseIdentityCard from './VerifyInfo/ChooseIdentityCard';
import VerifyEmail from './VerifyInfo/VerifyEmail';
import VerifyEmailResult from './VerifyInfo/VerifyEmailResult';
import VerifyIdentityCard from './VerifyInfo/VerifyIdentityCard';
import VerifySuccess from './VerifyInfo/VerifySuccess';
import VerifyUserInfo from './VerifyInfo/VerifyUserInfo';
import VerifyUserPortrait from './VerifyInfo/VerifyUserPortrait';

storiesOf('Layout/User', module)
  .addDecorator(withKnobs)
  .add('ChooseIdentityCard', () => <ChooseIdentityCard />)
  .add('VerifyEmail', () => <VerifyEmail />)
  .add('VerifyEmailResult/True', () => <VerifyEmailResult success={true} />)
  .add('VerifyEmailResult/False', () => <VerifyEmailResult success={false} />)
  .add('VerifyIdentityCard', () => <VerifyIdentityCard />)
  .add('VerifySuccess', () => <VerifySuccess />)
  .add('VerifyUserInfo/Step1', () => <VerifyUserInfo identityCard={1} />)
  .add('VerifyUserPortrait', () => <VerifyUserPortrait />)