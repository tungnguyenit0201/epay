import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Text,
  Header,
  HeaderBg,
  TextInput,
  Radio,
  KeyboardSuggestion,
} from 'components';
import {SCREEN, PERSONAL_IC, GENDER, FUNCTION_TYPE} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale, formatMoney} from 'utils/Functions';

import {useTranslation} from 'context/Language';

import Bank from 'components/QRPay/Bank';
import {useQRTransfer} from 'context/Wallet/utils';
import {useWallet} from 'context/Wallet';
const Transfer = () => {
  const {
    transfer,
    suggestion,
    check,
    onChange,
    onContinue,
    onCheckAmountLimit,
  } = useQRTransfer();

  const translation = useTranslation();
  const {qrTransaction, sourceMoney} = useWallet();
  console.log('transfer?.Price? :>> ', transfer?.Price);
  return (
    // TODO: translate

    <>
      <HeaderBg mb={0}>
        <Header back title="Chuyển tiền số điện thoại" />
      </HeaderBg>
      <ScrollView style={[base.wrap]}>
        <View style={[styles.block]}>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <View style={styles.avatar}>
              <Image
                style={{width: 94, height: 94}}
                source={Images.DefaultUser}
                resizeMode="cover"
              />
            </View>

            <Text fs="h5" bold mb={5}>
              {qrTransaction?.MerchantName}
            </Text>
            {/* <Text mb={10}></Text> */}
          </View>

          <TextInput
            placeholder="Nhập tiền"
            maxLength={100}
            selectTextOnFocus
            numeric
            alphanumeric
            onChange={text => onChange('Price', text)}
            value={transfer?.Price?.toString()}
            onBlur={onCheckAmountLimit}
          />

          <TextInput
            placeholder="Nhập lời nhắn"
            maxLength={100}
            selectTextOnFocus
            onChange={text => onChange('Content', text)}
          />
          <Radio
            onChange={value => onChange('payoneer', value)}
            selectedValue={0}
            items={[
              {label: 'Người gửi chịu phí', value: 0},
              {label: 'Người nhận chịu phí ', value: 1},
            ]}
          />
        </View>
        <View style={[base.container, {paddingTop: 20}]}>
          <Bank
            sourceMoney={sourceMoney}
            onPress={item => onChange('sourceMoney', item)}
          />
        </View>
        <View style={{height: 150}}></View>
      </ScrollView>

      <KeyboardSuggestion
        optionList={suggestion?.map(x => ({
          value: x,
          label: formatMoney(x),
        }))}
        onPress={amount => onChange('Price', amount)}
        onContinue={() => onContinue(SCREEN.TRANSFER_COMFIRM)}
        isContinueEnabled={check}
      />
    </>
  );
};
const styles = StyleSheet.create({
  block: {
    paddingHorizontal: Spacing.PADDING,
    borderBottomColor: Colors.bs2,
    borderBottomWidth: 10,
  },
  avatar: {
    overflow: 'hidden',
    height: 94,
    width: 94,
    borderRadius: 99,
    marginBottom: 15,
    backgroundColor: Colors.g4,
  },
});
export default Transfer;
