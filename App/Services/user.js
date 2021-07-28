import {request} from 'utils/Request';
import {API} from 'configs';
import {Alert} from 'react-native';
import {useQuery} from 'react-query';

const {USER} = API;

export const getProfile = async ({userId}) => {
  let response = [];
  await request({
    url: USER.GET_PROFILE.replace('<userId>', 1),
    isWooApi: true,
    success: res => {
      response = res;
    },
    failure: res => {
      if (res) console.log('Some thing went wrong', res?.message);
    },
  });
  return response;
};
export const useUserQuery = slug => {
  return useQuery('getProfile', getProfile);
};
