import {request} from 'utils/Request';
import {API} from 'configs';
import {useError} from 'context/Common/utils';

export const checkPhone = async phone => {
  let response = null;
  await request({
    url: API.AUTH.CHECK_PHONE,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const login = async (phone, password, PushToken) => {
  let response = null;
  await request({
    url: API.AUTH.LOGIN,
    method: 'post',
    params: {PhoneNumber: phone, Password: password, PushToken},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const register = async ({phone, password}) => {
  let response = null;
  await request({
    url: API.AUTH.REGISTER,
    method: 'post',
    params: {PhoneNumber: phone, Password: password},
    success: res => {
      response = res;
    },
  });
  return response;
};

const useServiceAuth = () => {
  const {checkDifferentDevice} = useError();

  const checkPhone = async ({phone}) => {
    let response = null;
    await request({
      url: API.AUTH.CHECK_PHONE,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
      failure: checkDifferentDevice,
    });
    return response;
  };

  const login = async ({phone, password, PushToken}) => {
    let response = null;
    await request({
      url: API.AUTH.LOGIN,
      method: 'post',
      params: {PhoneNumber: phone, Password: password, PushToken},
      success: res => {
        response = res;
      },
      failure: checkDifferentDevice,
    });
    return response;
  };

  const register = async ({phone, password}) => {
    let response = null;
    await request({
      url: API.AUTH.REGISTER,
      method: 'post',
      params: {PhoneNumber: phone, Password: password},
      success: res => {
        response = res;
      },
      failure: checkDifferentDevice,
    });
    return response;
  };

  return {checkPhone, login, register};
};

export default useServiceAuth;
