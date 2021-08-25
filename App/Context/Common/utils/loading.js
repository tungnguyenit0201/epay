import {useCommon} from 'context/Common';
import _ from 'lodash';

const useLoading = () => {
  const {dispatch} = useCommon();
  const setLoading = loading => {
    dispatch({type: 'SET_LOADING', loading});
  };
  return {setLoading};
};

export default useLoading;
