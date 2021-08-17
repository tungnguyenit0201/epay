import React, {createContext, useContext, useEffect} from 'react';
import commonReducer from './reducer';

const CommonContext = createContext({});
export const CommonProvider = ({children}) => {
  const [common, dispatch] = React.useReducer(commonReducer);
  const setLoading = loading => {
    dispatch({type: 'SET_LOADING', loading});
  };
  const value = {
    common,
    loading: common?.loading,
    setLoading,
  };

  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
};

export const useCommon = () => useContext(CommonContext);
