import {useCallback} from 'react';
import {useCommon} from 'context/Common';
import _ from 'lodash';

const useLoading = () => {
  const {dispatch} = useCommon();
  const setLoading = useCallback(
    loading => {
      dispatch({type: 'SET_LOADING', loading});
    },
    [dispatch],
  );
  return {setLoading};
};

export default useLoading;
