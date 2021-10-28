import {
  useAsyncStorage,
  useError,
  useLoading,
  usePermission,
} from 'context/Common/utils';
import {useEffect, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import RNQRGenerator from 'rn-qr-generator';
import useServiceWallet from 'services/wallet';
import Navigator from 'navigations/Navigator';
import {SCREEN, QR_PAYMENT_TYPE} from 'configs/Constants';
import _ from 'lodash';
import {ERROR_CODE, TRANS_TYPE, TRANS_FORM_TYPE} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {useWallet} from 'context/Wallet';
import Images from 'themes/Images';
import {openSettings} from 'react-native-permissions';
const useScanQR = () => {
  let [flash, setFlash] = useState(false);
  let [showCameRa, setCamera] = useState(true);
  let [image, setImage] = useState();
  const {error, loading} = useCommon();
  // const [loading, setLoading] = useState(false);
  const {getPhone} = useAsyncStorage();
  const {setError} = useError();
  const {setLoading} = useLoading();
  const {getQRCodeInfo, getTransferUser, getSourceMoney, payment} =
    useServiceWallet();
  const {dispatch} = useWallet();

  const setShowCamera = value => {
    setCamera(value);
    if (!value)
      setError({
        title: 'Truy cập camera',
        ErrorMessage: 'Epay muốn truy cập camera trên điện thoại của bạn',
        icon: Images.Modal.Camera,
        onClose: () => setCamera(false),
        action: [
          {
            label: 'Cho phép',
            onPress: () =>
              openSettings().catch(() => console.log('cannot open settings')),
          },
          {
            label: 'Nhắc tôi sau',
            onPress: () => setCamera(false),
          },
        ],
      });
  };
  const onGetSourceMoney = async () => {
    const phone = await getPhone();
    let result = await getSourceMoney({
      phone,
      TransType: TRANS_TYPE.CashTransfer,
    });
    console.log('result :>> ', result);
    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      dispatch({type: 'SET_SOURCE_MONEY', sourceMoney: result?.MoneySources});
    } else setError(result);
  };

  const onGetQRCodeInfo = async qrCode => {
    if (loading) return;
    setLoading(true);
    const phone = await getPhone();
    let result = await getQRCodeInfo({
      phone,
      QRCode: qrCode?.replace('epay://', ''),
      PaymentType: QR_PAYMENT_TYPE.QR,
    });
    setLoading(false);

    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      await onGetSourceMoney();
      let userTransfer;
      if (result?.Payload?.AccountId) {
        userTransfer = await onGetTransferUser(result?.Payload?.AccountId);
        console.log('userTransfer :>> ', userTransfer);
      }
      dispatch({
        type: 'SET_QR_TRANSACTION',
        qrTransaction: {...result?.Payload, ...userTransfer},
      });
      if (result?.Payload?.MerchantCode && result?.Payload?.Price) {
        Navigator.navigate(SCREEN.TRANSFER_COMFIRM);
      } else Navigator.navigate(SCREEN.QR_TRANSFER, result?.Payload);
      setCamera(false);
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
        console.log('object :>> ', qrCode?.values);
        onGetQRCodeInfo(qrCode?.values[0]);
      } else setError({ErrorMessage: 'Mã QR không đúng!'}); // TODO: translate
    } catch (error) {
      console.log('detectQRCode error :>> ', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      dispatch({type: 'SET_QR_TRANSACTION', qrTransaction: {}});
    }, []),
  );
  return {
    image,
    setImage,
    flash,
    setFlash,
    showCameRa,
    setShowCamera,
    onGetQRCodeInfo,
    detectQRCode,
  };
};
export default useScanQR;
