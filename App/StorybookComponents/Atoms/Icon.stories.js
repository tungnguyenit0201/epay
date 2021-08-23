import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Colors} from 'themes'
import Icon from './Icon';

const ArrowRight = require('images/arrow-right.png');
const EYE = require('images/Eye.png');
const EyeGray = require('images/EyeGray.png');
const Mobile = require('images/mobile.png');
const VIETCOMBANK = require('images/vietcombank.png');
const Up = require('images/Up.png');
const Down = require('images/Down.png');
const DefaultUser = require('images/default_user.png');
const Home = require('images/Home.png');


storiesOf('Atoms/Icons', module)
  .addDecorator(withKnobs)
  .add('ArrowRight', () => <Icon icon={ArrowRight}/>)
  .add('EYE', () => <Icon icon={EYE}/>)
  .add('EyeGray', () => <Icon icon={EyeGray}/>)
  .add('Mobile', () => <Icon icon={Mobile}/>)
  .add('VIETCOMBANK', () => <Icon icon={VIETCOMBANK}/>)
  .add('Up', () => <Icon icon={Up}/>)
  .add('Down', () => <Icon icon={Down}/>)
  .add('DefaultUser', () => <Icon icon={DefaultUser}/>)
  .add('Home', () => <Icon icon={Home}/>)

