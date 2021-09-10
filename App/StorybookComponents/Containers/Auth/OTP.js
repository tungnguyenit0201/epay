import React, {useRef, useState} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import Text from '../../Atoms/Text';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import Icon from '../../Atoms/Icon';
import {Colors, Fonts, Images, Spacing} from 'themes';
import _ from 'lodash';
import OTPContainer from '../../Groups/OTPContainer';
import HelpModal from '../../Groups/HelpModal';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const OTP = ({route}) => {
  const label = 'Bạn chỉ cần nhập mã OTP đã gửi tới số điện thoại đã đăng ký';
  const [showModal, setShowModal] = useState(false);

  const renderRightComponent = () => (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={styles.iconRight}>
      <Icon icon={Images.Register.Info} tintColor={Colors.BLACK} />
    </TouchableOpacity>
  );

  return (
    // TODO: translate
    <>
    <SafeAreaProvider>
      <View>
        <Header
          back
          blackIcon
          style={styles.header}
          renderRightComponent={() => renderRightComponent()}
        />
      </View>

      <View style={styles.container}>
        <View style={[styles.wrap, {paddingTop: Spacing.PADDING}]}>
          <View style={styles.logo}>
            <Image style={{ width: 120, height: 72 }} source={Images.logoEpay.default} resizeMode="contain" />
          </View>
          <OTPContainer
            onChange={() => console.log('change')}
            onCodeFilled={() => console.log('confirm')}
            message={'Bạn còn 4 lần nhập nữa'}
            countdown={60}
            resentOTP={() => console.log('gửi lại otp')}
            onChangePhone={() => console.log('onChangePhone')}
            label={label}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: Spacing.PADDING - 5,
          backgroundColor: Colors.OtpGray_1,
        }}
        onPress={() => setShowModal(true)}>
        <Image
          source={Images.Phone}
          style={{
            height: Spacing.PADDING,
            width: Spacing.PADDING,
            marginRight: 10,
            top: 1,
          }}
        />
        <Text bold>Gọi cho tôi</Text>
      </TouchableOpacity>

      <HelpModal
        showModal={showModal}
        setShowModal={setShowModal}
        onPress={() =>console.log('OpenCatalog')}
      />
    </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  header: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    color: Colors.BLACK,
  },
  logo: {
    marginBottom: Spacing.PADDING + 40,
    alignItems: 'center',
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  iconRight: {
    paddingRight: Spacing.PADDING,
  },
});
export default OTP;
