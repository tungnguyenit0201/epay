import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from 'react';
import authReducer from './reducer.js';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [auth, dispatch] = useReducer(authReducer, {
    isLoading: false,
    configs: {},
  });

  const value = useMemo(
    () => ({
      auth,
      dispatch,
    }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
