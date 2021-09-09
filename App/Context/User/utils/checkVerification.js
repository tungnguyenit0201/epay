import {PERSONAL_IC, SCREEN} from 'configs/Constants';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {useUser} from '..';

const useCheckVerification = () => {
  const {personalIC} = useUser();
  const verified = personalIC?.Verified;

  const onVerifyUser = () => {
    if (verified !== PERSONAL_IC.INACTIVE) {
      return;
    }
    Navigator.push(SCREEN.CHOOSE_IDENTITY_CARD);
  };

  return {verified, onVerifyUser};
};
export default useCheckVerification;
