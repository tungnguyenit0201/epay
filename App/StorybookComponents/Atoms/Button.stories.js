import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {scale} from 'utils/Functions'
import {Colors, Fonts} from 'themes'

import Button from './Button';

storiesOf('Atoms/Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => <Button label="Bam nut" />)
  .add('ActiveCard', () => <Button bg={"#6FC3EA"}
  color={"#fff"} 
  label='Thẻ'
  mr={10}
  style={{
    minWidth: 102,
    borderRadius: 16,
    height: 32,
    maxWidth: 40
  }}
  />)
  .add('NotActiveCard', () => <Button bg={"#EEE"}
  color={"#666"} 
  label='Tài khoản'
  mr={10}
  style={{
    minWidth: 102,
    borderRadius: 16,
    height: 32,
    maxWidth: 40
  }}
  />)
  .add('Denine', () => <Button
  label="Không"
  style={{
    width: scale(120), 
    height: scale(42), 
    backgroundColor: 'transparent', 
    borderColor: Colors.cl1, 
    borderWidth: 1
  }}
  color={Colors.cl1}
  fs={Fonts.H6}
  onPress={() => setOpen(false)}
/>)

