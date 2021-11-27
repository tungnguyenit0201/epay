import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import {get} from 'lodash';

import {
  HeaderBg,
  Text,
  TextInput,
  Icon,
  Button,
  Header,
  EPayAvatar,
  TransferMoneyTextInput,
  Radio,
  MoneySource,
} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {scale} from 'utils/Functions';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {useTranslation} from 'context/Language';
import {maskText} from 'utils/Functions';
import {useWallet} from 'context/Wallet';
import Bank from 'components/QRPay/Bank';
import {useBankInfo} from 'context/Wallet/utils';

const TransactionDetails = ({route}) => {
  const translation = useTranslation();
  const walletContext = useWallet();
  const {onGetConnectedBank, getListSourceMoney} = useBankInfo();
  const ePayUser = get(route, ['params', 'ePayUser'], null);
  const [feeId, setFeeId] = useState(1);
  const [listBank, setListBank] = useState([]);
  const sourceRef = useRef(null);
  const onChangeTransferFeeSource = value => {
    setFeeId(value);
  };

  useEffect(() => {
    onGetConnectedBank()
      .then(bankList => {
        setListBank(bankList.result.ListBankConnect);
      })
      .catch(e => {});
    getListSourceMoney().then(res => {
      console.log('Tuan Doan LOG res\n\n', JSON.stringify(res, null, 2));
    });
  }, []);

  const onChangeMoneySource = source => {
    sourceRef.current = source;
    console.log('Tuan Doan LOG source\n\n', JSON.stringify(source, null, 2));
  };

  const renderInfoTransfer = () => {
    return (
      <View style={styles.wrap}>
        <View style={styles.blockUser}>
          <EPayAvatar
            noLinear
            avatar={ePayUser?.avatar}
            name={ePayUser?.name}
            avatarStyle={styles.avatarStyle}
          />
          <View style={styles.userInfo}>
            <Text bold style={styles.nameUser}>
              {ePayUser?.name}
            </Text>
            <Text style={styles.textBlack}>
              {maskText(ePayUser?.phone, 3, 3)}
            </Text>
          </View>
        </View>
        {/* Input with Text */}
        <View style={styles.transferMoneyInputWrapper}>
          <TransferMoneyTextInput />
        </View>

        <TextInput
          placeholder={translation.enter_message}
          style={styles.inputBlock}
          placeholderTextColor={Colors.BLACK}
        />

        <Radio
          onChange={onChangeTransferFeeSource}
          items={[
            {label: 'Người gửi chịu phí', value: 1},
            {label: 'Người nhận chịu phí', value: 2},
          ]}
          groupStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
          }}
          selectedValue={feeId}
        />
      </View>
    );
  };

  const renderMoneySource = () => {
    return (
      <View style={styles.wrap}>
        <MoneySource
          listSource={listBank}
          onSelectMoneySource={onChangeMoneySource}
        />
      </View>
    );
  };

  const submitTransferMoney = () => {
    console.log(
      'Tuan Doan LOG sourceRef.current\n\n',
      JSON.stringify(sourceRef.current, null, 2),
    );
    walletContext.dispatch({
      type: 'UPDATE_TRANSACTION_INFO',
      data: {
        transType: 3,
        bank: {
          BankNumber: sourceRef.current.BankNumber,
          BankName: sourceRef.current.BankName,
        },
        fee: {
          FixedFee: 1000,
          BankFee: 0.5,
        },
        amount: 10000,
      },
    });
    setTimeout(() => {
      Navigator.navigate(SCREEN.CONFIRMATION);
    }, 1000);
  };

  console.log('Tuan Doan LOG render\n\n');
  return (
    <View flex={1}>
      <HeaderBg>
        <Header title={translation.transfer_to} back />
      </HeaderBg>
      <FlatList
        style={styles.container}
        ListFooterComponent={() => (
          <View style={styles.flexBox}>
            {renderInfoTransfer()}
            <Icon
              style={styles.iconRectangle}
              icon={Images.Transfer.Rectangle}
              tintColor={Colors.g2}
            />
            {renderMoneySource()}
          </View>
        )}
        bounces={false}
      />
      <View style={styles.footerButton}>
        <Button label="Tiếp tục" onPress={submitTransferMoney} bold />
      </View>
    </View>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bs4,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    flex: 1,
  },
  textBlack: {
    fontSize: Fonts.H6,
    color: Colors.textMoneyTransfer,
  },
  blockUser: {
    flex: 1,
    alignItems: 'center',
  },
  nameUser: {
    fontSize: Fonts.H5,
    paddingTop: scale(16),
  },
  flexBox: {
    flex: 4,
    marginVertical: scale(20),
  },
  // eslint-disable-next-line react-native/no-color-literals
  inputBlock: {
    fontSize: Fonts.H6,
    marginTop: scale(6),
    backgroundColor: 'transparent',
    borderColor: Colors.g4,
  },
  iconRectangle: {
    height: scale(10),
    width: '100%',
    marginBottom: scale(15),
  },
  textH6: {
    fontSize: Fonts.H6,
  },
  avatarStyle: {width: scale(120), height: scale(120), resizeMode: 'contain'},
  userInfo: {
    alignItems: 'center',
  },
  transferMoneyInputWrapper: {
    marginVertical: scale(16),
  },
  footerButton: {
    padding: Spacing.PADDING,
    backgroundColor: Colors.white,
  },
});
