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
export const updatePersonalInfo = async ({phone, personalInfo}) => {
  let response = null;
  await request({
    url: API.USER.UPDATE_PERSONAL_INFO,
    method: 'post',
    params: {PhoneNumber: phone, PersonalInfo: personalInfo},
    success: res => {
      response = res;
    },
  });
  return response;
};
