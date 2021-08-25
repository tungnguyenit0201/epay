import {useCommon} from 'context/Common';
import {checkSmartOTP} from 'services/common';
import _ from 'lodash';
import {useUser} from 'context/User';
import useAsyncStorage from './asyncStorage';

const useShowModal = () => {
  const {token, phone} = useUser();
  const {getModalSmartOTPDisabled} = useAsyncStorage();
  const {dispatch} = useCommon();

  const showModalSmartOTP = async (value = true) => {
    let isDisabled = await getModalSmartOTPDisabled();
    if (token && !isDisabled) {
      const result = await checkSmartOTP({phone});
      isDisabled = !!result?.SmartOtpInfo;
    }
    if (value && isDisabled) {
      return;
    }
    dispatch({type: 'SHOW_MODAL', modal: {type: 'smartOTP', value}});
  };

  return {showModalSmartOTP};
};

export default useShowModal;
