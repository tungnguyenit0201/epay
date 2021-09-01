import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import walletReducer from './reducer';
const defaultWalletInfo = {
  listConnectBank: [],
  listDomesticBank: [],
  listInternationalBank: [],
  limit: '',
  transaction: {},
};
const WalletContext = createContext({});
export const WalletProvider = ({children}) => {
  const [walletInfo, dispatch] = React.useReducer(
    walletReducer,
    defaultWalletInfo,
  );

  const value = React.useMemo(
    () => ({
      walletInfo,
      ...walletInfo,
      dispatch,
    }),
    [walletInfo],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
