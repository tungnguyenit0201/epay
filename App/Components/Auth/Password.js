import React from 'react';
import {View} from 'react-native';
import {InputBlock} from 'components';
import _ from 'lodash';

const Password = ({onChangePassword, onChangeConfirm}) => {
  return (
    <View>
      <InputBlock label="*Mật khẩu " password onChange={onChangePassword} />
      <InputBlock
        label="*Xác nhận mật khẩu"
        password
        onChange={onChangeConfirm}
      />
    </View>
  );
};

export default Password;
