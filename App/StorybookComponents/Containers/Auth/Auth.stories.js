import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {scale} from 'utils/Functions';
import {Colors, Fonts} from 'themes';

import Auth from './Auth';
import Login from './Login';
import OTP from './OTP';
import RegisterFailure from './RegisterFailure';
import ForgetNewPassword from './ForgetNewPassword';
import ForgetPassword from './ForgetPassword';
import Agreement from './Agreement';
/* import Register from './Register'; */
import RegisterName from './RegisterName';

storiesOf('Layout/Auth', module)
  .addDecorator(withKnobs)
  .add('Nhập số điện thoại', () => <Auth />)
  .add('Nhập mật khẩu', () => <Login />)
  .add('OTP', () => <OTP />)
  .add('Đăng ký không thành công', () => <RegisterFailure />)
  .add('Tạo mật khẩu', () => <ForgetNewPassword create={true} />)
  .add('Quên mật khẩu 1', () => <ForgetPassword />)
  .add('Quên mật khẩu 2', () => <ForgetNewPassword />)
  /* .add('Đăng ký', () => <Register />) */
  .add('RegisterName', () => <RegisterName />)
  .add('Agreement', () => <Agreement />);
