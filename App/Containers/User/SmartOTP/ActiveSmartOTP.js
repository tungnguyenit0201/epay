import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text, Button, Icon, Header, Radio, HeaderBg} from 'components';
import {base} from 'themes';
import {useTranslation} from 'context/Language';
import {useSmartOTP} from 'context/User/utils';
import FooterContainer from 'components/Auth/FooterContainer';
import {scale} from 'utils/Functions';
const ActiveSmartOtp = () => {
  const translation = useTranslation();
  const {phone, isAccepted, onAcceptTermConditions, onGoOTP} = useSmartOTP();

  return (
    <>
      <HeaderBg>
        <Header back title="Kích hoạt smart OTP" />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={base.container}>
          <Text fs="h4" bold mt={20}>
            Khai báo thông tin
          </Text>
          <Text fs="h4" bold mb={20}>
            Smart OTP
          </Text>
          <Text mb={10}>Số điện thoại</Text>
          <Text fs="h4" bold mb={20}>
            {phone}
          </Text>
          <Text>
            <Text bold>Lưu ý: </Text>Smart OTP trên thiết bị khác sẽ bị vô hiệu
            hóa sau khi kích hoạt thành công ở thiết bị này
          </Text>
          <Image source={require('images/wave.png')} style={styles.bgImg} />
        </View>
      </ScrollView>
      <FooterContainer>
        <View style={[{paddingLeft: 22, paddingBottom: 15}]}>
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
              điều khoản điều kiện
            </Text>
            đăng ký dịch vụ của Epay
          </Text>
        </View>
        <Button
          label="Kích hoạt" // TODO: translate
          disabled={!isAccepted}
          onPress={onGoOTP}
        />
      </FooterContainer>
    </>
  );
};
const styles = StyleSheet.create({
  bgImg: {
    width: scale(375),
    height: scale(375),
    bottom: 0,
  },
});
export default ActiveSmartOtp;
