import {request} from 'utils/Request';
import {API} from 'configs';

export const genOtp = async ({phone, functionType}) => {
  let response = null;
  await request({
    url: API.COMMON.GEN_OTP,
    method: 'post',
    params: {PhoneNumber: phone, FunctionType: functionType},
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
  OtpType = 0,
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
