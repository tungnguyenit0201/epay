import {ERROR_CODE, SCREEN} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {useTranslation} from 'context/Language';
import {useUser} from 'context/User';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {useCallback} from 'react';
import {setDefaultHeaders} from 'utils/Axios';
import useAsyncStorage from './asyncStorage';

const useError = () => {
  const {dispatch} = useCommon();
  const translation = useTranslation();
  const {dispatch: dispatchUser} = useUser();
  const {setToken} = useAsyncStorage();

  const setError = useCallback(
    error => {
      // let message = translation.errorCode[error?.ErrorCode];
      dispatch({
        type: 'SET_ERROR',
        error: {
          errorCode: error?.ErrorCode,
          errorMessage: error?.ErrorMessage,
          title: error?.title,
          onClose: error?.onClose,
        },
      });
    },
    [dispatch],
  );

  const checkDifferentDevice = error => {
    if (error?.ErrorCode === ERROR_CODE.NEW_DEVICE_CONFIRM_REQUIRED) {
      setError(error);
      onLogout();
    } else {
      __DEV__ && console.error(error);
    }
  };

  const onLogout = async () => {
    dispatchUser({type: 'UPDATE_TOKEN', data: ''});
    setDefaultHeaders({
      Authorization: ``,
    });
    await setToken('');
    Navigator.navigate(SCREEN.AUTH);
  };

  return {setError, checkDifferentDevice};
};

export default useError;
