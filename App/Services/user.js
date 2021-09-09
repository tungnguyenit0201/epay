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

export const getAllInfo = async ({phone}) => {
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

export const updateUserAddress = async ({
  phone,
  Address,
  Ward,
  County,
  Provincial,
}) => {
  let response = null;
  await request({
    url: API.USER.UPDATE_USER_ADDRESS,
    method: 'post',
    params: {
      PhoneNumber: phone,
      AddressInfo: {
        Address,
        Ward,
        County,
        Provincial,
        Country: 'VIET NAM',
      },
    },
    success: res => {
      response = res;
    },
  });
  return response;
};

export const updateIdentify = async ({phone, ICInfor}) => {
  let response = null;
  await request({
    url: API.USER.UPDATE_IDENTIFY,
    method: 'post',
    params: {PhoneNumber: phone, ICInfor},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getConnectedBank = async ({phone}) => {
  let response = null;
  await request({
    url: API.USER.GET_CONNECTED_BANK,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const confirmPassword = async ({phone, password}) => {
  let response = null;
  await request({
    url: API.USER.CONFIRM_PASSWORD,
    method: 'post',
    params: {PhoneNumber: phone, Password: password},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getLimit = async ({phone}) => {
  let response = null;
  await request({
    url: API.USER.GET_LIMIT,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getSettingsInfo = async ({phone}) => {
  let response = null;
  await request({
    url: API.USER.GET_SETTINGS_INFO,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getQRCode = async ({phone}) => {
  let response = null;
  await request({
    url: API.USER.GET_QRCODE,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const updateAvatar = async ({phone, AvatarPhoto}) => {
  let response = null;
  await request({
    url: API.USER.UPDATE_AVATAR,
    method: 'post',
    params: {PhoneNumber: phone, AvatarPhoto},
    success: res => {
      response = res;
    },
  });
  return response;
};
