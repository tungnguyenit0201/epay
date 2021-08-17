import {request} from 'utils/Request';
import {API} from 'configs';

export const genOtp = async ({phone, functionType}) => {
  let response = null;
  await request({
    url: API.AUTH.GEN_OTP,
    method: 'post',
    params: {PhoneNumber: phone, FunctionType: functionType},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const confrimOTP = async ({
  phone,
  functionType,
  OtpCode,
  OtpType = 0,
}) => {
  let response = null;
  await request({
    url: API.COMMON.CONFIRM_OTP,
    method: 'post',
    params: {PhoneNumber: phone, FunctionType: functionType},
    success: res => {
      response = res;
    },
  });
  return response;
};
