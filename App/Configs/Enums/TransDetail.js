import TRANS_TYPE from './TransType';

const TRANS_DETAIL = {
  // SERVICE_KEY: {
  //   0: 'all',
  //   [TRANS_TYPE.CashIn]: 'top_up',
  //   [TRANS_TYPE.CashOut]: 'withdraw',
  //   [TRANS_TYPE.CashTransfer]: 'transfer',
  //   [TRANS_TYPE.AutoCashIn]: 'automatically_top_up',
  //   [TRANS_TYPE.CashReceive]: 'receive',
  //   [TRANS_TYPE.CashOut]: 'withdraw',
  // },
  SERVICE: [
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
      values: [TRANS_TYPE.PaymentToll, TRANS_TYPE.PaymentMerchant],
      value: `${TRANS_TYPE.PaymentToll},${TRANS_TYPE.PaymentMerchant}`,
      label: 'bill_pay',
    },
  ],
  STATUS: {
    0: 'all',
    1: 'successful',
    2: 'failed',
    3: 'processing',
  },
};

export default TRANS_DETAIL;
