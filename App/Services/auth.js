import {request} from 'utils/Request';
import {API} from 'configs';
import {Alert} from 'react-native';
import {useQuery} from 'react-query';

export const getConfigInfo = async () => {
  let response = {};
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
  let response = [];
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
