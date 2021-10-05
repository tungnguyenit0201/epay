import {API} from 'configs';
import {request} from 'utils/Request';

export const mapBankNapas = async param => {
  const {phone, BankConnectInfo} = param || {};
  let response = null;
  await request({
    url: API.WALLET.ACTIVE_USER,
    method: 'post',
    params: {
      BankConnectInfo: BankConnectInfo || {},
      PhoneNumber: phone,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const activeUser = async param => {
  const {phone, BankConnectInfo} = param || {};
  let response = null;
  await request({
    url: API.WALLET.ACTIVE_USER,
    method: 'post',
    params: {
      MsgType: 'active_customer',
      BankConnectInfo: BankConnectInfo || {},
      PhoneNumber: phone,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const activeCustomerOtp = async param => {
  const {phone, TransState, otp} = param || {};
  let response = null;
  await request({
    url: API.WALLET.ACTIVE_USER_OTP,
    method: 'post',
    params: {
      PhoneNumber: phone,
      MsgType: 'link_card',
      ...param,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getConnectedBank = async ({phone}) => {
  let response = null;
  await request({
    url: API.USER.GET_CONNECTED_BANK,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getDomesticBank = async ({phone}) => {
  let response = null;
  await request({
    url: API.WALLET.GET_DOMESTIC_BANKS,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};
export const getNapasBank = async ({phone}) => {
  let response = null;
  await request({
    url: API.WALLET.GET_NAPAS_BANKS,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getInternationalBank = async ({phone}) => {
  let response = null;
  await request({
    url: API.WALLET.GET_INTERNATIONAL_BANKS,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getConnectedBankDetail = async ({phone, bankID}) => {
  let response = null;
  await request({
    url: API.WALLET.GET_CONNECTED_BANK_DETAIL,
    method: 'post',
    params: {PhoneNumber: phone, BankConnectId: bankID},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const changeLimit = async ({phone, amountLimit}) => {
  let response = null;
  await request({
    url: API.WALLET.CHANGE_LIMIT,
    method: 'post',
    params: {PhoneNumber: phone, AmountLimit: amountLimit},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getBankFee = async ({phone, bankID, transType, transFormType}) => {
  let response = null;
  await request({
    url: API.WALLET.FEE_CALCULATOR,
    method: 'post',
    params: {
      PhoneNumber: phone,
      BankId: bankID,
      TransType: transType,
      TransFormType: transFormType,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const payinConnectedBank = async ({
  phone,
  bankID,
  amount,
  fixedFee,
  bankFee,
}) => {
  let response = null;
  await request({
    url: API.WALLET.PAYIN_CONNECTED_BANK,
    method: 'post',
    params: {
      PhoneNumber: phone,
      BankId: bankID,
      Amount: amount,
      FixedFee: fixedFee,
      BankFee: bankFee,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getWalletInfo = async ({phone}) => {
  let response = null;
  await request({
    url: API.WALLET.GET_WALLET_INFO,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getHistory = async ({
  phone,
  ServiceId = 0,
  StateId = 0,
  StartDate,
  EndDate,
  CodeFilter = '',
}) => {
  let response = null;
  await request({
    url: API.WALLET.GET_HISTORY,
    method: 'post',
    params: {
      PhoneNumber: phone,
      ServiceId,
      StateId,
      StartDate,
      EndDate,
      CodeFilter,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getHistoryDetail = async ({phone, TransCode}) => {
  let response = null;
  await request({
    url: API.WALLET.GET_HISTORY_DETAIL,
    method: 'post',
    params: {
      PhoneNumber: phone,
      TransCode,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const cashOut = async ({phone, BankConnectId, BankId, amount}) => {
  let response = null;
  await request({
    url: API.WALLET.CASH_OUT,
    method: 'post',
    params: {
      PhoneNumber: phone,
      CashOutInfo: {
        BankConnectId: BankConnectId,
        BankID: BankId,
        Amount: amount,
      },
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const cashOutConfirm = async ({
  phone,
  BankConnectId,
  BankId,
  ConfirmValue,
  ConfirmMethod,
  TransCode,
}) => {
  let response = null;
  await request({
    url: API.WALLET.CASH_OUT_CONFIRM,
    method: 'post',
    params: {
      PhoneNumber: phone,
      BankConnectId,
      BankID: BankId,
      ConfirmMethod,
      ConfirmValue,
      TransCode,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const checkAmountLimit = async ({
  phone,
  amount,
  transType,
  transFormType,
}) => {
  let response = null;
  await request({
    url: API.WALLET.CHECK_AMOUNT_LIMIT,
    method: 'post',
    params: {
      PhoneNumber: phone,
      Amount: amount,
      TransType: transType,
      TransFormType: transFormType,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getQRCodeInfo = async ({phone, QrCode}) => {
  let response = null;
  await request({
    url: API.WALLET.GET_QRCODE_INFO,
    method: 'post',
    params: {
      PhoneNumber: phone,
      QrCode,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const cashIn = async ({phone, BankConnectId, BankId, amount}) => {
  let response = null;
  await request({
    url: API.WALLET.CASH_IN,
    method: 'post',
    params: {
      PhoneNumber: phone,
      CashInInfo: {
        BankConnectId: BankConnectId,
        BankID: BankId,
        Amount: amount,
      },
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const cashInConfirm = async ({
  phone,
  BankConnectId,
  BankId,
  ConfirmValue,
  ConfirmMethod,
  TransCode,
}) => {
  let response = null;
  await request({
    url: API.WALLET.CASH_IN_CONFIRM,
    method: 'post',
    params: {
      PhoneNumber: phone,
      BankConnectId,
      BankID: BankId,
      ConfirmMethod,
      ConfirmValue,
      TransCode,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const cashInNapas = async ({
  phone,
  Amount,
  BankId,
  CardNumber,
  CardHolder,
  CardIssueDate,
  CardConnectId,
  IsSaveCard,
  IsPayment,
  PaymentPartnerCode,
  BusinessType,
}) => {
  let response = null;
  await request({
    url: API.WALLET.CASH_IN_NAPAS,
    method: 'post',
    params: {
      PhoneNumber: phone,
      Amount,
      BankId,
      CardNumber,
      CardHolder,
      CardIssueDate,
      CardConnectId,
      IsSaveCard,
      IsPayment,
      PaymentPartnerCode,
      BusinessType,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const setDefaultBank = async ({
  BankConnectId,
  BankId,
  ConnectionType,
}) => {
  let response = null;
  await request({
    url: API.WALLET.DEFAULT_BANK_CONNECT,
    method: 'post',
    params: {
      BankConnectId,
      BankId,
      ConnectionType,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};
