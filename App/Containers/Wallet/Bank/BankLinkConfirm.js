import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {HeaderBg, Header, Text, Button} from 'components';
import Navigator from 'navigations/Navigator';

import {ERROR_CODE, SCREEN, FUNCTION_TYPE, IC_TPYE} from 'configs/Constants';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'context/Language';
import {base, Colors, Fonts, Images, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import {get} from 'lodash';
import {getFullAddress} from 'context/Wallet/utils/bankInfo';
import {useBankInfo} from 'context/Wallet/utils';

export default function (props) {
  const translation = useTranslation();
  const {params} = useRoute() || {};
  const {onActiveUser, getICLabel} = useBankInfo(params);

  const onSubmit = async () => {
    const {item: Bank, ICAddress, optionKyc, BankAccount} = params || {};
    const BankName = get(Bank, 'BankName', 'Vietcombank');
    const Name = get(optionKyc, 'data.FullName', '');
    const type = get(optionKyc, 'data.ICType', '');
    const idNumber = get(optionKyc, 'data.CardNumber', '');
    const iclabel = getICLabel(type);
    const BankConnectInfo = {
      BankId: Bank?.BankId,
      BankAccount,
      FullName: Name,
      ICType: type,
      ICNumber:idNumber,
      ICFrontPhoto: '',
      ICBackPhoto: '',
      Province: ICAddress?.Province || optionKyc?.Province,
      District: ICAddress?.District || optionKyc?.Province,
      Ward: ICAddress?.Ward || optionKyc?.Province,
      Address: ICAddress?.Address || optionKyc?.Province,
    };
    alert(JSON.stringify(BankConnectInfo));
    try {
      const res = await onActiveUser?.({BankConnectInfo});
      console.log({...params, ...res, bankConnectInfo: BankConnectInfo});
      Navigator?.push(SCREEN.MAP_BANK_FLOW, {
        screen: MapBankRoutes.BankLinkOTP,
        params: {...params, ...res, bankConnectInfo: BankConnectInfo},
      });
    } catch (e) {}
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

  const renderContent = () => {
    const {Bank, ICAddress, optionKyc, BankAccount} = params || {};
    const BankName = get(Bank, 'BankName', 'Vietcombank');
    const Name = get(optionKyc, 'data.FullName', '');
    const type = get(optionKyc, 'data.ICType', '');
    const idNumber = get(optionKyc, 'data.CardNumber', '');
    const iclabel = getICLabel(type);

    const address = getFullAddress(ICAddress);

    const data = [
      {
        label: 'Ngân hàng',
        value: BankName,
      },
      {
        label: 'Số thẻ',
        value: BankAccount,
      },
      {
        label: 'Họ tên',
        value: Name,
      },
      {
        label: 'Loại GTTT',
        value: iclabel,
      },
      {
        label: 'Số ID',
        value: idNumber,
      },
      {
        label: 'Địa chỉ liên hệ',
        value: address,
      },
    ];
    return (
      <View style={base.container} flex={1}>
        <View style={styles.block}>
          <Image
            source={require('images/bgXacNhan.png')}
            style={styles.bgImg}
          />
          {data.map((item, index) => {
            return (
              <View key={index}>
                <View style={[styles.row, ,]}>
                  <Text fs={'h6'} style={styles.textLeft}>
                    {item.label}
                  </Text>

                  <Text fs={'h6'} bold style={styles.textRight}>
                    {item.value}
                  </Text>
                </View>
                {index + 1 < data.length && (
                  <Image
                    source={require('./images/dash_line-2.png')}
                    style={{width: '100%', height: 1}}
                  />
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderTnC = () => {
    return (
      <Text fs={'md'} color={Colors.tp3}>
        Khi nhấn Liên Kết, Quý khách đã xác nhận đồng ý với Thỏa thuận người sử
        dụng của EPAY và Vietcombank
      </Text>
    );
  };
  return (
    <View flex={1} backgroundColor={Colors.bs4}>
      <HeaderBg>
        <Header back title={'Xác nhận liên kết'} />
      </HeaderBg>

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View alignItems="center" marginBottom={16}>
          <Image
            source={Images.ConnectBank.BankLink}
            style={{
              width: 64,
              height: 64,
              resizeMode: 'contain',
              marginVertical: 16,
            }}
          />
          <Text fs={'h4'} bold>
            {translation.connect_bank}
          </Text>
        </View>

        {renderContent()}
        {renderTnC()}
      </ScrollView>
      {renderButton()}
    </View>
  );
}
const styles = StyleSheet.create({
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
  block: {
    marginBottom: 20,
    position: 'relative',
    minHeight: 128,
  },

  bgImg: {
    width: 128,
    height: 128,
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: [{translateX: scale(-64)}, {translateY: 0}],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.bs1,
    // borderBottomWidth: 1,
    paddingVertical: 15,
  },

  textLeft: {
    color: Colors.cl3,
  },
  textRight: {
    color: Colors.tp2,
    maxWidth: scale(160),
  },
});
