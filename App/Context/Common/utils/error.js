import {useCommon} from 'context/Common';
import _ from 'lodash';

const useError = () => {
  const {dispatch} = useCommon();
  const setError = error => {
    dispatch({
      type: 'SET_ERROR',
      error: {
        errorCode: error?.ErrorCode,
        errorMessage: error?.ErrorMessage, //todo: get translate error mesage text
        title: error?.title,
      },
    });
  };
  return {setError};
};

export default useError;
