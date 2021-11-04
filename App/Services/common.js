import {request} from 'utils/Request';
import {API} from 'configs';
import OTP_TYPE from 'configs/Enums/OTPType';
import {useRequest} from 'context/Common/utils';
const useServiceCommon = () => {
  const {doRequest} = useRequest();

  const genOtp = async ({phone, functionType, errorAction}) => {
    let response = null;
    await doRequest({
      url: API.COMMON.GEN_OTP,
      method: 'post',
      params: {PhoneNumber: phone, FunctionType: functionType},
      // params: {FunctionType: functionType},
      success: res => {
        response = res;
      },
      errorAction,
    });
    return response;
  };

  const confirmOTP = async ({
    phone,
    functionType,
    OtpCode,
    OtpType = OTP_TYPE.EPAY,
    errorAction,
  }) => {
    let response = null;
    await doRequest({
      url: API.COMMON.CONFIRM_OTP,
      method: 'post',
      params: {
        PhoneNumber: phone,
        FunctionType: functionType,
        OtpCode,
        OtpType,
      },
      success: res => {
        response = res;
      },
      errorAction,
    });
    return response;
  };

  const checkSmartOTP = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.COMMON.CHECK_SMART_OTP,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getSmartOTPInfo = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.COMMON.GET_SMART_OTP_INFO,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const activateSmartOTP = async ({phone, password, active = true}) => {
    let response = null;
    await doRequest({
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

  const checkSmartOTPKey = async ({phone, password}) => {
    let response = null;
    await doRequest({
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

  const changeSmartOTPPassword = async ({phone, oldPassword, newPassword}) => {
    let response = null;
    await doRequest({
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

  const syncSmartOTP = async ({phone, password}) => {
    let response = null;
    await doRequest({
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

  const getConfigInfo = async () => {
    let response = null;
    await doRequest({
      url: API.COMMON.GET_CONFIG_INFO,
      method: 'post',
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getTerm = async ({phone, type}) => {
    let response = null;
    await doRequest({
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

  const getBanner = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.COMMON.GET_BANNER,
      method: 'post',
      params: {
        PhoneNumber: phone,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };
  return {
    genOtp,
    confirmOTP,
    checkSmartOTP,
    getSmartOTPInfo,
    activateSmartOTP,
    checkSmartOTPKey,
    changeSmartOTPPassword,
    syncSmartOTP,
    getConfigInfo,
    getTerm,
    getBanner,
  };
};
export default useServiceCommon;
