import {API} from 'configs';
import {request} from 'utils/Request';
import {ERROR_CODE, SCREEN} from 'configs/Constants';
import {useRequest} from 'context/Common/utils';
import {useError} from 'context/Common/utils';
import Navigator from 'navigations/Navigator';
import {useTranslation} from 'context/Language';

const useServiceEKYC = () => {
  const {doRequest} = useRequest();
  const {setError} = useError();
  const translation = useTranslation();

  const extractIdentityCardInfo = async ({
    PhoneNumber,
    IdentityCardType,
    FrontPhoto,
    BackPhoto,
    bank,
  }) => {
    return new Promise(async (resolve, reject) => {
      const url = bank
        ? API.EKYC.BANK_EXTRACT_IDENTITY_CARD_INFO
        : API.EKYC.EXTRACT_IDENTITY_CARD_INFO;
      await doRequest({
        url,
        method: 'post',
        params: {
          PhoneNumber,
          IdentityCardType,
          FrontPhoto,
          BackPhoto,
        },
        success: (res = {}) => {
          const {ErrorCode, IdentityCardInfor} = res;
          if (ErrorCode === ERROR_CODE.SUCCESS && IdentityCardInfor) {
            resolve(IdentityCardInfor);
          } else {
            setError({
              ...res,
              action: [
                {
                  label: translation.agree,
                  onPress: () => {
                    if ([1, 2, 4, 98, 99].indexOf(ErrorCode) !== -1)
                      return Navigator.navigate(SCREEN.TAB_NAVIGATION);
                    ErrorCode == ERROR_CODE.EXTRACT_IDENTITY_CARD_OVER_TIMES
                      ? Navigator.navigate(SCREEN.TAB_NAVIGATION, {
                          screen: SCREEN.USER,
                        })
                      : Navigator?.goBack();
                  },
                },
              ],
            });
          }
          reject(res);
        },
        errorAction: () => Navigator.navigate(SCREEN.TAB_NAVIGATION),
      });
    });
  };

  const compareFace = async ({PhoneNumber, CardId, FacePhoto, bank}) => {
    return new Promise(async (resolve, reject) => {
      const url = bank ? API.EKYC.BANK_COMPARE_FACE : API.EKYC.COMPARE_FACE;
      await doRequest({
        url,
        method: 'post',
        params: {
          PhoneNumber,
          CardId,
          FacePhoto,
        },
        success: (res = {}) => {
          const {ErrorCode} = res;
          if (ErrorCode === ERROR_CODE.SUCCESS) {
            resolve(res);
          } else
            setError({
              ...res,
              action: [
                {
                  label: translation.agree,
                  onPress: () => {
                    if ([1, 2, 4, 98, 99].indexOf(ErrorCode) !== -1)
                      return Navigator.navigate(SCREEN.TAB_NAVIGATION);
                    Navigator.navigate(SCREEN.CHOOSE_IDENTITY_CARD);
                  },
                },
              ],
            });
          reject(res);
        },
        errorAction: () => Navigator.navigate(SCREEN.TAB_NAVIGATION),

        // failure: err => {
        //   reject(err);
        // },
      });
    });
  };

  const identityCardVerify = async ({PhoneNumber, IdentityCardInfor, bank}) => {
    return new Promise(async (resolve, reject) => {
      const url = bank
        ? API.EKYC.BANK_IDENTITY_CARD_VERIFY
        : API.EKYC.IDENTITY_CARD_VERIFY;
      await doRequest({
        url,
        method: 'post',
        params: {
          PhoneNumber,
          IdentityCardInfor,
        },
        success: (res = {}) => {
          const {ErrorCode} = res;
          if (ErrorCode === ERROR_CODE.SUCCESS) {
            resolve(res);
          } else {
            // if (ErrorCode === ERROR_CODE.WAIT_FOR_CONFIRMATION) reject(res);
            // else
            //   setError({
            //     ...res,
            //     action: [
            //       {
            //         label: translation.agree,
            //         onPress: () => {
            //           if ([49, 612].indexOf(ErrorCode) !== -1)
            //             return Navigator.navigate(SCREEN.TAB_NAVIGATION, {
            //               screen: SCREEN.USER,
            //             });
            //           Navigator.navigate(SCREEN.TAB_NAVIGATION);
            //         },
            //       },
            //     ],
            //   });
            reject(res);
          }
        },
        failure: () =>
          Navigator.navigate(SCREEN.VERIFY_SUCCESS, {
            resultContent: {title: translation.network_error},
          }),
        // failure: err => {
        //   reject(err);
        // },
      });
    });
  };

  return {
    extractIdentityCardInfo,
    compareFace,
    identityCardVerify,
  };
};
export default useServiceEKYC;
