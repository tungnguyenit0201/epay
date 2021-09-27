import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {HeaderBg, Header, Text, InputBlock, Button} from 'components';

import {SCREEN} from 'configs/Constants';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'context/Language';
import {Colors, Fonts, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import {useUser} from 'context/User';
import {useBankInfo} from 'context/Wallet/utils';
import {censorCardNumber} from 'context/Wallet/utils/bankInfo';
import {bankCardRegex} from 'utils/ValidationSchemas';
const DEFAULT_BANK = {
  BankId: 1,
  BankCode: 'VCB',
  BankName: 'Vietcombank',
  ConnectTime: '21-02-2020 16:20:57',
  BankLogoUrl:
    'https://gateway.epayservices.com.vn/epay-images/bank/icon-Vietcombank.png',
};

export default function (props) {
  const translation = useTranslation();
  const {params} = useRoute() || {};
  const {userInfo} = useUser();
  const {onChange, onContinue} = useBankInfo(params);
  const {item, optionKyc} = params || {};
  const [bankAccount, setBankAccount] = useState('');
  const {bank, kycInfo} = item || {};
  const {personalIC} = userInfo || {};
  const errorMessage = 'Vui lòng nhập thông tin số thẻ/tài khoản';
  const [err, setShowErr] = useState('');

  useEffect(() => {
    return Keyboard?.dismiss?.();
  }, []);
  const renderBankInfo = () => {
    return (
      <View style={[styles.shadow, styles.row]}>
        <Image
          source={{uri: bank?.BankLogoUrl || DEFAULT_BANK.BankLogoUrl}}
          style={styles.bankIcon}
          resizeMode={'contain'}
        />
        <Text bold={true} size={Fonts.H6}>
          {bank?.BankName || DEFAULT_BANK.BankName}
        </Text>
      </View>
    );
  };

  const onChangeBankNumber = text => {
    let trimText = text?.trim();
    const regexValid = new RegExp(bankCardRegex).test(trimText);
    if (regexValid) {
      console.log(regexValid);
      setBankAccount(trimText);
    }
  };

  const validateInfo = () => {
    if (!bankAccount) {
      setShowErr(errorMessage);
      return false;
    }
    return true;
  };
  const onSubmit = () => {
    const isValid = validateInfo?.();
    onChange('BankAccount', bankAccount);
    if (isValid) {
      if (optionKyc) {
        onContinue(SCREEN.MAP_BANK_FLOW, {
          screen: MapBankRoutes.BankLinkKYCInfo,
        });
      } else {
        props?.navigation?.navigate?.(SCREEN.CHOOSE_IDENTITY_CARD);
      }
    }
  };
  const onFocus = () => {
    if (err) {
      setShowErr('');
    }
  };

  const renderBankInput = () => (
    <InputBlock
      placeholder={'Nhập số tài khoản/Số thẻ'}
      value={bankAccount}
      onChangeText={onChangeBankNumber}
      // keyboardType={'numeric'}
      error={err}
      showErrorLabel={true}
      onBlur={validateInfo}
      onFocus={onFocus}
      onSubmitEditing={validateInfo}
    />
  );

  const renderCard = () => {
    //Todo: pick from a list of KYC array
    // const icData= op
    const idText = 'CMND',
      nameText = 'Họ và tên ';
    return (
      <View style={[styles.shadow]}>
        <Text style={styles.subTitle}>{nameText}</Text>
        <Text style={styles.title}>
          {optionKyc?.data?.Name || personalIC.ICFullName}
        </Text>
        <View height={16} />
        <Text style={styles.subTitle}>{idText}</Text>
        <Text style={styles.title}>
          {censorCardNumber(optionKyc?.data?.Number || personalIC.ICNumber) ||
            optionKyc?.label}
        </Text>
      </View>
    );
  };
  const renderPolicy = () => {
    const policy =
      '\u2022 Đã đăng ký dịch vụ SMS Banking tại ngân hàng\n\u2022 Số điện thoại ${sdt} đã đăng ký tại VCB\n\u2022 Số GTTT trùng khớp với thông tin đăng ký tại ngân hàng';

    return (
      <View>
        <Text style={styles.title} bold={true}>
          Điều kiện liên kết
        </Text>
        <Text>{policy?.replace('${sdt}', '0967828333')}</Text>
      </View>
    );
  };
  const onAddIc = () => {
    props?.navigation?.push(SCREEN.VERIFY_USER_INFO, {
      params: {isMapBank: true},
    });
  };
  const renderAddIc = () => {
    return (
      <TouchableOpacity onPress={onAddIc} style={styles.bankIc}>
        <Text size={Fonts.H6}>Thêm giấy tờ tùy thân khác </Text>
        <View flex={1} />
        <Image
          source={require('./images/icon_plus.png')}
          style={styles.iconAdd}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  };
  const renderButton = () => {
    return (
      <View style={styles.shadowButton}>
        <Button
          label={translation.continue}
          bold
          size="lg"
          style={styles.button}
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
        {renderBankInfo()}
        {renderBankInput()}
        {renderCard()}
        <Text style={{fontSize: Fonts.SM}}>
          Thông tin GTTT phải trùng khớp với thông tin đăng ký tại ngân hàng
        </Text>
        {renderAddIc()}
        {renderPolicy()}
      </ScrollView>
      {renderButton()}
    </View>
  );
}
const styles = StyleSheet.create({
  iconAdd: {width: 22, aspectRatio: 1},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankIc: {
    borderRadius: 8,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  bankIcon: {
    height: scale(32),
    aspectRatio: 2,
    marginRight: 12,
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
});
