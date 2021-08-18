import {useAsyncStorage} from 'context/Common/utils';
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
  phone: '',
  passwordEncrypted: '',
  touchIdEnabled: false,
};

export const UserProvider = ({children}) => {
  const [userInfo, dispatch] = React.useReducer(userReducer, defaultUserInfo);
  const {getUserData} = useAsyncStorage();

  const initUser = async () => {
    const data = await getUserData();
    dispatch({type: 'INIT_USER', data});
  };

  useEffect(() => {
    initUser();
    return () => {};
  }, []);

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
