import {useAsyncStorage, useError, usePermission} from 'context/Common/utils';
import {useEffect, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import RNQRGenerator from 'rn-qr-generator';
import {getQRCodeInfo, getTransferUser} from 'services/wallet';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import _ from 'lodash';
import {ERROR_CODE} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {RESULTS} from 'react-native-permissions';
import {useWallet} from 'context/Wallet';

const useScanQR = () => {
  let [flash, setFlash] = useState(false);
  let [loading, setLoading] = useState(false);
  let [image, setImage] = useState();
  const {error} = useCommon();
  const {getPhone} = useAsyncStorage();
  const {setError} = useError();
  const {checkPermission} = usePermission();
  const {dispatch} = useWallet();

  const onGetQRCodeInfo = async qrCode => {
    if (loading) return;
    setLoading(true);
    const phone = await getPhone();
    let result = await getQRCodeInfo({
      phone,
      QRCode: qrCode?.replace('epay://', ''),
    });
    console.log('onGetQRCodeInfo :>> ', result, _.get(result, 'ErrorCode'));

    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      let userTransfer;
      if (result?.Payload?.AccountId)
        userTransfer = await onGetTransferUser(result?.Payload?.AccountId);
      // if (result?.Payload?.MerchantCode && result?.Payload?.TransAmount)
      //   Navigator.navigate(SCREEN.TRANSFER_RESULTS, result?.Payload);
      // else Navigator.navigate(SCREEN.QR_TRANSFER, result?.Payload);
      console.log('userTransfer :>> ', userTransfer);
      dispatch({
        type: 'SET_QR_TRANSACTION',
        qrTransaction: {...result?.Payload, ...userTransfer},
      });

      Navigator.navigate(SCREEN.QR_TRANSFER);
      setLoading(false);

      return {result};
    } else {
      setError({...result, onClose: () => setLoading(false)});
    }
  };

  const onGetTransferUser = async AccountId => {
    setLoading(true);
    const phone = await getPhone();

    let result = await getTransferUser({
      phone,
      AccountId,
    });
    console.log('result :>> ', result);

    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      setLoading(false);

      return result?.UserInfo;
    } else setError(result);
    setLoading(false);
  };

  const detectQRCode = async image => {
    try {
      if (!image?.sourceURL) return;
      let qrCode = await RNQRGenerator.detect({
        uri: image?.sourceURL,
      });

      if (qrCode?.values?.length > 0) {
        onGetQRCodeInfo(qrCode?.values[0]);
      } else setError({ErrorMessage: 'Mã QR không đúng!', ErrorCode: -1}); // TODO: translate
    } catch (error) {
      console.log('detectQRCode error :>> ', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      dispatch({type: 'SET_QR_TRANSACTION', qrTransaction: {}});
    }, []),
  );
  useEffect(() => {
    checkPermission('', () => Navigator.goBack());
  }, []); // eslint-disable-line
  return {
    loading,
    image,
    setImage,
    flash,
    setFlash,
    onGetQRCodeInfo,
    detectQRCode,
  };
};
export default useScanQR;
