import {useState, useEffect} from 'react';
import useServiceCommon from 'services/common';
import {useUser} from 'context/User';
import {ERROR_CODE, SCREEN, TRANS_TYPE, FUNCTION_TYPE} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {useModalSmartOTP} from 'context/User/utils';
import {useWallet} from 'context/Wallet';
import useServiceWallet from 'services/wallet';

const useAutoWithdraw = () => {
  const {phone} = useUser();
  const {transaction, dispatch} = useWallet();
  const {getAutoPay} = useServiceWallet();
  const {checkSmartOTP} = useServiceCommon();
  const {onShowModal} = useModalSmartOTP();
  let [active, setActive] = useState(false);
  let [minBalance, setMinBalance] = useState('');
  let [amount, setAmount] = useState('');
  let [bankInfor, setBankInfo] = useState({});
  let [listAutoPay, setListAutoPay] = useState({});
  useEffect(() => {
    return () => {
      const getData = async () => {
        let data = await getAutoPay({phone});
        setListAutoPay(data);
      };
      getData();
    };
  }, []);

  const onCheckSmartOTP = async () => {
    try {
      let result = await checkSmartOTP({phone});
      if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
        const isSmartOTPActived = result.State;
        if (isSmartOTPActived) {
          Navigator.navigate(SCREEN.EDIT_AUTO_RECHARGE);
          return true;
        }
      }
    } catch (error) {}
  };

  const onRegisterAutoWithdraw = () => {
    dispatch({
      type: 'UPDATE_TRANSACTION_INFO',
      data: {
        transType: TRANS_TYPE.AutoCashIn,
        bank: bankInfor,
        functionType: FUNCTION_TYPE.AUTO_RECHARGE,
        amount: amount,
        minBalance: minBalance,
      },
    });
    onShowModal(() => Navigator.navigate(SCREEN.OTP_BY_SMART_OTP));
  };

  return {
    onCheckSmartOTP,
    active,
    setActive,
    bankInfor,
    setBankInfo,
    onRegisterAutoWithdraw,
    phone,
    minBalance,
    setMinBalance,
    amount,
    setAmount,
    listAutoPay,
    setListAutoPay,
  };
};

export default useAutoWithdraw;
