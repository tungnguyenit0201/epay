import React, {createContext, useContext, useEffect} from 'react';
import commonReducer from './reducer';

const CommonContext = createContext({});
export const CommonProvider = ({children}) => {
  const [common, dispatch] = React.useReducer(commonReducer, {
    loading: false,
    error: null,
    showModal: {
      smartOTPSuggestion: false,
      KYC: false,
      connectBank: false,
      permissionCamera: false,
      smartOTPPassword: null,
      password: null,
      backType: 0,
    },
    config: {},
  });

  const value = {
    ...common,
    dispatch,
  };

  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
};

export const useCommon = () => useContext(CommonContext);
