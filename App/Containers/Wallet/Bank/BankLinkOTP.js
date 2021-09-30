import React, {useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, Header, Button, Icon, Modal, HeaderBg} from 'components';
import {Colors, Fonts, Images, Spacing} from 'themes';
import _ from 'lodash';
import OTPContainer from 'components/Auth/OTPContainer';
import {useTranslation} from 'context/Language';
import {useAuth} from 'context/Auth/utils';
import {useOTP} from 'context/Common/utils';
import {HelpModal} from 'components/Auth';
import BlueHeader from 'components/Auth/BlueHeader';
import {useRoute} from '@react-navigation/native';
import {SCREEN} from 'configs/Constants';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import {useBankInfo} from 'context/Wallet/utils';
import {useWallet} from 'context/Wallet';

const OTP = props => {
  const {params} = useRoute() || {};
  const {item} = params || {};
  const {
    errorMessage,
    countdown,
    code,
    showModal,
    setShowModal,
    onChange,
    onConfirmOTP,
    resentOTP,
    label,
  } = useOTP({});
  const {onActiveUserOTP} = useBankInfo();
  const {BankConnectInfo} = useWallet();
  const translation = useTranslation();

  const onSubmit = async () => {
    try {
      const params = {
        'MsgType': 'link_card',
        'MsgID': '1123123123',
        'TransactionID': '',
        'PhoneNumber': '0936898626',
        'BankID': 1,
        'TransCode': '123456789',
        'OtpCode': '666666',
      };
      const result = await onActiveUserOTP(params);
       props?.navigation?.push(SCREEN.MAP_BANK_FLOW, {
         screen: MapBankRoutes.BaseResultScreen,
         params: {result:result},
       });


    } catch (e){
      props?.navigation?.push(SCREEN.MAP_BANK_FLOW, {
        screen: MapBankRoutes.BaseResultScreen,
        params: {result:false},
      });
    }
  };

  const renderOTP = () => {
    //  <OTPInputView
    //   style={styles.wrapOtp}
    //   pinCount={6}
    //   onCodeChanged={onChange}
    //   autoFocusOnLoad
    //   codeInputFieldStyle={styles.otp}
    //   codeInputHighlightStyle={{}}
    //   onCodeFilled={onCodeFilled}
    //   clearInputs={message}
    //   code={code}
    // />
    return (
      <OTPContainer
        onChange={onChange}
        onCodeFilled={onConfirmOTP}
        message={errorMessage}
        code={code}
        countdown={countdown}
        resentOTP={resentOTP}
        // onChangePhone={onChangePhone}
        label={label}
      />
    );
  };

  const renderButton = () => {
    return (
      <View style={styles.shadowButton}>
        <Button
          label={'Liên kết'}
          bold
          size="lg"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onSubmit}
        />
      </View>
    );
  };
  return (
    <View flex={1} backgroundColor={Colors.WHITETEXT}>
      <HeaderBg>
        <Header back title={translation.connect_bank} />
      </HeaderBg>

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {renderOTP()}
      </ScrollView>
      {renderButton()}
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    paddingHorizontal: Spacing.PADDING,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  shadowButton: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOpacity: 1,
    shadowOffset: {width: 1, height: 0},
    borderRadius: 8,
    paddingBottom: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  shadow: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: Colors.BACKGROUND_BLUE,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    borderRadius: 8,
    marginVertical: 16,
  },
  subTitle: {color: '#666666', fontSize: Fonts.MD},
  title: {fontSize: Fonts.H6, marginTop: 8},
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  pt_1: {paddingTop: 24},
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  flex_2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  items_center: {
    alignItems: 'center',
  },
  btn: {
    minWidth: 102,
    borderRadius: 16,
    height: 32,
  },
  input: {
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  mb_1: {marginBottom: 16},
  dot: {
    width: 3,
    height: 3,
    marginRight: 8,
    backgroundColor: '#666666',
    borderRadius: 100,
  },
  text_gray: {color: '#666666'},
});
export default OTP;
