import {useCommon} from 'context/Common';
import {useTranslation} from 'context/Language';
import _ from 'lodash';
import {useCallback} from 'react';

const useError = () => {
  const {dispatch} = useCommon();
  const translation = useTranslation();
  const setError = useCallback(
    error => {
      // let message = translation.errorCode[error?.ErrorCode];
      !!error &&
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
                  action: error?.action || [{onPress: () => {}}],
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
