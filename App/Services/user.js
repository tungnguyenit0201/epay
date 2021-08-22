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
}

export const getPersonalInfo = async ({phone}) => {
  let response = null;
  await request({
    url: API.USER.GET_PERSONAL_INFO,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getAllInfoUser = async ({phone}) => {
  let response = null;
  await request({
    url: API.USER.GET_ALL_INFO,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const updateUserAddress = async ({phone, Address, Ward, County, Provincial}) => {
  let response = null;
  await request({
    url: API.USER.UPDATE_USER_ADDRESS,
    method: 'post',
    params: {PhoneNumber: phone, AddressInfo: {
      Address, Ward, County, Provincial
    }},
    success: res => {
      response = res;
      console.log("resssssssssssssssssssss", res)
    },
  });
  return response;
};
