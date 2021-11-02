import React, {useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {Text, Header, Button, HeaderBg} from 'components';
import {Colors, Fonts, Images, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
import {useOTP} from 'context/Common/utils';
import {useRoute} from '@react-navigation/native';
import {SCREEN} from 'configs/Constants';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import {useBankInfo} from 'context/Wallet/utils';
import {useWallet} from 'context/Wallet';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {scale} from 'utils/Functions';

const OTP = props => {
  const {params} = useRoute() || {};
  const {item} = params || {};
  const {errorMessage, countdown, code, resentOTP, label} = useOTP({});
  const {onActiveUserOTP, onBankTransaction} = useBankInfo();
  const [otp, setOtp] = useState('');
  const translation = useTranslation();
  const {bankConnectInfo, transCode} = params || {};
  // alert(JSON.stringify(params));

  const onSubmit = async () => {
    try {
      const param = {
        BankId: bankConnectInfo?.BankId,
        TransCode: transCode,
        OtpCode: otp,
      };
      const result = await onActiveUserOTP(param);
      onBankTransaction(true, params);
      setOtp('');
    } catch (e) {
      onBankTransaction(false, params);
      // props?.navigation?.push(SCREEN.MAP_BANK_FLOW, {
      //   screen: MapBankRoutes.BaseResultScreen,
      //   params: {result:false},
      // });
      setOtp('');
    }
  };

  const onChange = value => {
    setOtp(value);
    console.log(otp);
  };

  const renderOTP = () => {
    return (
      <View>
        <Text bold fs="h3" style={[styles.textWhite, styles.mb1]}>
          {'Nhập OTP'}
        </Text>
        <Text fs="h6" style={[styles.textGray, styles.mb2]}>
          {label}
        </Text>
        <OTPInputView
          style={styles.wrapOtp}
          pinCount={6}
          onCodeChanged={onChange}
          // autoFocusOnLoad
          codeInputFieldStyle={styles.otp}
          onCodeFilled={onSubmit}
          clearInputs={errorMessage}
          code={otp}
          autoFocus={true}
        />

        <View style={styles.flexRow_1}>
          <Text style={styles.fontSize_1}>
            Gửi lại mã xác thực (OTP) sau:
            <Pressable
              style={{marginTop: -3}}
              disabled={countdown > 0}
              onPress={resentOTP}
            >
              <Text
                style={[
                  styles.fontSize_1,
                  {
                    color: Colors.brd1,
                  },
                ]}
              >
                {countdown > 0
                  ? ` 00:${countdown < 10 ? `0${countdown}` : countdown}`
                  : ' Gửi lại'}
              </Text>
            </Pressable>
          </Text>
        </View>

        <Text style={styles.message}>{errorMessage}</Text>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View style={styles.shadowButton}>
        <Button
          label={'Liên kết'}
          // size="lg"
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
    <View flex={1} backgroundColor={Colors.bs4}>
      <HeaderBg>
        <Header back title={translation.connect_bank} />
      </HeaderBg>

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
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
  bgGray: {backgroundColor: Colors.g3},
  bgGray1: {backgroundColor: Colors.g4},
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
    backgroundColor: Colors.bs4,
  },
  shadowButton: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: Colors.bs4,
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
    backgroundColor: Colors.bg1,
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
  wrapOtp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 16,
    width: '90%',
  },
  otp: {
    width: scale(40),
    backgroundColor: Colors.bs4,
    fontSize: Fonts.H4,
    color: Colors.tp2,
    textAlign: 'center',
    borderBottomColor: Colors.bs1,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 2,
    // height: scale(28),
  },
  message: {
    marginTop: 16,
    color: Colors.Highlight,
    textAlign: 'center',
  },
  fontSize_1: {fontSize: 14},
  flexRow_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
export default OTP;
