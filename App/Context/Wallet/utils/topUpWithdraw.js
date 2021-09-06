import {useState, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {
  ERROR_CODE,
  FUNCTION_TYPE,
  SCREEN,
  TRANS_FORM_TYPE,
  TRANS_TYPE,
} from 'configs/Constants';
import _ from 'lodash';
import {useWallet} from '..';
import {getBankFee} from 'services/wallet';
import {calculateFee, formatMoney} from 'utils/Functions';
import {checkSmartOTP} from 'services/common';
import {useUser} from 'context/User';

const useTopUpWithdraw = ({transType}) => {
  const [isContinueEnabled, setContinueEnabled] = useState(false);
  const inputRef = useRef(null);
  const contentRef = useRef({
    bank: null,
    inputValue: '',
    transFormType: null,
    fee: null,
  });
  const {dispatch} = useWallet();

  const onSuggestMoney = value => {
    inputRef.current?.setValue && inputRef.current.setValue(`${value}`);
  };

  const onChangeCash = value => {
    contentRef.current.inputValue = value;
    onCheckContinueEnabled();
  };

  const onSetBank = ({bank, transFormType, fee}) => {
    contentRef.current.bank = bank;
    contentRef.current.transFormType = transFormType;
    contentRef.current.fee = fee;
    onCheckContinueEnabled();
  };

  const onCheckContinueEnabled = () => {
    const {bank, inputValue} = contentRef.current;
    if (bank && inputValue) {
      !isContinueEnabled && setContinueEnabled(true);
      return;
    }
    isContinueEnabled && setContinueEnabled(false);
  };

  const onContinue = async () => {
    const {bank, inputValue, transFormType, fee} = contentRef.current;
    //
    if (transFormType !== TRANS_FORM_TYPE.CONNECTED_BANK) {
      alert('Chưa làm');
      return;
    }
    //
    dispatch({
      type: 'UPDATE_TRANSACTION_INFO',
      data: {
        transType,
        transFormType,
        amount: inputValue,
        bank,
        fee,
      },
    });
    Navigator.navigate(SCREEN.CONFIRMATION);
  };

  return {
    inputRef,
    isContinueEnabled,
    onSuggestMoney,
    onContinue,
    onSetBank,
    onChangeCash,
  };
};

const useConfirmation = () => {
  const {transaction} = useWallet();
  const {phone} = useUser();

  const {
    transType,
    bank: {BankNumber: bankNumber, BankName: bankName},
    fee,
    amount,
  } = transaction;
  const transTypeText =
    transType === TRANS_TYPE.CashIn ? 'nạp tiền' : 'rút tiền'; // TODO: translate
  const feeValue = calculateFee({cash: amount, feeData: fee});
  const total = feeValue + amount;
  const data = [
    {
      name: 'Nguồn tiền',
      value: bankName,
    },
    {
      name: 'Số tiền',
      value: formatMoney(amount, true),
    },
    {
      name: 'Phí giao dịch',
      value: formatMoney(feeValue, true),
    },
    {
      name: 'Tổng số tiền',
      value: formatMoney(total, true),
      bold: true,
    },
  ];

  const onContinue = async () => {
    const result = await checkSmartOTP({phone});
    const isSmartOTPActived = _.get(result, 'SmartOtpInfo', false);
    if (isSmartOTPActived) {
      Navigator.push(SCREEN.SMART_OTP_PASSWORD, {type: 'transaction'});
    } else {
      alert('Vui lòng kích hoạt smart otp');
      // Navigator.push(SCREEN.OTP, {functionType: FUNCTION_TYPE.RECHARGE_BY_BANK});
    }
  };

  return {
    transTypeText,
    bankNumber,
    amount,
    fee: feeValue,
    total,
    data,
    onContinue,
  };
};

export {useTopUpWithdraw, useConfirmation};
