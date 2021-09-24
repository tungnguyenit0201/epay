import {useAsyncStorage, useError} from 'context/Common/utils';
import {useEffect, useState} from 'react';
import {getQRCodeInfo} from 'services/wallet';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import _ from 'lodash';
import {ERROR_CODE} from 'configs/Constants';
import RNQRGenerator from 'rn-qr-generator';
import {useCommon} from 'context/Common';

const useScanQR = () => {
  let [flash, setFlash] = useState(false);
  let [loading, setLoading] = useState(false);
  let [image, setImage] = useState();
  const {error} = useCommon();
  const {getPhone} = useAsyncStorage();
  const {setError} = useError();

  const onGetQRCodeInfo = async QrCode => {
    if (loading) return;
    setLoading(true);
    const phone = await getPhone();
    let result = await getQRCodeInfo({phone, QrCode});
    console.log('result :>> ', result);

    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      Navigator.navigate(SCREEN.QR_TRANSFER, result);
      setLoading(false);

      return {result};
    } else setError(result);
    setLoading(false);
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
