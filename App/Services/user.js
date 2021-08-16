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

export const register = async ({phoneNumber}) => {
  return await request({
    path: USER.LOGIN,
    data: {phoneNumber},
    success: res => {
      console.log(res);
    },
  });
};
