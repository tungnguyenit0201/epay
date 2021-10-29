import {request} from 'utils/Request';
import {useError} from 'context/Common/utils';
import Navigator from 'navigations/Navigator';
import {ASYNC_STORAGE_KEY, SCREEN} from 'configs/Constants';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from 'configs/API';
import {setDefaultHeaders} from 'utils/Axios';
import RNRestart from 'react-native-restart';

let baseUrl = null;

(async () => {
  baseUrl =
    (await AsyncStorage.getItem(ASYNC_STORAGE_KEY.COMMON.DOMAIN)) || API.ROOT;
})();

const useRequest = () => {
  const {setError} = useError();

  const handleError = (error, failure) => {
    if (typeof failure == 'function') return failure(error);
    if (
      error?.message == 'Network Error' ||
      error?.message?.search('timeout') != -1 ||
      error?.message?.search('502') != -1 ||
      error?.message == 'Request failed with status code 503'
    ) {
      return setError({
        ErrorMessage:
          'Mất kết nối hoặc đường truyền quá chậm. Quý khách vui lòng kiểm tra kết nối mạng hoặc thử lại sau ít phút',
      });
    }

    if (error?.message?.search?.('401') != -1)
      return setError({
        ErrorMessage:
          'Tài khoản đã được đăng nhập ở một thiết bị khác hoặc phiên đăng nhập hết hạn!',
        onClose: onLogout,
      });
  };

  const doRequest = async ({
    url,
    method = 'post',
    params,
    success,
    failure,
  }) => {
    if (!baseUrl) {
      baseUrl =
        (await AsyncStorage.getItem(ASYNC_STORAGE_KEY.COMMON.DOMAIN)) ||
        API.ROOT;
    }
    await request({
      baseUrl,
      url,
      method,
      params,
      success,
      failure: error => handleError(error, failure),
    });
  };

  const onChangeDomain = async value => {
    baseUrl = value;
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY.COMMON.DOMAIN, value);
    onLogout();
  };

  const onLogout = () => {
    setDefaultHeaders({
      Authorization: ``,
    });
    RNRestart.Restart();
  };

  return {doRequest, domain: baseUrl, onChangeDomain};
};
export default useRequest;
