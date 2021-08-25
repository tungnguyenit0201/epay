import React, {useState, useContext} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

import {Text, Button, Icon, Header, Radio, HeaderBg} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';
import {useSmartOTP} from 'context/User/utils';

const SmartOtp = () => {
  const translation = useTranslation();
  const {phone, isAccepted, onAcceptTermConditions, onGoOTP} = useSmartOTP();

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title="Kích hoạt smart OTP" back />
        </HeaderBg>
        <View style={base.container}>
          <Text mb={20}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centurie
          </Text>
          <Text fs="h6" mb={10}>
            Khai báo thông tin Smart OTP
          </Text>
          <Text mb={5}>Số điện thoại</Text>
          <Text fs="h5" bold mb={20}>
            {phone}
          </Text>
          <View style={[{paddingLeft: 22}]}>
            <Radio
              onChange={onAcceptTermConditions}
              items={[{label: '', value: 1}]}
              style={[{marginRight: 0, position: 'absolute', let: 0, top: 1}]}
            />
            <Text>
              Tôi đồng ý với
              <Text
                style={[{textDecorationLine: 'underline'}]}
                onPress={() => alert('Điều khoản điều kiện')}>
                {' '}
                điều khoản điều kiện{' '}
              </Text>
              đăng ký dịch vụ của Epay
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button
          label="Kích hoạt" // translate
          disabled={!isAccepted}
          onPress={onGoOTP}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({});
export default SmartOtp;
