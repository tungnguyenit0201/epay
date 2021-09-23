import {request} from 'utils/Request';
import {API} from 'configs';

export const getChargesNotify = async ({phone}) => {
  let response = null;
  await request({
    url: API.NOTIFY.CHARGES_NOTIFY,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getPromotionNotify = async ({phone}) => {
  let response = null;
  await request({
    url: API.NOTIFY.PROMOTION_NOTIFY,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const getOtherNotify = async ({phone}) => {
  let response = null;
  await request({
    url: API.NOTIFY.OTHER_NOTIFY,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};

export const readNotify = async ({phone, id}) => {
  let response = null;
  await request({
    url: API.NOTIFY.OTHER_NOTIFY,
    method: 'post',
    params: {PhoneNumber: phone},
    success: res => {
      response = res;
    },
  });
  return response;
};
