import {useAsyncStorage, useError} from 'context/Common/utils';
import {useEffect, useState} from 'react';
import {getTransferUser} from 'services/wallet';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import _ from 'lodash';
import {ERROR_CODE} from 'configs/Constants';
import {useCommon} from 'context/Common';

const useQRTransfer = () => {
  let [loading, setLoading] = useState(false);
  const {error} = useCommon();
  const {getPhone} = useAsyncStorage();
  const {setError} = useError();

  const onGetTransferUser = async () => {
    if (loading) return;
    setLoading(true);
    const phone = await getPhone();
    let result = await getTransferUser({
      phone,
      SearchPhoneNumber: 'EA8000000927',
    });
    console.log('result :>> ', result);

    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      setLoading(false);

      return {result};
    } else setError(result);
    setLoading(false);
  };

  useEffect(() => {
    onGetTransferUser();
  }, []); // eslint-disable-line
  return {
    loading,
  };
};
export default useQRTransfer;
