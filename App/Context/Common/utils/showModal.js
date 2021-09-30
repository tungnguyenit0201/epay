import {useCommon} from 'context/Common';
import _ from 'lodash';
import {useUser} from 'context/User';
import useAsyncStorage from './asyncStorage';
import {getSettingsInfo} from 'services/user';

const useShowModal = () => {
  const {token, phone} = useUser();
  const {getModalSmartOTPDisabled} = useAsyncStorage();
  const {dispatch} = useCommon();

  const showModalSmartOTPSuggestion = async (show = true) => {
    let isDisabled = await getModalSmartOTPDisabled();
    if (token && !isDisabled) {
      const result = await getSettingsInfo({phone});
      isDisabled = !!result?.SettingInfo?.ActivedSmartOTP;
    }
    if (show && isDisabled) {
      return;
    }
    dispatch({
      type: 'SHOW_MODAL',
      modal: {type: 'smartOTPSuggestion', value: show},
    });
  };

  const showModalSmartOTPPassword = async ({
    show = true,
    message = '',
    goBack = () => {},
  }) => {
    dispatch({
      type: 'SHOW_MODAL',
      modal: {
        type: 'smartOTPPassword',
        value: {show, message},
      },
      goBack,
    });
  };

  const showModalPassword = async ({
    show = true,
    message = '',
    goBack = () => {},
  }) => {
    dispatch({
      type: 'SHOW_MODAL',
      modal: {
        type: 'password',
        value: {show, message},
      },
      goBack,
    });
  };

  return {
    showModalSmartOTPSuggestion,
    showModalSmartOTPPassword,
    showModalPassword,
  };
};

export default useShowModal;
