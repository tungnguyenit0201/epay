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
import BlueHeader from '../../Atoms/BlueHeader';
const OTP = ({route}) => {
  const label = 'Bạn chỉ cần nhập mã OTP đã gửi tới số điện thoại đã đăng ký';
  const [showModal, setShowModal] = useState(false);

  const renderRightComponent = () => (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={styles.iconRight}>
      <Icon
        icon={Images.Register.Info.default}
        tintColor={Colors.white}
        style={styles.iconSize}
      />
    </TouchableOpacity>
  );

  return (
    // TODO: translate
    <>
      <BlueHeader>
        <Header
          back
          renderRightComponent={() => renderRightComponent()}
          logo={Images.logoEpay.default}
        />
        <View style={[styles.wrap, {paddingTop: Spacing.PADDING}]}>
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
        {/* 
        <View style={styles.container}>
          <View style={[styles.wrap, {paddingTop: Spacing.PADDING}]}>
            <View style={styles.logo}>
              <Image
                style={{width: 120, height: 72}}
                source={Images.logoEpay.default}
                resizeMode="contain"
              />
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
          onPress={() => console.log('OpenCatalog')}
        /> */}
        <TouchableOpacity
          style={[
            styles.flexRow,
            styles.justifyCenter,
            styles.bgGray,
            {
              paddingVertical: Spacing.PADDING - 5,
              marginTop: Spacing.PADDING * 5,
            },
          ]}>
          <Image source={Images.Phone.default} style={styles.iconPhone} />
          <Text bold>Gọi cho tôi</Text>
        </TouchableOpacity>
      </BlueHeader>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //-----------------------------
  absolute: {position: 'absolute'},
  top1: {top: 15},
  left1: {left: 30},
  right1: {right: 30},
  //-----------------------------
  flexRow: {flexDirection: 'row'},
  justifyCenter: {justifyContent: 'center'},
  //-----------------------------
  textCenter: {textAlign: 'center'},
  //-----------------------------
  bgGray: {backgroundColor: Colors.OtpGray_1},
  bgGray1: {backgroundColor: Colors.OtpGray_2},
  //-----------------------------
  iconRight: {paddingRight: Spacing.PADDING},
  iconPhone: {
    height: Spacing.PADDING,
    width: Spacing.PADDING,
    marginRight: 10,
    top: 1,
  },
  lineSize: {
    width: 1,
    height: 25,
  },
  iconSize: {
    width: 20,
    height: 20,
  },
});
export default OTP;
