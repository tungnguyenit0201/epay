import {request} from 'utils/Request';
import {API} from 'configs';
import {Alert} from 'react-native';
import {useQuery} from 'react-query';

export const getConfigInfo = async () => {
  let response = [];
  await request({
    url: API.AUTH.GET_CONFIG_INFO,
    method: 'post',
    success: res => {
      response = res;
    },
    failure: res => {
      if (res) console.log('Some thing went wrong', res?.message);
    },
  });
  return response;
};

// export const useUserQuery = slug => {
//   return useQuery('getProfile', getProfile);
// };
