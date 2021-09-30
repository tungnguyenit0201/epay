import {ERROR_CODE, SCREEN} from 'configs/Constants';
import {useUser} from 'context/User';
import Navigator from 'navigations/Navigator';
import {confirmPassword} from 'services/user';
import useShowModal from './showModal';
import {useCommon} from '..';
import {sha256} from 'react-native-sha256';
import useError from './error';

const useModalPassword = () => {
  const {phone} = useUser();
  const {
    showModal: {password, goBack},
  } = useCommon();
  const {showModalPassword} = useShowModal();
  const {setError} = useError();

  const onShowModal = callback => {
    showModalPassword({show: true, goBack: callback});
  };

  const onHideModal = () => {
    showModalPassword({show: false});
  };

  const onPasswordFilled = async ({password}) => {
    const passwordEncrypted = await sha256(password);
    let result = await confirmPassword({
      phone,
      password: passwordEncrypted,
    });
    if (result?.ErrorCode === ERROR_CODE.SUCCESS) {
      onHideModal();
      goBack && goBack(password);
      return;
    }
    setError(result);
  };

  const onForgetPassword = () => {
    onHideModal();
    Navigator.push(SCREEN.FORGET_PASSWORD);
  };

  return {
    password,
    onHideModal,
    onShowModal,
    onPasswordFilled,
    onForgetPassword,
  };
};

export default useModalPassword;
