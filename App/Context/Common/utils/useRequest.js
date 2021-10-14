import {request} from 'utils/Request';
import {useError} from 'context/Common/utils';
const useRequest = () => {
  const {setError} = useError();
  const handleError = error => {
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
    // if (error?.message == 'Request failed with status code 401')
    //   return setError({
    //     ErrorMessage:
    //       'Tài khoản đã được đăng nhập ở một thiết bị khác hoặc phiên đăng nhập hết hạn!',
    //   });
  };
  const doRequest = async ({url, method = 'post', params, success}) => {
    await request({
      url,
      method,
      params,
      success,
      failure: error => handleError(error),
    });
  };
  return {doRequest};
};
export default useRequest;
