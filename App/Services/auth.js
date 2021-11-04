import {request} from 'utils/Request';
import {API} from 'configs';
import {useRequest} from 'context/Common/utils';

const useServiceAuth = () => {
  const {doRequest} = useRequest();

  const checkPhone = async phone => {
    let response = null;
    await doRequest({
      url: API.AUTH.CHECK_PHONE,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const login = async (phone, password, PushToken) => {
    let response = null;
    await doRequest({
      url: API.AUTH.LOGIN,
      method: 'post',
      params: {PhoneNumber: phone, Password: password, PushToken},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const register = async ({phone, password, errorAction}) => {
    let response = null;
    await doRequest({
      url: API.AUTH.REGISTER,
      method: 'post',
      params: {PhoneNumber: phone, Password: password},
      success: res => {
        response = res;
      },
      errorAction,
    });
    return response;
  };

  const checkICInfo = async ({phone, IcNumber, IcDate, BankNumber}) => {
    let response = null;
    await doRequest({
      url: API.AUTH.CHECK_IC_INFO,
      method: 'post',
      params: {
        PhoneNumber: phone,
        IcNumber,
        IcDate,
        ...(BankNumber ? {BankNumber} : {}),
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  return {checkPhone, login, register, checkICInfo};
};
export default useServiceAuth;
