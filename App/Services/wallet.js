import {API} from 'configs';
import {request} from 'utils/Request';

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
