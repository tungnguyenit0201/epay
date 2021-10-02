import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import Navigator from 'navigations/Navigator';
import {useBankInfo} from 'context/Wallet/utils';

import {Header, HeaderBg} from 'components';
import {Colors} from 'themes';
import {useTranslation} from 'context/Language';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import {SCREEN} from 'configs/Constants';

const samleUrl =
  'https://payment.momo.vn/service-napas-cashin-app-bank/napas/build_data_form?orderId=17160861262';
const BankWebConfirm = props => {
  const translation = useTranslation();
  const {params} = useRoute() || {};
  const {url = samleUrl, orderId, onBackOtp, onDoneOtp, isSaveToken} = params;
  const [shouldCancel, setShouldCancel] = useState(true);
  const {cancelTransaction} = useBankInfo();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (shouldCancel) {
          back();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      setTimeout(() => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
      }, 200);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigator]),
  );

  useEffect(() => {
    navigator?.setOptions?.({onPressLeftHeader: back});
  }, [navigator]);

  const back = () => {
    Navigator.showAlert({
      title: 'Huỷ giao dịch',
      message: 'Bạn có chắc chắn muốn huỷ giao dịch này?',
      positiveButton: {
        title: 'TIẾP TỤC',
        onPress: () => {
          return;
        },
      },
      negativeButton: {
        title: 'HỦY NGAY',
        onPress: () => {
          _cancelTransaction();
          onBackOtp?.();
        },
      },
    });
  };

  const _cancelTransaction = () => {
    if (shouldCancel) {
      cancelTransaction({orderId, options: {loading: false}})
        .then(() => {
          return;
        })
        .catch(error => {
          return;
        });
    }
  };

  const onMessage = useCallback((event = {}) => {
    const {data = ''} = event.nativeEvent || {};
    const transaction = JSON.parse(data) || {};
    const {tranId} = transaction;
    if (tranId) {
      setShouldCancel(false);
      doneOtp(transaction);
    }
  }, []);

  const doneOtp = transaction => {
    if (transaction) {
      onDoneOtp?.(transaction);
      let {error} = transaction;
      if (error === 0 && isSaveToken) {
        props?.navigation?.push(SCREEN.MAP_BANK_FLOW, {
          screen: MapBankRoutes.BaseResultScreen,
          params: {
            result: 'sucess',
          },
        });
      }
    }
  };

  const onGoBack = () => {
    //call API check transaction state and then navigate
    props?.navigation?.push(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BaseResultScreen,
      params: {},
    });
  };

  return (
    <View flex={1} backgroundColor={Colors.WHITETEXT}>
      <HeaderBg>
        <Header back title={translation.connect_bank} onPressBack={onGoBack} />
      </HeaderBg>
      <WebView source={{uri: url}} onMessage={onMessage} />
    </View>
  );
};

export default React.memo(BankWebConfirm);
