import React from 'react';
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
import HeaderBg from '../../../Atoms/HeaderBg';
import Icon from '../../../Atoms/Icon';
import Wrapper from '../../../Groups/Wrapper';
import FooterContainer from '../../../Atoms/FooterContainer';

import {Colors, Fonts, Images, Spacing, base} from 'themes';

const SmartOtp = () => {
  const translation = require('../../../../Context/Language/vi.json');

  return (
    <Wrapper>
      <ScrollView style={{backgroundColor: Colors.white, paddingBottom: 20}}>
        <HeaderBg>
          <Header
            back
            title={'Kích hoạt Smart OTP'}
            style={{marginTop: 24, marginBottom: -15}}
          />
        </HeaderBg>

        <View style={base.container}>
          <View style={[base.boxShadow, {backgroundColor: '#EEF6FF'}]}>
            <Text>
              <Text bold>Số serial: </Text>123455233
            </Text>
            <Text>
              <Text bold>Smart OTP: </Text> Phiên bản 1.1.0
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.item}
          onPress={() => console.log('hello')}>
          <Icon mr={8} icon={require('images/storybook/lock.png')} size={24} />
          <Text style={styles.text}> Đổi mật khẩu smart OTP</Text>
          <Icon
            style={[base.leftAuto]}
            icon={Images.ArrowRight}
            size={24}
            tintColor="#666666"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => console.log('hello')}>
          <Icon
            mr={8}
            icon={require('images/storybook/lock-slash.png')}
            size={24}
          />
          <Text style={styles.text}> Quên mật khẩu smart OTP</Text>
          <Icon
            style={[base.leftAuto]}
            icon={Images.ArrowRight}
            size={24}
            tintColor="#666666"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => console.log('hello')}>
          <Icon
            mr={8}
            icon={require('images/storybook/exclude.png')}
            size={24}
          />
          <Text style={styles.text}> Smart OTP không hoạt động</Text>
          <Icon
            style={[base.leftAuto]}
            icon={Images.ArrowRight}
            size={24}
            tintColor="#666666"
          />
        </TouchableOpacity>
      </ScrollView>
      <Image source={require('images/wave.png').default} style={styles.bgImg} />
      <FooterContainer>
        <Image
          source={require('images/gradient/B_cancel_active.png').default}
          style={base.buttonSB}
        />
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
  item: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.l2,
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
