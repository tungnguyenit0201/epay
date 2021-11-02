import React, {useRef, useState} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Header, Button, Icon, Modal, HeaderBg} from 'components';
import {base, Colors, Fonts, Images, Spacing} from 'themes';
import _ from 'lodash';
import OTPContainer from 'components/Auth/OTPContainer';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {CONFIRM_METHODS, FUNCTION_TYPE} from 'configs/Constants';
import {useQRTransfer} from 'context/Wallet/utils';
const BankOTP = () => {
  const {onPaymentConfrim} = useQRTransfer(false);
  const translation = useTranslation();

  const renderOTPContainer = () => (
    <OTPContainer
      onChange={() => true}
      onCodeFilled={bankOTP =>
        onPaymentConfrim({
          ConfirmValue: bankOTP,
          ConfirmMethod: CONFIRM_METHODS.BANK_OTP,
        })
      }
      message={''}
      // code={code}
      countdown={60}
      resentOTP={() => true}
      onChangePhone={() => true}
      // TODO: translate
      label={`Mã xác thực gửi về mail . Vui lòng kiểm tra email & nhập thông tin bên dưới`}
      titleStyle={{color: Colors.tp2}}
    />
  );

  return (
    <>
      <>
        <HeaderBg>
          <Header back title={translation.common.authen} />
        </HeaderBg>
        <View
          style={[styles.wrap, base.bgWhite, {paddingTop: scale(28), flex: 1}]}
        >
          {renderOTPContainer()}
        </View>
      </>
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
  bgGray: {backgroundColor: Colors.g3},
  bgGray1: {backgroundColor: Colors.g4},
  //-----------------------------
  iconRight: {paddingRight: Spacing.PADDING},
  iconPhone: {
    height: Spacing.PADDING,
    width: Spacing.PADDING,
    marginRight: 10,
  },
  lineSize: {
    width: 1,
    height: 25,
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  mt: {
    marginTop: -10,
  },
  wrapCalMe: {
    paddingVertical: scale(10),
    backgroundColor: Colors.g3,
  },
  callMe: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.g4,
    marginHorizontal: scale(30),
    height: 25,
  },
});
export default BankOTP;
