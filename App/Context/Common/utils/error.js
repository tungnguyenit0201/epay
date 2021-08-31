import {useCommon} from 'context/Common';
import {useTranslation} from 'context/Language';
import _ from 'lodash';
import {useCallback} from 'react';

const useError = () => {
  const {dispatch} = useCommon();
  const translation = useTranslation();
  const setError = useCallback(error => {
    // let message = translation.errorCode[error?.ErrorCode];
    dispatch({
      type: 'SET_ERROR',
      error: {
        errorCode: error?.ErrorCode,
        errorMessage: error?.ErrorMessage,
        title: error?.title,
      },
    });
  }, []); //eslint-disable-line
  return {setError};
};

export default useError;
