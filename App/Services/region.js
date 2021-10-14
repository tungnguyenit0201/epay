import {API} from 'configs';
import {request} from 'utils/Request';
import {useRequest} from 'context/Common/utils';

const useServiceRegion = () => {
  const {doRequest} = useRequest();
  const getProvince = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.ADDRESS.GET_PROVINCE,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getDistrict = async ({phone, ProvinceID}) => {
    let response = null;
    await doRequest({
      url: API.ADDRESS.GET_DISTRICT,
      method: 'post',
      params: {PhoneNumber: phone, ProvinceID},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getWard = async ({DistrictID, phone}) => {
    let response = null;
    await doRequest({
      url: API.ADDRESS.GET_WARD,
      method: 'post',
      params: {DistrictID, PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };
  return {getProvince, getDistrict, getWard};
};
export default useServiceRegion;

// export const getProvince = async ({phone}) => {
//   let response = null;
//   await request({
//     url: API.ADDRESS.GET_PROVINCE,
//     method: 'post',
//     params: {PhoneNumber: phone},
//     success: res => {
//       response = res;
//     },
//   });
//   return response;
// };

// export const getDistrict = async ({phone, ProvinceID}) => {
//   let response = null;
//   await request({
//     url: API.ADDRESS.GET_DISTRICT,
//     method: 'post',
//     params: {PhoneNumber: phone, ProvinceID},
//     success: res => {
//       response = res;
//     },
//   });
//   return response;
// };

// export const getWard = async ({DistrictID, phone}) => {
//   let response = null;
//   await request({
//     url: API.ADDRESS.GET_WARD,
//     method: 'post',
//     params: {DistrictID, PhoneNumber: phone},
//     success: res => {
//       response = res;
//     },
//   });
//   return response;
// };
