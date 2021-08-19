import {API} from 'configs';
import {request} from 'utils/Request';

export const updatePassword = async ({phone, password}) => {
  let response = null;
  await request({
    url: API.USER.UPDATE_PASSWORD,
    method: 'post',
    params: {PhoneNumber: phone, NewPassword: password},
    success: res => {
      response = res;
    },
  });
  return response;
};
