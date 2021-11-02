import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {useEffect, useRef, useState} from 'react';
import useServiceWallet from 'services/wallet';
import Navigator from 'navigations/Navigator';
import {
  SCREEN,
  TRANS_FORM_TYPE,
  TRANS_TYPE,
  ERROR_CODE,
  CONFIRM_METHODS,
} from 'configs/Constants';
import _ from 'lodash';
import {useCommon} from 'context/Common';
import {useUser} from 'context/User';
import {useWallet} from 'context/Wallet';
import {hidePhone} from 'utils/Functions';
import {sha256} from 'react-native-sha256';
import Keychain from 'react-native-keychain';
import {useTouchID} from 'context/Auth/utils';
import {useModalSmartOTP} from 'context/User/utils';
import {generateTOTP} from 'utils/Functions';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';

export const useQRTransfer = (isMount = true) => {
  const {setError} = useError();
  const {setLoading} = useLoading();
  const {phone} = useUser();
  const {qrTransaction, sourceMoney, dispatch} = useWallet();
  const {
    getTransferUser,
    moneyTransfer,
    payment,
    getSourceMoney,
    paymentComfrim,
  } = useServiceWallet();
  const {onShowModal} = useModalSmartOTP();
  const {getSmartOTPSharedKey} = useAsyncStorage();

  const {biometryType, onTouchID} = useTouchID({
    isMount: false,
    onSuccess: () => paymentWithPassword(),
  });
  const transfer = useRef({
    Price: null,
    payoneer: 0,
    Content: '',
    sourceMoney: _.get(qrTransaction, 'sourceMoney', {}),
    ConfirmValue: '',
  });
  let [suggestion, setSuggestion] = useState([]);
  let [check, setCheck] = useState(false);

  const onChange = (key, value) => {
    console.log('key, value :>> ', key, value);
    transfer.current[key] = value;
    if (key == 'Price') {
      if (value > 100000) return setSuggestion([value, value * 2, value * 3]);
      if (value) setSuggestion([value * 1000, value * 10000, value * 100000]);
    }
    console.log('object :>> ', transfer?.current?.Price?.toString());
  };

  const onCheckAmountLimit = async () => {
    setSuggestion([]);
    setCheck(true);
  };
  const onMoneyTransfer = async () => {
    setLoading(true);

    let result = await moneyTransfer({
      phone,
      Amount: transfer.current?.amount,
      DesAccountId: qrTransaction?.AccountId,
      Payoneer: transfer.current?.payoneer,
      Content: transfer.current?.content,
      TransFormType: TRANS_FORM_TYPE.WALLET,
    });

    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      dispatch({type: 'SET_QR_TRANSACTION', qrTransaction: transfer.current});
      Navigator.navigate(SCREEN.TRANSFER_RESULTS);
      setLoading(false);
    } else setError({...result, onClose: () => setLoading(false)});
    console.log('transfer :>> ', result);
  };

  const onPayment = async () => {
    setLoading(true);

    let result = await payment({
      phone,
      OrderId: qrTransaction?.OrderID,
      MerchantCode: qrTransaction?.MerchantCode,
      TransFormType: qrTransaction?.sourceMoney?.SourceType,
      Amount: qrTransaction?.Price,
      BankId: qrTransaction?.sourceMoney?.BankId,
      BankConnectId: qrTransaction?.sourceMoney?.SourceId,
      CardNumber: '9704000000000018',
      CardHolder: 'NGUYEN VAN A',
      CardIssueDate: '0307',
    });
    setLoading(false);

    if (result?.ErrorCode == ERROR_CODE.SUCCESS || true) {
      Navigator.navigate?.(SCREEN.MAP_BANK_FLOW, {
        screen: MapBankRoutes.BankWebConfirm,
        params: {
          napasInfo: {
            transCode: result?.TransCode,
            bankId: qrTransaction?.sourceMoney?.BankId,
            bankCode: qrTransaction?.sourceMoney?.SourceName,
            cardNumber: '9704000000000018',
            orderId: result?.OrderId,
            orderAmount: result?.OrderAmount,
            orderReference: result?.OrderReference,
            apiOperation: result?.ApiOperation,
            dataKey: result?.DataKey,
            napasKey: result?.NapasKey,
            // transCode: "TT202111021557110066",
            // bankId: 5,
            // bankCode: 'ACB',
            // cardNumber: '9704000000000018',
            // orderId: "CE_1635843431503",
            // orderAmount: '101000',
            // orderReference: 'CASHINCE_1635842455509',
            // apiOperation: 'PURCHASE_WITH_RETURNED_TOKEN',
            // dataKey:
            // "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbP6iFl0Z9pDHv5ni/fhl4ME6AfP16E5zmrHYftaBlcvq1bWRwk1TH23OrYQ6n6jEGIbmrVXzIM00lk723/ZHtvbyZld8r5TcEh5M+h/jIu3/J9gqNYGTo9jLJ0DvRdSfzbDWJqPImPfcGJDRPTrEtckqmd8HvkU6J3MCPrg0IOGTYplUmw6DZ25g1SpBSb1CAWGqP36nqyxNZ4hNJ08agHQbRc/ICHUb/8+/UjDETX96SYVn+GBKbrMM/NcgiJV7UXbEmQ9OEiM3BbI5srhCOt0oYoCp0sJcpLcLbRlpdC7/nV44KPty1rkZ32KlBufz3UVggXpHPz0k0yxYTvl/wIDAQAB:MIICtTCCAZ0CBgFoko89+DANBgkqhkiG9w0BAQUFADAeMRwwGgYDVQQDExNUZXN0IENBIENlcnRpZmljYXRlMB4XDTE5MDEyODAzNDQ0N1oXDTE5MDEyOTAzNDQ0N1owHjEcMBoGA1UEAxMTVGVzdCBDQSBDZXJ0aWZpY2F0ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK2z+ohZdGfaQx7+Z4v34ZeDBOgHz9ehOc5qx2H7WgZXL6tW1kcJNUx9tzq2EOp+oxBiG5q1V8yDNNJZO9t/2R7b28mZXfK+U3BIeTPof4yLt/yfYKjWBk6PYyydA70XUn82w1iajyJj33BiQ0T06xLXJKpnfB75FOidzAj64NCDhk2KZVJsOg2duYNUqQUm9QgFhqj9+p6ssTWeITSdPGoB0G0XPyAh1G//Pv1IwxE1/ekmFZ/hgSm6zDPzXIIiVe1F2xJkPThIjNwWyObK4QjrdKGKAqdLCXKS3C20ZaXQu/51eOCj7cta5Gd9ipQbn891FYIF6Rz89JNMsWE75f8CAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAFXK48p71S87EmrnCm5Yvv42Oxzh0B18/q4jn891xS1abFRkW2jdCvpc3IUQL6gy+JFQcY2NSaLhIYgBafmcngiBFt4kkTqUuwSdIWudl3jYkO58SOYKdxW8jbXM5KwTujpb0gYBpf1u5828RmEq6YEog/yx/hYQOFQlfIBBZFNmUJ7U5TDCFL2wT5MqPg2cfb1DirveD3sLSIUc90IJM3eUXfzXqkwdrCKDZRSuV3TMHChi1IRio2fg7zesi9HliFueaekkvynnwXoG41LKaMSBMM/Mdrb2tm29jVYnlYJ8Coj+dOjWhU2y83dFi5DGr8a3ftWOc+rEz2zlOUKRF7Q==",
            // napasKey:
            // "HRqWWEGt8tWaCF5SQj327KU9Mq95mez+1b0cD62tIZHnym2gPaAI4PZfXZgaFkf4fbLI016qJh6lh+bwFCuVai+seoc30bpBpZvo9SmMUNGb2It4n6LVlBNG5bBT8G/CTvuT3p/SwGDlU3SUBY+lT5KhZys+aPQF5ae9nLDxtmICnUuydpu0eeZkBMYy6uOTrID6Dgef1wJVHOd/uIapKEBJ09keRiN7R5QPFS0Vb23S2Y6mS3AVAGW4+TrCieEzfr6M626Y4IV8KPAL/zvU5WtUm0IdrEQDhwn/mlPjLjjcRdTWEh+tw5PIm9wrXa0UW0zGXJ/fFuh0V0U5zyN3a2HL+uKqHg0xYY6kUPymmZDdn3YDNAJzhBe/6JTsyOmDa2CHCEPgEI6n07MNEYYTTM5dbIfeTvWXmoN8uuJpmMlSezId0RzH6iInJWfMp4ZlTRZwnOGQ99a5Szpi+L6eVSfiNsUw8K3vwmIe/XkzpUKuwY/HzAmLCpl4E8mPRfkx",
          },
          title: 'Xác nhận chuyển tiền',
        },
      });
      return;
    } else {
      if (result?.ErrorCode == ERROR_CODE.PAYMENT_REQUIRED_AUTHENTICATION) {
        transfer.current = {...transfer.current, ...result};
        if (result?.ListConfirmMethod?.length > 0) {
          let ListConfirmMethod = result?.ListConfirmMethod?.sort?.(
            (lhs, rhs) => {
              return lhs?.Priority > rhs?.Priority;
            },
          );
          for (let i = 0; i < ListConfirmMethod?.length; i++) {
            let confirmType = ListConfirmMethod?.[i]?.ConfirmType || -1;

            if (confirmType == CONFIRM_METHODS.BIO_ID && biometryType) {
              let done = await onTouchID();
              if (done) return;
            }

            if (confirmType == CONFIRM_METHODS.SMART_OTP) {
              onShowModal(async () => await paymentWithSmartOTP());
              return;
            }
            if (confirmType == CONFIRM_METHODS.BANK_OTP) {
              return onContinue(SCREEN.QR_BANK_OTP);
            }
          }
        }
      } else setError(result);
    }
  };

  const paymentWithSmartOTP = async () => {
    const smartOtpSharedKey = await getSmartOTPSharedKey();
    let otp = generateTOTP({phone, smartOtpSharedKey});
    await onPaymentConfrim({
      ConfirmValue: otp,
      ConfirmMethod: CONFIRM_METHODS.SMART_OTP,
    });
  };

  const paymentWithPassword = async (
    ConfirmMethod = CONFIRM_METHODS.BIO_ID,
  ) => {
    try {
      setLoading(true);
      const credentials = await Keychain.getGenericPassword();
      const passwordEncrypted = credentials?.password;
      if (passwordEncrypted) {
        onPaymentConfrim({ConfirmValue: passwordEncrypted, ConfirmMethod});
      }
      setLoading(false);
      return passwordEncrypted;
    } catch (error) {
      __DEV__ && console.log("Keychain couldn't be accessed!", error);
    }
  };

  const onPaymentConfrim = async ({ConfirmValue, ConfirmMethod}) => {
    setLoading(true);
    console.log('qrTransaction :>> ', qrTransaction);
    let result = await paymentComfrim({
      phone,
      TransCode: transfer.current?.TransCode || qrTransaction?.TransCode,
      ConfirmMethod,
      ConfirmValue,
      BankId: qrTransaction?.sourceMoney?.BankId,
    });
    setLoading(false);

    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      onContinue(SCREEN.TRANSFER_RESULTS);
    } else setError(result);
  };

  const onContinue = screen => {
    dispatch({
      type: 'SET_QR_TRANSACTION',
      qrTransaction: {...qrTransaction, ...transfer.current},
    });
    Navigator.navigate(screen);
  };

  useEffect(() => {
    isMount &&
      onChange('sourceMoney', sourceMoney?.length > 0 ? sourceMoney[0] : {});
  }, []);
  return {
    transfer: transfer.current,
    suggestion,
    check,
    setSuggestion,
    onContinue,
    onChange,
    onCheckAmountLimit,
    onPayment,
    onPaymentConfrim,
  };
};
