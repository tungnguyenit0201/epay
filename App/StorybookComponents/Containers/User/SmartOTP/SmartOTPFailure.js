import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../../Atoms/Text';
import Button from '../../../Atoms/Button';

const SmartOTPFailure = ({route}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text bold fs={'h2'}>
        Đổi mật khẩu không thành công
      </Text>
      <Text>{route?.params?.message}</Text>
      <Button label="Quay lại sau" onPress={() => console.log('hello')} />
    </View>
  );
};

export default SmartOTPFailure;

const styles = StyleSheet.create({});
