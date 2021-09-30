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

import {ERROR_CODE, SCREEN, FUNCTION_TYPE, IC_TPYE} from 'configs/Constants';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'context/Language';
import {base, Colors, Fonts, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import {get} from 'lodash';
import {IC_TYPE_CHAR} from 'configs/Enums/ICType';
import {getFullAddress} from 'context/Wallet/utils/bankInfo';
import {useBankInfo} from 'context/Wallet/utils';

export default function (props) {
  const translation = useTranslation();
  const {params} = useRoute() || {};
  const {onActiveUser} = useBankInfo(params);

  const onSubmit = async () => {
    const {item:Bank, ICAddress, optionKyc, BankAccount} = params || {};
    const BankConnectInfo = {
      BankID:  Bank?.BankId,
      BankAccount,
      FullName: optionKyc?.Name,
      ICType: optionKyc?.Type,
      ICNumber: optionKyc?.Number,
      ICFrontPhoto: optionKyc?.Number,
      ICBackPhoto: optionKyc?.Number,
      Province: ICAddress?.Province || optionKyc?.Province,
      District: ICAddress?.Province || optionKyc?.Province,
      Ward: ICAddress?.Province || optionKyc?.Province,
      Address: ICAddress?.Province || optionKyc?.Province,
    };
    try {
      const res = await onActiveUser?.({BankConnectInfo});
      // alert(res);
    } catch (e) {}

    props?.navigation?.push(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BankLinkOTP,
    });
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

  const renderContent = () => {
    const cardList = {
      [IC_TYPE_CHAR.CMND]: translation?.id_card,
      [IC_TYPE_CHAR.CMNDQD]: translation?.militaryID,
      [IC_TYPE_CHAR.PASSPORT]: translation?.passport,
    };

    const {Bank, ICAddress, optionKyc, BankAccount} = params || {};
    const BankName = get(Bank, 'BankName', 'Vietcombank');
    const Name = get(optionKyc, 'Name', '');
    const type = get(optionKyc, 'Type', '');
    const idNumber = get(optionKyc, 'Number', '');
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
        value: cardList[type],
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
      <View style={base.container}>
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
  return (
    <View flex={1} backgroundColor={Colors.WHITETEXT}>
      <HeaderBg>
        <Header back title={'Xác nhận liên kết'} />
      </HeaderBg>

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View alignItems="center">
          <Text fs={'h4'} bold>
            {translation.connect_bank}
          </Text>
        </View>

        {renderContent()}
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
    borderBottomColor: Colors.l3,
    // borderBottomWidth: 1,
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
