import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN} from 'configs/Constants';
import {verifyEmail} from 'services/user';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import _ from 'lodash';
import {useUser} from '..';

const useEmail = () => {
  const {setLoading} = useLoading();
  const {phone} = useUser();
  const {setError} = useError();

  const onEmailAuth = async ({email}) => {
    setLoading(true);
    const result = await verifyEmail({phone, email});
    setLoading(false);
    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
    alert('Gửi thành công. Đang làm tiếp');
  };

  return {onEmailAuth};
};

export default useEmail;
