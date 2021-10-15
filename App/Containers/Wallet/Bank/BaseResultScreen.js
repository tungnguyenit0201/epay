import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Switch, View} from 'react-native';
import {
  Button,
  Col,
  Header,
  HeaderBg,
  Row,
  SecondaryButton,
  Text,
} from 'components';
import {base, Colors, Fonts, Images} from 'themes';
import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';
import {useBankInfo, useTransactionResult} from 'context/Wallet/utils';
import {useRoute} from '@react-navigation/native';
import {TRANS_TYPE} from 'configs/Constants';
import {useWallet} from 'context/Wallet';

const result_bank_type = {
  BANK_LINK_ACCOUNT: 'BANK_LINK_ACCOUNT',
  UPDATE_EKYC: 'UPDATE_EKYC',
};

const BaseResultScreen = props => {
  const {params} = useRoute() || {};
  const {result, transBody, secondaryButton, positiveButton} = params || {};
  const {bankConnectInfo} = useWallet();

  console.log(JSON.stringify(bankConnectInfo));
  const transType = params?.transType || TRANS_TYPE.ActiveCustomer;
  const translation = useTranslation();
  const {onChange, onSetMoneySource, getResultButton} = useBankInfo(params);

  const {message, onRetry, onBackHome, statusTitle, description} =
    useTransactionResult(TRANS_TYPE.ActiveCustomer);

  const [isEnableSource, setEnableSource] = useState(false);
  const transTitle = 'Liên kết ngân hàng'; //statusTitle ||
  const transDesc =
    description || 'Ngân hàng {bankName}\n' + 'số tài khoản {accNumber}';

  const renderBody = () => {
    switch (transType) {
      case TRANS_TYPE.ActiveCustomer:
        return renderBankBody();
      case result_bank_type.UPDATE_EKYC:
        return renderIcBody();
      default:
        return null;
    }
  };

  const toggleSwitch = async () => {
    //"BankConnectId":1600,"BankCode":"VCB","BankName":"Vietcombank","CardNumber":"",
    // "CardHolder":"NGUYEN THANH TAM","BankNumber":"666666","ConnectTime":"13-09-2021 18:17:05","IsDefault":true,
    setEnableSource(prev => !prev);
    // const data= await
  };
  const renderBankBody = () => {
    return (
      <View>
        <View flexDirection={'row'} style={{alignItems: 'center'}}>
          <Text style={{flex: 1}}>Đặt làm nguồn tiền mặc định</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            // thumbColor={isEnableSource ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnableSource}
          />
        </View>
      </View>
    );
  };

  const renderIcBody = () => {
    return <View />;
  };

  const onPressPositive = () => {
    positiveButton?.onPress?.();
  };

  const onPressSecondary = () => {
    secondaryButton?.onPress?.();
  };
  const renderTransResult = () => {
    let sourceImg = result
      ? Images.TransactionHistory.Success
      : Images.TransactionHistory.Fail;
    return (
      <View style={styles.success}>
        <Image source={sourceImg} style={styles.imgSuccess} />
        <Text bold fs="h5" mb={15}>
          {transTitle || ''}
        </Text>
        <Text centered color={Colors.gray}>
          {`Ngân hàng ${params?.item?.BankName}\n`}
          {`số tài khoản ${params?.bankConnectInfo?.BankAccount}`}
        </Text>
      </View>
    );
  };

  const renderButtons = () => {
    // if (!secondaryButton && !positiveButton) {
    //   return null;
    // }

    return (
      <View
        style={[
          base.boxBottom,
          {position: 'absolute', bottom: 0, left: 0, right: 0},
        ]}
      >
        <Row space={10}>
          {!!1 && (
            <Col space={10} width="50%">
              <SecondaryButton
                bg={Colors.white}
                border={Colors.cl1}
                color={Colors.cl1}
                label={translation.common.goBackHome}
                // label={secondaryButton?.title}
                labelStyle={{fontSize: 14}}
                onPress={onBackHome}
                mode={'outline'}
              />
            </Col>
          )}

          {!!1 && (
            <Col space={10} width="50%">
              <Button
                type={1}
                // label={positiveButton?.title}
                // onPress={onPressPositive}
                label={translation.common.createTransaction}
                // style={styles.retryButton}
                // fs={Fonts.MD
                onPress={onRetry}
              />
            </Col>
          )}
        </Row>
      </View>
    );
  };

  return (
    <>
      <HeaderBg>
        <Header title="Kết quả giao dịch" />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={base.container}>
          {renderTransResult()}

          {renderBody()}
        </View>
      </ScrollView>
      <Image source={require('images/wave.png')} style={styles.bgImg} />
      {renderButtons()}
    </>
  );
};
const styles = StyleSheet.create({
  bgImg: {
    width: scale(375),
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  block: {
    marginBottom: 20,
    position: 'relative',
    minHeight: 128,
  },
  success: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imgSuccess: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.l3,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },

  textLeft: {
    color: Colors.cl3,
  },
  textRight: {
    color: Colors.BLACKTEXT,
    maxWidth: scale(160),
  },
});
export default BaseResultScreen;
