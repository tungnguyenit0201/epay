import {useState, useEffect} from 'react';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {
  ERROR_CODE,
  PERSONAL_IC,
  SCREEN,
  SMART_OTP,
  USER_STATUS,
} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import useServiceCommon from 'services/common';
import {useUser} from 'context/User';
import {useUserStatus} from 'context/User/utils';
import {useTranslation} from 'context/Language';
import {Images} from 'themes';
import {useModalSmartOTP} from './useHome';
import {useRegister} from 'context/Auth/utils';

const useCheckInfo = () => {
  // TODO: translate
  const {dispatch, showModal} = useCommon();
  const {getModalSmartOTPDisabled} = useAsyncStorage();
  const translation = useTranslation();
  const {token, phone, identityCardInfor} = useUser();
  const {status, getStatus} = useUserStatus();
  const {setError} = useError();
  const modalSmartOTP = useModalSmartOTP();
  const {setFirstLogin} = useRegister();
  const {checkSmartOTP} = useServiceCommon();

  const onCheckSmartOTP = async screen => {
    const result = await checkSmartOTP({phone});
    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      const isSmartOTPActived = _.get(result, 'State', 0);
      if (isSmartOTPActived) {
        screen && Navigator.navigate(screen);
        return true;
      }
      // dispatch({
      //   type: 'SHOW_MODAL',
      //   modal: {type: 'smartOTPSuggestion', value: true},
      // });
      setError({
        title: translation.faster_and_more_secure_with_smart_otp,
        ErrorCode: -1,
        ErrorMessage:
          translation.security_method_proactively_obtains_onetime_transaction_verification_code_otp_and_automatically_enters_it_into_the_system_when_performing_online_transactions,
        onClose: () => setFirstLogin(false),
        action: [
          {
            label: translation.install_smart_otp,
            onPress: modalSmartOTP?.onGoSmartOTP,
          },
        ],
        icon: Images.Modal.Lock,
      });
    } else setError(result);
  };

  const showConnectBank = () => {
    setError({
      // title: translation.notification,
      ErrorCode: -1,
      ErrorMessage: translation.link_banks_to_make_transactions,
      onClose: () => checkInfo({value: false}),
      action: [
        {
          label: translation.connect_now,
          onPress: () => onNavigate(SCREEN.MAP_BANK_FLOW),
        },
        {
          label: translation.remind_me_later,
          onPress: () => checkInfo({value: false}),
        },
      ],
    });
  };

  const showKYC = () => {
    setError({
      icon: Images.Modal.UserTick,
      // title: translation.notification,
      ErrorCode: -1,
      ErrorMessage:
        translation.you_need_to_identify_your_account_for_maximum_security_before_using_the_wallet,
      // onClose: () => checkInfo({value: false}),
      action: [
        {
          label: translation.verify_now,
          onPress: () => onNavigate(SCREEN.CHOOSE_IDENTITY_CARD),
        },
        {
          label: translation.close,
        },
      ],
    });
  };

  const checkInfo = ({screen, value = true}) => {
    // console.log('status :>> ', status, getStatus(), value);
    if (status != USER_STATUS.DONE) {
      switch (status) {
        case USER_STATUS.VERIFYING_KYC:
        case PERSONAL_IC.RE_VERIFYING:
          setError({
            ErrorCode: -1,
            ErrorMessage: 'Đang xác thực',
            title: translation.notification,
          });
          break;
        case PERSONAL_IC.EXPIRED:
          screen !== SCREEN.TOP_UP && onCheckKYCExpired();
          break;
        case USER_STATUS.ACTIVED_KYC_NO_CONNECTED_BANK:
          showConnectBank();
          break;
        default:
          showKYC();
          break;
      }
      return false;
    }
    return onCheckSmartOTP(screen);
  };

  const onNavigate = screen => {
    status == USER_STATUS.INACTIVE_KYC && showKYC();
    status == USER_STATUS.ACTIVED_KYC_NO_CONNECTED_BANK && showConnectBank();
    Navigator.navigate(screen);
  };

  const onCheckKYCExpired = () => {
    if (status === PERSONAL_IC.EXPIRED) {
      setError({
        ErrorCode: -1,
        ErrorMessage:
          'GTTT hết hạn. Quý khách cần định danh tài khoản để tăng cường bảo mật tối đa trước khi sử dụng ví',
        title: translation.notification,
        action: [
          {
            label: translation.verify_your_account,
            onPress: () => Navigator.navigate(SCREEN.USER_INFO),
          },
          {
            label: 'Đóng',
          },
        ],
      });
      return false;
    }
    return true;
  };
  const onCheckStepEKYC = () => {
    // return Navigator.navigate(SCREEN.CHOOSE_IDENTITY_CARD);
    if (identityCardInfor?.Step > 0) {
      setError({
        ErrorMessage: translation?.ask_re_ekyc,
        action: [
          {
            onPress: () =>
              Navigator.navigate(
                identityCardInfor?.Step == 1
                  ? SCREEN.VERIFY_IDENTITY_CARD
                  : SCREEN.VERIFY_USER_PORTRAIT,
                {extractCardInfo: identityCardInfor},
              ),
            label: translation?.agree,
          },
          {
            onPress: () => Navigator.navigate(SCREEN.CHOOSE_IDENTITY_CARD),
            label: translation?.no_and_again,
          },
        ],
      });
    } else Navigator.navigate(SCREEN.CHOOSE_IDENTITY_CARD);
  };

  return {
    KYC: showModal.KYC,
    connectBank: showModal.connectBank,
    checkSmartOTP,
    checkInfo,
    onNavigate,
    onCheckKYCExpired,
    onCheckStepEKYC,
  };
};

export default useCheckInfo;
