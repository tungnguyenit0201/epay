import Images from 'themes/Images';
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
    // {value: 0, label: 'all'},
    {
      value: TRANS_TYPE.CashTransfer,
      label: 'transfer',
      icon: Images.TransactionHistory.CardReceive,
    },
    {
      value: TRANS_TYPE.CashReceive,
      label: 'receive',
      icon: Images.TransactionHistory.CardSend,
    },
    {
      value: TRANS_TYPE.CashIn,
      label: 'top_up',
      icon: Images.TransactionHistory.CardEdit,
    },
    // {
    //   value: TRANS_TYPE.CashOut,
    //   label: 'withdraw',
    //   icon: Images.TransactionHistory.CardTick,
    // },
    {
      values: [TRANS_TYPE.PaymentToll, TRANS_TYPE.PaymentMerchant],
      value: `${TRANS_TYPE.PaymentToll},${TRANS_TYPE.PaymentMerchant}`,
      label: 'bill_pay',
      icon: Images.TransactionHistory.CardTick,
    },
    // {
    //   value: TRANS_TYPE.AutoCashIn,
    //   label: 'automatically_top_up',
    //   icon: Images.TransactionHistory.EmptyWalletChange,
    // },
  ],
  TYPE2: [
    {
      value: 10000,
      label: 'Giao thông',
      icon: Images.TransactionHistory.Car,
    },
    {
      value: 10001,
      icon: Images.TransactionHistory.ShieldTick,
      label: 'Bảo hiểm',
    },
    {
      value: 10002,
      icon: Images.TransactionHistory.Passport,
      label: 'Sân bay',
    },
    {
      value: 10003,
      icon: Images.TransactionHistory.Medic,
      label: 'Vaccine',
    },
    {
      value: 10004,
      icon: Images.TransactionHistory.Warning,
      label: 'Công an',
    },
    {
      value: 10005,
      icon: Images.TransactionHistory.Passport,
      label: 'Giao thông',
    },
  ],
  STATUS: [
    {value: 0, label: 'all'},
    {value: 1, label: 'successful'},
    {value: 3, label: 'processing'},
    {value: 2, label: 'failed'},
  ],
};

export default TRANS_DETAIL;
