import {API} from 'configs';
import {request} from 'utils/Request';

export const getProvince = async ({phone}) => {
  let response = null;
  await request({
    url: API.ADDRESS.GET_PROVINCE,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getDistrict = async ({phone, ProvinceID}) => {
  let response = null;
  await request({
    url: API.ADDRESS.GET_DISTRICT,
    method: 'post',
    params: {PhoneNumber: phone, ProvinceID},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getWard = async ({DistrictID, phone}) => {
  let response = null;
  await request({
    url: API.ADDRESS.GET_WARD,
    method: 'post',
    params: {DistrictID, PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};
