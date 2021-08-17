import {request} from 'utils/Request';
import {API} from 'configs';

export const getConfigInfo = async () => {
  let response = null;
  await request({
    url: API.AUTH.GET_CONFIG_INFO,
    method: 'post',
    success: res => {
      response = res;
    },
  });
  return response;
};

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
