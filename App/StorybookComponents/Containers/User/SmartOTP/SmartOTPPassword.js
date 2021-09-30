import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import {Colors} from 'themes';
import SmartOTPInput from '../../../Groups/SmartOTPInput';
import SmartPassword from '../../../Groups/SmartPassword';
import Wrapper from '../../../Groups/Wrapper';
import FooterContainer from '../../../Atoms/FooterContainer';
const SmartOTPPassword = ({route, active}) => {
  return (
    <Wrapper>
      <View style={styles.container}>
        <HeaderBg>
          <Header
            back
            title="Kích hoạt Smart OTP"
            style={{marginBottom: -15, marginTop: 24}}
          />
        </HeaderBg>
        <Text bold style={{fontSize: 23, lineHeight: 25}}>
          {!active
            ? `Đặt mật khẩu \nsmart OTP`
            : `Xác nhận mật khẩu \nsmart OTP`}
        </Text>

        <Text style={{color: '#848181', marginTop: 15}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id dolor
          tellus.
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 35,
          }}>
          <SmartPassword active={active} />
        </View>
      </View>
      <FooterContainer>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{textDecorationLine: 'underline'}}>Quên mật khẩu</Text>
        </View>
      </FooterContainer>
    </Wrapper>
  );
};

export default SmartOTPPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
