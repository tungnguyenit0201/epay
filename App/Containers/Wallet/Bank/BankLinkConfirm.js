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
import {base, Colors, Fonts, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import SelectBank from 'components/QRPay/SelectBank';

export default function (props) {
  const translation = useTranslation();
  const {params} = useRoute() || {};
  const {item} = params || {};

  //  const onSubmit = () => {
  //    const isValid = validateInfo?.();
  //    //todo: call api connect
  //    if (isValid) {
  //        props?.navigation?.push(SCREEN.MAP_BANK_FLOW, {
  //          screen: MapBankRoutes.BankLinkKYCInfo,
  //          params: {kycInfo, bank, bankAccount},
  //        });
  //      } else {
  //        //open KYC flow
  //      }
  //    }
  //  };
  // ;

  const onSubmit = () => {
    props?.navigation?.push(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BankLinkOTP,
      // params: {kycInfo, bank, bankAccount},
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
    const data = [
      {
        label: 'Chuyển đến ',
        value: 'NGUYEN VAN B ',
      },
      {
        label: 'Số điện thoại ',
        value: '0909000999 ',
      },
      {
        label: 'Nội dung ',
        value: 'FROM AN ',
      },
      {
        label: 'Phí giao dịch',
        value: 'Miễn phí',
      },
      {
        label: 'Người chịu phí ',
        value: 'Người gửi ',
      },
      {
        label: 'Thực chuyển ',
        value: '1.000.000 vnd',
      },
      {
        label: 'Tổng số tiền',
        value: <Text bold>1.005.000 vnđ</Text>,
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
                <View
                  style={[
                    styles.row,
                    index + 1 === data.length && {
                      borderBottomWidth: 0,
                    },
                  ]}>
                  <Text style={styles.textLeft}>{item.label}</Text>

                  <Text style={styles.textRight}>{item.value}</Text>
                </View>
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
        <Header back title={translation.connect_bank} />
      </HeaderBg>

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
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
