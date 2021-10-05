import {useAsyncStorage, useError, usePermission} from 'context/Common/utils';
import {useEffect, useState} from 'react';
import {getQRCodeInfo} from 'services/wallet';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import _ from 'lodash';
import {ERROR_CODE} from 'configs/Constants';
import RNQRGenerator from 'rn-qr-generator';
import {useCommon} from 'context/Common';
import {RESULTS} from 'react-native-permissions';
const useScanQR = () => {
  let [flash, setFlash] = useState(false);
  let [loading, setLoading] = useState(false);
  let [image, setImage] = useState();
  const {error} = useCommon();
  const {getPhone} = useAsyncStorage();
  const {setError} = useError();
  const {checkPermission} = usePermission();

  const onGetQRCodeInfo = async qrCode => {
    if (loading) return;
    setLoading(true);
    const phone = await getPhone();
    let result = await getQRCodeInfo({
      phone,
      QRCode: qrCode?.replace('epay://', ''),
    });
    console.log('result :>> ', result);

    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      Navigator.navigate(SCREEN.QR_TRANSFER, result);
      setLoading(false);

      return {result};
    } else {
      setError({...result, onClose: () => setLoading(false)});
    }
  };

  const detectQRCode = async () => {
    try {
      console.log('image?.path :>> ', image);
      if (!image?.sourceURL)
        return setError({ErrorMessage: 'Bạn chưa chọn hình!', ErrorCode: -1}); // TODO: translate
      let qrCode = await RNQRGenerator.detect({
        uri: image?.sourceURL,
      });
      console.log('qrCode :>> ', qrCode);

      if (qrCode?.values?.length > 0) {
        onGetQRCodeInfo(qrCode?.values[0]);
      } else setError({ErrorMessage: 'Mã QR không đúng!', ErrorCode: -1}); // TODO: translate
    } catch (error) {
      console.log('detectQRCode error :>> ', error);
    }
  };

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
