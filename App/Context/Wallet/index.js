import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import userReducer from './reducer';
import {useQuery} from 'react-query';
import {getProfile} from 'services/user';

const UserContext = createContext({});
export const UserProvider = ({children}) => {
  const {data} = useQuery('userInfo', getProfile, {staleTime: 10000});
  const [userInfo, dispatch] = React.useReducer(userReducer, data);

  const value = React.useMemo(
    () => ({
      userInfo,
    }),
    [userInfo],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
