import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Images} from 'themes';
import ImgText from './ImgText';

const image = require('images/home/NapViTuDong.png');

const data = {
  icon: image,
  name: 'Danh sách xe',
  screen: 'Transfer',
}

storiesOf('Atoms/ImgText', module)
  .addDecorator(withKnobs)
  .add('Default', () => <ImgText item={data} />)
  .add('BLue', () => <ImgText item={data} styleWicon={[{backgroundColor: '#437EC0'}]}
  styleIcon={[{tintColor: '#fff'}]} />)
