import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'components';
import {useSmartOTP} from 'context/User/utils';

const SmartOTPFailure = ({route}) => {
  const {onBack} = useSmartOTP();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text bold fs={'h2'}>
        Đổi mật khẩu không thành công
      </Text>
      <Text>{route?.params?.message}</Text>
      <Button label="Quay lại sau" onPress={onBack} />
    </View>
  );
};

export default SmartOTPFailure;

const styles = StyleSheet.create({});
