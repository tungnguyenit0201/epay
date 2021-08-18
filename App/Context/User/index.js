import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import userReducer from './reducer';

const UserContext = createContext({});

const defaultUserInfo = {
  token: '',
};

export const UserProvider = ({children}) => {
  const [userInfo, dispatch] = React.useReducer(userReducer, defaultUserInfo);

  const value = React.useMemo(
    () => ({
      userInfo,
      dispatch,
    }),
    [userInfo],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
