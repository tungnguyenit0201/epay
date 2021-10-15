import {request} from 'utils/Request';
import {useError} from 'context/Common/utils';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {Alert} from 'react-native';
import {useCommon} from 'context/Common';
const useRequest = () => {
  const {setError} = useError();
  const {error: errorContext} = useCommon();
  const handleError = (error, failure) => {
    if (typeof failure == 'function') return failure(error);
    if (error?.message == 'Network Error')
      return setError({
        ErrorMessage:
          'Mất kết nối hoặc đường truyền quá chậm. Quý khách vui lòng kiểm tra kết nối mạng hoặc thử lại sau ít phút',
        action: [
          {
            label: 'Đồng ý',
          },
        ],
      });
    if (error?.message?.search?.('401') != -1)
      setError({
        ErrorMessage:
          'Tài khoản đã được đăng nhập ở một thiết bị khác hoặc phiên đăng nhập hết hạn!',
        onClose: () => Navigator.reset(SCREEN.AUTH),
      });
    return;
  };
  const doRequest = async ({
    url,
    method = 'post',
    params,
    success,
    failure,
  }) => {
    await request({
      url,
      method,
      params,
      success,
      failure: error => handleError(error, failure),
    });
  };
  return {doRequest};
};
export default useRequest;
