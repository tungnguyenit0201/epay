import {API} from 'configs';
import {useQuery} from 'react-query';
import {request} from 'utils/Request';

const {USER} = API;

export const login = async ({phoneNumber, password}) => {
  return await request({
    path: USER.LOGIN,
    data: {phoneNumber, password},
    success: res => {
      console.log(res);
    },
  });
};
export const getProfile = async ({userId}) => {
  let response = [];
  await request({
    url: USER.GET_PROFILE.replace('<userId>', 1),
    isWooApi: true,
    success: res => {
      response = res;
    },
    failure: res => {
      if (res) console.log('Some thing went wrong', res?.message);
    },
  });
  return response;
};

export const register = async ({phoneNumber}) => {
  return await request({
    path: USER.LOGIN,
    data: {phoneNumber},
    success: res => {
      console.log(res);
    },
  });
};
