import {request} from 'utils/Request';
import {API} from 'configs';
import OTP_TYPE from 'configs/Enums/OTPType';

export const genOtp = async ({phone, functionType}) => {
  let response = null;
  await request({
    url: API.COMMON.GEN_OTP,
    method: 'post',
    // params: {PhoneNumber: phone, FunctionType: functionType},
    params: {FunctionType: functionType},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const confirmOTP = async ({
  phone,
  functionType,
  OtpCode,
  OtpType = OTP_TYPE.EPAY,
}) => {
  let response = null;
  await request({
    url: API.COMMON.CONFIRM_OTP,
    method: 'post',
    params: {PhoneNumber: phone, FunctionType: functionType, OtpCode, OtpType},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const checkSmartOTP = async ({phone}) => {
  let response = null;
  await request({
    url: API.COMMON.CHECK_SMART_OTP,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const activateSmartOTP = async ({phone, password, active = true}) => {
  let response = null;
  await request({
    url: API.COMMON.ACTIVATE_SMART_OTP,
    method: 'post',
    params: {
      PhoneNumber: phone,
      SmtOtpPassword: password,
      Active: active ? 1 : 0,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const checkSmartOTPKey = async ({phone, password}) => {
  let response = null;
  await request({
    url: API.COMMON.CHECK_SMART_OTP_KEY,
    method: 'post',
    params: {
      PhoneNumber: phone,
      SmtOtpPassword: password,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const changeSmartOTPPassword = async ({
  phone,
  oldPassword,
  newPassword,
}) => {
  let response = null;
  await request({
    url: API.COMMON.CHANGE_SMART_OTP_PASSWORD,
    method: 'post',
    params: {
      PhoneNumber: phone,
      OlSmtOtpPassword: oldPassword,
      NewSmtOtpPassword: newPassword,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const syncSmartOTP = async ({phone, password}) => {
  let response = null;
  await request({
    url: API.COMMON.SYNC_SMART_OTP,
    method: 'post',
    params: {
      PhoneNumber: phone,
      SmtOtpPassword: password,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getConfigInfo = async () => {
  let response = null;
  await request({
    url: API.COMMON.GET_CONFIG_INFO,
    method: 'post',
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getTerm = async ({phone, type}) => {
  let response = null;
  await request({
    url: API.COMMON.GET_TERMS,
    method: 'post',
    params: {
      PhoneNumber: phone,
      TermsOfServiceType: type,
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getBanner = async () => {
  let response = null;
  await request({
    url: API.COMMON.GET_BANNER,
    method: 'post',
    success: res => {
      response = res;
    },
  });
  return response;
};
