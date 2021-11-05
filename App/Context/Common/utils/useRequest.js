import {request} from 'utils/Request';
import {useError, useLoading} from 'context/Common/utils';
import Navigator from 'navigations/Navigator';
import {ASYNC_STORAGE_KEY, ERROR_CODE, SCREEN} from 'configs/Constants';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from 'configs/API';
import {setDefaultHeaders} from 'utils/Axios';
import RNRestart from 'react-native-restart';
import useAsyncStorage from './asyncStorage';
import {useTranslation} from 'context/Language';

let baseUrl = null;

(async () => {
  baseUrl =
    (await AsyncStorage.getItem(ASYNC_STORAGE_KEY.COMMON.DOMAIN)) || API.ROOT;
})();
// TODO:translate
const useRequest = () => {
  const {setError} = useError();
  const {addName, setPhone} = useAsyncStorage();
  const {setLoading} = useLoading();
  const translation = useTranslation();
  const handleError = (error, failure, errorAction) => {
    setLoading(false);
    if (typeof failure == 'function') return failure(error);
    if (
      error?.message == 'Network Error' ||
      error?.message?.search('timeout') != -1 ||
      error?.message?.search('502') != -1 ||
      error?.message == 'Request failed with status code 503'
    ) {
      return setError({
        ErrorMessage: translation.network_error,
        onClose: () => (errorAction ? errorAction() : true),
      });
    }

    if (error?.message?.search?.('401') != -1)
      return setError({
        ErrorMessage:
          'Tài khoản đã được đăng nhập ở một thiết bị khác hoặc phiên đăng nhập hết hạn!',
        onClose: onLogout,
      });
  };

  const handleSuccess = (res, success, url) => {
    // xử lý các error chung ở đây
    // console.log(
    //   'url?.search(API.AUTH.LOGIN) === -1 :>> ',
    //   url?.search(API.AUTH.LOGIN) === -1,
    // );
    // if (
    //   res?.ErrorCode == ERROR_CODE.NEW_DEVICE_CONFIRM_REQUIRED &&
    //   url?.search(API.AUTH.LOGIN) === -1
    // ) {
    //   return setError({
    //     ...res,
    //     onClose: onLogout,
    //   });
    // }
    typeof success === 'function' && success(res);
  };

  const doRequest = async ({
    url,
    method = 'post',
    params,
    success,
    failure,
    errorAction,
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
      success: res => handleSuccess(res, success, url),
      failure: error => handleError(error, failure, errorAction),
    });
  };

  const onChangeDomain = async value => {
    baseUrl = value;
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY.COMMON.DOMAIN, value);
    onLogout();
  };

  const onLogout = async () => {
    setDefaultHeaders({
      Authorization: ``,
    });
    await addName('');
    await setPhone('');
    RNRestart.Restart();
  };

  return {doRequest, domain: baseUrl, onChangeDomain};
};
export default useRequest;
