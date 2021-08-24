import React, {createContext, useContext} from 'react';
import userReducer from './reducer';

const UserContext = createContext({});

const defaultUserInfo = {
  token: '',
  firstLogin: false,
  personalInfo: null,
  personalAddress: '',
  personalIC: '',
  phone: null,
  myWallet: '',
};

export const UserProvider = ({children}) => {
  const [userInfo, dispatch] = React.useReducer(userReducer, defaultUserInfo);

  const value = React.useMemo(
    () => ({
      userInfo,
      ...userInfo,
      dispatch,
    }),
    [userInfo],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
