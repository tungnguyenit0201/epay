import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  HeaderBg,
  Header,
  Icon,
  Text,
  InputBlock,
  Row,
  Col,
  TextInput,
  Button,
} from 'components';

import {ERROR_CODE, SCREEN, FUNCTION_TYPE} from 'configs/Constants';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'context/Language';
import {Colors, Fonts, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
export default function (props) {
  const translation = useTranslation();
  const {params} = useRoute() || {};
  const {item} = params || {};
  const [bankAccount, setBankAccount] = useState('');
  const {bank, kycInfo, optionKyc} = item || {};
  const errorMessage = 'Vui lòng nhập thông tin số thẻ/tài khoản';
  const [err, setShowErr] = useState('');

  const renderBankInfo = () => {
    return (
      <View
        style={[styles.shadow, {flexDirection: 'row', alignItems: 'center'}]}>
        <Image
          source={{uri: bank?.BankLogoUrl}}
          style={{
            height: scale(32),
            aspectRatio: 2,
            marginRight: 12,
          }}
          resizeMode={'contain'}
        />
        <Text bold={true} size={Fonts.H6}>
          {bank?.BankName || ''}
        </Text>
      </View>
    );
  };

  const onChangeBankNumber = text => {
    setBankAccount(text?.trim());
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
    if (isValid) {
      if (optionKyc) {
        props?.navigation?.push(SCREEN.MAP_BANK_FLOW, {
          screen: MapBankRoutes.BankLinkKYCInfo,
          params: {kycInfo, bank, bankAccount},
        });
      } else {
        //open KYC flow
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
      keyboardType={'numeric'}
      error={err}
      showErrorLabel={true}
      onBlur={validateInfo}
      onFocus={onFocus}
      onSubmitEditing={validateInfo}
    />
  );

  const renderCard = () => {
    //Todo: pick from a list of KYC
    return (
      <View style={[styles.shadow]}>
        <Text style={styles.subTitle}>Họ và tên </Text>
        <Text style={styles.title}>NGUYEN VAN AN</Text>
        <View height={16} />
        <Text style={styles.subTitle}>CMND</Text>
        <Text style={styles.title}>{kycInfo?.label}</Text>
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
  const renderAddIc = () => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 8,
          borderColor: Colors.BORDER,
          borderWidth: 1,
          paddingHorizontal: 18,
          paddingVertical: 8,
          marginVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text size={Fonts.H6}>Thêm giấy tờ tùy thân khác </Text>
        <View flex={1} />
        <Image
          source={require('./images/icon_plus.png')}
          style={{width: 22, aspectRatio: 1}}
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
