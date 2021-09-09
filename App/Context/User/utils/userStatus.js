import {SCREEN, USER_STATUS} from 'configs/Constants';
import {useWallet} from 'context/Wallet';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {useUser} from '..';

const useUserStatus = () => {
  const {personalIC} = useUser();
  const {listConnectBank} = useWallet();
  const statusVerified = personalIC?.Verified;

  const getStatus = () => {
    if (statusVerified < USER_STATUS.ACTIVED_KYC_NO_CONNECTED_BANK) {
      return statusVerified;
    } else {
      return listConnectBank?.length
        ? USER_STATUS.DONE
        : USER_STATUS.ACTIVED_KYC_NO_CONNECTED_BANK;
    }
  };

  const status = getStatus();

  const onCheck = () => {
    switch (status) {
      case USER_STATUS.INACTIVE_KYC:
        return onVerify();
      case USER_STATUS.ACTIVED_KYC_NO_CONNECTED_BANK:
        return onLinkBank();
    }
  };

  const onVerify = () => {
    Navigator.push(SCREEN.CHOOSE_IDENTITY_CARD);
  };

  const onLinkBank = () => {
    Navigator.push(SCREEN.BANK_LIST);
  };

  return {
    status: getStatus(),
    statusVerified,
    listConnectBank,
    onCheck,
    onVerify,
    onLinkBank,
  };
};
export default useUserStatus;
