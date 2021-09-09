import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {getWalletInfo} from 'services/wallet';
import {useWallet} from '..';
import _ from 'lodash';
import {ERROR_CODE} from 'configs/Constants';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';

const useWalletInfo = () => {
  const {getPhone} = useAsyncStorage();
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch} = useWallet();

  const onGetWalletInfo = async () => {
    // setLoading(true);
    const phone = await getPhone();
    let result = await getWalletInfo({phone});
    // setLoading(false);

    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      const {WalletInfo} = result;
      dispatch({
        type: 'SET_WALLET_INFO',
        WalletInfo,
      });
    } else setError(result);
  };
  return {onGetWalletInfo};
};

const useMoney = () => {
  const isFocused = useIsFocused();
  let [showMoney, setShowMoney] = useState(false);
  const {onGetWalletInfo} = useWalletInfo();

  useEffect(() => {
    !isFocused && setShowMoney(false);
  }, [isFocused]);

  useEffect(() => {
    showMoney && onGetWalletInfo();
  }, [showMoney]); // eslint-disable-line

  return {showMoney, setShowMoney};
};

export {useWalletInfo, useMoney};
