import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../../Atoms/Text';
import Button from '../../../Atoms/Button';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';

const SyncSmartOTPResult = () => {
  return (
    <View>
      <HeaderBg>
        <Header back title="Smart OTP không hoạt động" />
      </HeaderBg>
      <View style={{flex: 1}}>
        <Text>
          Nếu Smart OTP không hoạt động, hãy thực hiện đồng bộ Smart OTP.
        </Text>
        <Text>
          Sau khi đồng bộ, nếu ứng dụng vẫn thông báo mã xác thực không chính
          xác. Qúy khách vui lòng liên hệ hotline 1900-0000 để được hỗ trợ.
        </Text>
      </View>
      <Button label="Đồng bộ smart OTP" />
    </View>
  );
};

export default SyncSmartOTPResult;

const styles = StyleSheet.create({});
