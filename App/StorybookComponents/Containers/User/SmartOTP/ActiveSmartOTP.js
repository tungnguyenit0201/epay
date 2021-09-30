import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Text from '../../../Atoms/Text';
import Button from '../../../Atoms/Button';
import Header from '../../../Atoms/Header';
import Radio from '../../../Atoms/Radio';
import HeaderBg from '../../../Atoms/HeaderBg';
import Wrapper from '../../../Groups/Wrapper';
import FooterContainer from '../../../Atoms/FooterContainer';
import Checkbox from '../../../Atoms/Checkbox';
import {base, Colors, Fonts, Images} from 'themes';

const ActiveSmartOtp = () => {
  const translation = require('../../../../Context/Language/vi.json');
  const phone = '09031234567';
  const isAccepted = true;
  const [active, setActive] = useState(false);
  const [err, setErr] = useState(false);
  return (
    <Wrapper>
      <ScrollView style={{backgroundColor: Colors.white, paddingBottom: 20}}>
        <HeaderBg>
          <Header
            back
            title="Kích hoạt smart OTP"
            style={{marginTop: 25, marginBottom: -15}}
          />
        </HeaderBg>
        <View style={base.container}>
          <Text bold fs="h5" mb={15}>
            {`Khai báo thông tin \nSmart OTP`}
          </Text>
          <Text mb={5}>Số điện thoại</Text>
          <Text fs="h5" bold mb={15}>
            0809000999
          </Text>
          <Text bold>
            Lưu ý:{' '}
            <Text>
              Smart OTP trên thiết bị khác sẽ bị vô hiệu hoá sau khi kích hoạt
              thành công ở thiết bị này
            </Text>
          </Text>
        </View>
      </ScrollView>
      <Image source={require('images/wave.png').default} style={styles.bgImg} />
      <FooterContainer>
        <View style={styles.flexRow}>
          <Checkbox onPress={() => setActive(!active)} />
          <Text style={{marginLeft: 5, fontSize: Fonts.FONT_SMALL}}>
            {` Tôi đồng ý với `}
            <TouchableOpacity style={styles.mtMinus1} onPress={() => {}}>
              <Text style={[styles.firstLink]}>
                {'điều khoản & điều kiện '}
              </Text>
            </TouchableOpacity>
            của Epay
          </Text>
        </View>
        {!active ? (
          <Image
            source={require('images/gradient/B_active.png').default}
            style={base.buttonSB}
          />
        ) : (
          <Image
            source={require('images/gradient/B_active_disable.png').default}
            style={base.buttonSB}
          />
        )}
      </FooterContainer>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  bgImg: {
    width: 375,
    height: 375,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  flexRow: {flexDirection: 'row', marginBottom: 16},
  mtMinus1: {marginTop: -3},
  firstLink: {
    marginLeft: 3,
    fontSize: Fonts.FONT_SMALL,
    color: '#1F5CAB',
  },
});
export default ActiveSmartOtp;
