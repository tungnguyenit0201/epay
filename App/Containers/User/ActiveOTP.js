import React, {useState, useContext} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

import {Text, Button, Icon, Header, Radio, HeaderBg} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';

import {Switch} from 'react-native-ui-lib'; //eslint-disable-line

const SmartOtp = () => {
  const translation = useTranslation();
  const [value1, setValue1] = useState(false);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState(false);
  const [value4, setValue4] = useState(false);

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
            0809000999
          </Text>
          <View style={[{paddingLeft: 22}]}>
            <Radio
              items={[{label: '', value: 1}]}
              style={[{marginRight: 0, position: 'absolute', let: 0, top: 1}]}
            />
            <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
              <Text>Tôi đồng ý với</Text>
              <TouchableOpacity
                onPress={() => Navigator.push(SCREEN.SMART_OTP)}>
                <Text ml={5} style={[{textDecorationLine: 'underline'}]}>
                  điều khoản điều kiện
                </Text>
              </TouchableOpacity>
            </View>
            <Text>đăng ký dịch vụ của Epay</Text>
          </View>
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button
          label="Kích hoạt"
          onPress={() => Navigator.push(SCREEN.SMART_OTP)}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: Spacing.PADDING,
    alignItems: 'center',
  },
  text: {
    marginRight: 80,
    fontSize: Fonts.H6,
  },
});
export default SmartOtp;
