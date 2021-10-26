import {useCommon} from 'context/Common';
import {useTranslation} from 'context/Language';
import _ from 'lodash';
import {useCallback} from 'react';

const useError = () => {
  const {dispatch} = useCommon();
  const translation = useTranslation();
  const setError = useCallback(
    error => {
      (!!error?.ErrorMessage || error == -1) &&
        dispatch({
          type: 'SET_ERROR',
          error:
            error != -1
              ? {
                  errorCode: error?.ErrorCode,
                  errorMessage: error?.ErrorMessage,
                  title: error?.title,
                  onClose: error?.onClose,
                  icon: error?.icon,
                  label: error?.label,
                  action: error?.action || [{onPress: false}],
                  renderContent: error?.renderContent,
                }
              : null,
        });
    },
    [dispatch],
  );
  return {setError};
};

export default useError;

/*
Example:

 setError({
      icon: Images.Modal.UserTick,
      title: translation.notification,
      ErrorCode: -1,
      ErrorMessage:
        'Cập nhật định danh để tăng cường bảo mật cho tài khoản của bạn.',
      onClose: () => checkInfo({value: false}),
      action: [
        {
          label: 'Định danh',
          onPress: () => onNavigate(SCREEN.CHOOSE_IDENTITY_CARD),
        },
        {
          label: 'Nhắc tôi sau',
          onPress: () => checkInfo({value: false}),
        },
      ],
    });
*/
