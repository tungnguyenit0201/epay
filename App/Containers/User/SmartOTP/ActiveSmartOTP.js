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
          </View>
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button
          label="Kích hoạt" // TODO: translate
          disabled={!isAccepted}
          onPress={onGoOTP}
        />
      </View>
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
