import {Header} from 'components';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
const History = () => {
  return (
    <View>
      <Header back title="Lịch sử" avoidStatusBar blackIcon />
      <Pressable onPress={() => Navigator.navigate(SCREEN.DETAIL_HISTORY)}>
        <Text>Chi tiết</Text>
      </Pressable>
    </View>
  );
};

export default History;

/*
import {Header} from 'components';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Navigator from 'navigations/Navigator';
import {SCREEN, TRANS_TYPE} from 'configs/Constants';
// import {useTranslation} from 'context/Language';
// import {useHistory} from 'context/Wallet/utils';

const filterData = {
  service: [
    {value: 0, label: 'all'},
    {value: TRANS_TYPE.CashIn, label: 'top_up'},
    {value: TRANS_TYPE.CashOut, label: 'withdraw'},
    {
      value: TRANS_TYPE.CashTransfer,
      label: 'transfer',
    },
    {
      value: TRANS_TYPE.AutoCashIn,
      label: 'automatically_top_up',
    },
    {
      value: TRANS_TYPE.CashReceive,
      label: 'receive',
    },
    {
      value: `${TRANS_TYPE.PaymentToll},${TRANS_TYPE.PaymentMerchant}`,
      label: 'bill_pay',
    },
  ],
  status: [
    {
      value: 0,
      label: 'all',
    },
    {
      value: 1,
      label: 'successful',
    },
    {
      value: 3,
      label: 'processing',
    },
    {
      value: 2,
      label: 'failed',
    },
  ],
};

const History = () => {
  // const translation = useTranslation();
  // const {historyData, onFilter, onSearch, onDetail} = useHistory();

  return (
    <View>
      <Header
        back
        // title={translation.transaction_history}
        avoidStatusBar
        blackIcon
      />
      <Pressable onPress={() => Navigator.navigate(SCREEN.DETAIL_HISTORY)}>
        <Text>Chi tiết</Text>
      </Pressable>
    </View>
  );
};

export default History;
*/
