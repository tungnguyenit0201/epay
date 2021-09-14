import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Text from '../../../Atoms/Text';
import Button from '../../../Atoms/Button';
import Header from '../../../Atoms/Header';
import Radio from '../../../Atoms/Radio';
import HeaderBg from '../../../Atoms/HeaderBg';
import {base} from 'themes';

const ActiveSmartOtp = () => {
  const translation = require('../../../../Context/Language/vi.json');
  const phone = '09031234567';
  const isAccepted = true;

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title="Kích hoạt smart OTP" />
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
              onChange={() => console.log('hello')}
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
          label="Kích hoạt" // TODO: translate
          disabled={!isAccepted}
          onPress={console.log('hello')}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({});
export default ActiveSmartOtp;
