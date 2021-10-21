import {ERROR_CODE} from 'configs/Constants';
import {useAsyncStorage, useLoading, useError} from 'context/Common/utils';
import {useUser} from 'context/User';
import {useEffect, useRef, useState} from 'react';
import useServiceUser from 'services/user';
import {Share} from 'react-native';
import _ from 'lodash';
const useQRCode = () => {
  const {getPhone} = useAsyncStorage();
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch} = useUser();
  const myQRCode = useRef();
  const {getQRCode} = useServiceUser();

  const shareQRCode = () => {
    myQRCode.current.toDataURL(dataURL => {
      let shareImageBase64 = {
        title: 'Epay',
        url: `data:image/png;base64,${dataURL}`,
        subject: 'QR Code',
      };
      Share.share(shareImageBase64).catch(error => console.log(error));
    });
  };
  const onGetQRCode = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await getQRCode({phone});
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        dispatch({type: 'SET_QRCODE', data: result?.QRCodeInfo});
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetQRCode();
  }, []); // eslint-disable-line

  return {myQRCode, onGetQRCode, shareQRCode};
};
export default useQRCode;
