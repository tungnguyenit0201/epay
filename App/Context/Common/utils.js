import {useReducer} from 'react';
import commonReducer from './reducer';
import {useCommon} from 'context/Common';
const useLoading = () => {
  const {dispatch} = useCommon();
  const setLoading = loading => {
    dispatch({type: 'SET_LOADING', loading});
  };
  return {setLoading};
};
export {useLoading};
