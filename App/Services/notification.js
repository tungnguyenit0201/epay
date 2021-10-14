import {request} from 'utils/Request';
import {API} from 'configs';
import {useRequest} from 'context/Common/utils';

const useSErviceNotificaiton = () => {
  const {doRequest} = useRequest();

  const getChargesNotify = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.NOTIFY.CHARGES_NOTIFY,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getPromotionNotify = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.NOTIFY.PROMOTION_NOTIFY,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getOtherNotify = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.NOTIFY.OTHER_NOTIFY,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getAllNofify = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.NOTIFY.GET_NOTIFY,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const readNotify = async ({phone, notifyID}) => {
    let response = null;
    await doRequest({
      url: API.NOTIFY.READ_NOTIFY,
      method: 'post',
      params: {PhoneNumber: phone, NotifyId: notifyID},
      success: res => {
        response = res;
      },
    });
    return response;
  };
  return {
    getChargesNotify,
    getPromotionNotify,
    getOtherNotify,
    getAllNofify,
    readNotify,
  };
};
export default useSErviceNotificaiton;
// export const getChargesNotify = async ({phone}) => {
//   let response = null;
//   await request({
//     url: API.NOTIFY.CHARGES_NOTIFY,
//     method: 'post',
//     params: {PhoneNumber: phone},
//     success: res => {
//       response = res;
//     },
//   });
//   return response;
// };

// export const getPromotionNotify = async ({phone}) => {
//   let response = null;
//   await request({
//     url: API.NOTIFY.PROMOTION_NOTIFY,
//     method: 'post',
//     params: {PhoneNumber: phone},
//     success: res => {
//       response = res;
//     },
//   });
//   return response;
// };

// export const getOtherNotify = async ({phone}) => {
//   let response = null;
//   await request({
//     url: API.NOTIFY.OTHER_NOTIFY,
//     method: 'post',
//     params: {PhoneNumber: phone},
//     success: res => {
//       response = res;
//     },
//   });
//   return response;
// };

// export const getAllNofify = async ({phone}) => {
//   let response = null;
//   await request({
//     url: API.NOTIFY.GET_NOTIFY,
//     method: 'post',
//     params: {PhoneNumber: phone},
//     success: res => {
//       response = res;
//     },
//   });
//   return response;
// };

// export const readNotify = async ({phone, notifyID}) => {
//   let response = null;
//   await request({
//     url: API.NOTIFY.READ_NOTIFY,
//     method: 'post',
//     params: {PhoneNumber: phone, NotifyId: notifyID},
//     success: res => {
//       response = res;
//     },
//   });
//   return response;
// };
