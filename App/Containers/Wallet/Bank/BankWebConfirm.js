import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler, View, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import Navigator from 'navigations/Navigator';
import {useBankInfo} from 'context/Wallet/utils';

import {HeaderBg, Header, Text, InputBlock, Button} from 'components';
import {base, Colors, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
const samleUrl =
  'https://payment.momo.vn/service-napas-cashin-app-bank/napas/build_data_form?orderId=17160861262';
const BankWebConfirm = ({navigator}) => {
  const translation = useTranslation();
  const {params} = useRoute() || {};
  const {url = samleUrl, orderId, onBackOtp, onDoneOtp, isSaveToken} = params;
  console.log('urlurlurlurl', url);
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
      }
    }
  };

  return (
    <View flex={1} backgroundColor={Colors.WHITETEXT}>
      <HeaderBg>
        <Header back title={translation.connect_bank} />
      </HeaderBg>
      <WebView source={{uri: url}} onMessage={onMessage} />
    </View>
  );
};

export default React.memo(BankWebConfirm);
