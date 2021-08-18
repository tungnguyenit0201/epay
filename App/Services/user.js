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
