import {useState, useEffect, useRef} from 'react';
import {Platform, Linking} from 'react-native';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN} from 'configs/Constants';
import useServiceUser from 'services/user';
import {
  useAsyncStorage,
  useError,
  useLoading,
  useModalPassword,
} from 'context/Common/utils';
import _ from 'lodash';
import {useUser} from '..';
import {useTranslation} from 'context/Language';
import {useSelectRegion, useUserInfo} from 'context/User/utils';
import {
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import Ekyc from 'utils/Ekyc';
import EKYC_ERROR from 'configs/Enums/EkycError';
import KYCType from 'configs/Enums/KYCType';
import useServiceEKYC from 'services/ekyc';
import {ConsoleUtils} from 'utils/Console';
import useAlert from 'utils/Alert';
import {Images} from 'themes';

const {
  SDK_SCREEN: {EKYC_ORC, EKYC_FACE},
  KYC_DOCUMENT_TYPE,
} = KYCType;
const KYC_FLOW = {
  BANK: 'bank',
};

const useVerifyInfo = (initialValue = {}) => {
  const contentRef = useRef(initialValue);
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch, userInfo} = useUser();
  const {getPhone} = useAsyncStorage();
  const {onGetAllInfo} = useUserInfo();
  let [disabledIdentify, setDisabledIdentify] = useState(true);
  let [disabledAvatar, setDisabledAvatar] = useState(true);
  const [showModalReVerify, setShowModalReVerify] = useState(false);
  const {onClearRegionData} = useSelectRegion();
  const {kycType} = userInfo;
  const [SDKImage, setSDKImage] = useState();
  const strings = useTranslation() || {};
  // const {showError} = useAlert();
  const {updatePersonalInfo, updateUserAddress, updateIdentify} =
    useServiceUser();
  const {onShowModal: onShowModalPassword} = useModalPassword();
  const {extractIdentityCardInfo, compareFace, identityCardVerify} =
    useServiceEKYC();
  const documentType = contentRef.current?.identifyCard?.ICType;
  const eKYC = kycType === KYCType.EKYC;
  const bank = contentRef.current?.KYCFlow === KYC_FLOW.BANK;

  const showError = () => {
    setError({
      icon: Images.TransactionHistory.Fail,
      title: strings?.error,
      ErrorMessage: strings?.unknownError,
    });
  };
  const onChange = (key, value) => {
    contentRef.current[key] = value;
    setDisabledIdentify(
      Boolean(
        !contentRef.current?.ICFrontPhoto || !contentRef.current?.ICBackPhoto,
      ),
    );
    key === 'Avatar' && setDisabledAvatar(Boolean(!value));
  };

  const onContinue = (screen, params) => {
    Navigator.navigate(screen, {...contentRef.current, ...params, kycType});
  };

  const onUpdateIdentify = ({
    ICBackPhoto,
    ICFrontPhoto,
    ICFullName,
    ICIssuedDate,
    ICIssuedPlace,
    ICNumber,
    identifyCard,
  }) => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      let phone = await getPhone();
      let result = await updateIdentify({
        phone,
        ICInfor: {
          ICBackPhoto: ICBackPhoto?.data,
          ICFrontPhoto: ICFrontPhoto?.data,
          ICFullName,
          ICIssuedDate,
          ICIssuedPlace,
          ICNumber,
          ICType: identifyCard?.ICType,
        },
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') === ERROR_CODE.SUCCESS) {
        resolve();
      } else {
        reject(result);
      }
    });
  };

  const onUpdatePersonalInfo = (
    {ICFullName, Avatar, DateOfBirth, Email, SexType},
    showErrorMessage = true,
  ) => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      let phone = await getPhone();
      let result = await updatePersonalInfo({
        phone,
        personalInfo: {
          FullName: ICFullName,
          Avatar: Avatar?.data,
          DateOfBirth,
          Email,
          SexType,
        },
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') === ERROR_CODE.SUCCESS) {
        resolve();
      } else {
        showErrorMessage && setError(result);
        reject(result);
      }
    });
  };

  const onUpdateUserAddress = (
    {Address, Ward, County, Provincial},
    showErrorMessage = true,
  ) => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      let phone = await getPhone();
      let result = await updateUserAddress({
        phone,
        Address,
        Ward,
        County,
        Provincial,
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') === ERROR_CODE.SUCCESS) {
        dispatch({
          type: 'SET_PERSONAL_ADDRESS',
          data: {Address, Ward, County, Provincial},
        });
        dispatch({
          type: 'SET_REGION',
          data: {Ward: '', County: '', Provincial: ''},
        });
        resolve();
      } else {
        showErrorMessage && setError(result);
        reject(result);
      }
    });
  };

  const onUpdateAllInfo = async value => {
    let resultContent;
    try {
      const updateInfo = {...contentRef.current, ...value};
      if (eKYC) {
        const {extractCardInfo} = contentRef.current;
        const {CardID, CardNumber, Step, ICType, Verified} =
          extractCardInfo || {};
        await verifyIdentityCard({
          Address: value.Address,
          BirthDay: value.DateOfBirth,
          CardID,
          CardNumber,
          District: value.County,
          Step,
          FullName: value.ICFullName,
          Gender: value.SexType,
          ICType,
          IssueDate: value.ICIssuedDate,
          IssuePlace: value.ICIssuedPlace,
          Province: value.Provincial,
          ValidDate: value.ValidDate,
          Verified,
          Ward: value.Ward,
        });
        resultContent = {
          success: true,
          title: strings.verifySuccess,
        };
      } else {
        await onUpdateIdentify(updateInfo);
        resultContent = {
          success: true,
          title: strings.kycPendingVerify,
        };
      }
      await Promise.all([
        onUpdatePersonalInfo(updateInfo, false),
        onUpdateUserAddress(updateInfo, false),
        onGetAllInfo(),
        onClearRegionData(),
      ]);
    } catch (e) {
      const {ErrorMessage = strings?.unknownError} = e || {};
      resultContent = {
        title: strings.verifyFailed,
        message: ErrorMessage,
      };
    } finally {
      onContinue(SCREEN.VERIFY_SUCCESS, {resultContent});
    }
  };

  const onReVerify = action => {
    switch (action) {
      case 'showModal':
        return setShowModalReVerify(true);
      case 'hideModal':
        return setShowModalReVerify(false);
      default:
        setShowModalReVerify(false);
        onShowModalPassword(() => Navigator.push(SCREEN.CHOOSE_IDENTITY_CARD));
    }
  };

  const onDoneIdentityCard = async () => {
    const screen = bank
      ? SCREEN.VERIFY_USER_PORTRAIT
      : SCREEN.VERIFY_IDENTITY_CARD;
    if (eKYC) {
      const result = await extractCardInfo();
      if (result) {
        onChange('extractCardInfo', {...result});
        onContinue(screen);
      }
    } else {
      onContinue(screen);
    }
  };

  const onDoneCaptureFace = async () => {
    if (eKYC) {
      const {extractCardInfo: cardInfo, Avatar} = contentRef.current;
      const result = await compareUserFace({
        Avatar,
        CardId: cardInfo?.CardID,
      });
      if (result) {
        onContinue(SCREEN.VERIFY_USER_PORTRAIT);
      }
    } else {
      onContinue(SCREEN.VERIFY_USER_PORTRAIT);
    }
  };

  useEffect(() => {
    const getKYCConfig = async () => {
      // Call api to get config
      dispatch({type: 'SET_KYC_TYPE', data: 'EKYC'});
    };

    userInfo.kycType === undefined && getKYCConfig();
  }, [dispatch, userInfo.kycType]);

  const onOpenEkycSDK = async (screen, side) => {
    const openSDK = () => {
      switch (screen) {
        case EKYC_ORC:
          Ekyc.captureDocument(ekycSDKConfig(), onSDKOrcResult);
          break;
        case EKYC_FACE:
          Ekyc.captureFace(ekycSDKConfig(), onSDKOrcResult);
          break;
      }
    };

    const ekycSDKConfig = () => {
      const helpText = {
        1: 'CMND',
        2: 'Passport',
        3: 'CMTQD',
      };
      const backSide = side === 'back';
      return {
        documentType: 'oneSide',
        helpText: helpText[documentType] || '',
        title: backSide ? 'ẢNH MẶT SAU' : 'ẢNH MẶT TRƯỚC',
        titleFront: '',
        isShowTutorial: !contentRef.current?.eKYCTutorialShown,
      };
    };

    const onSDKOrcResult = async sdkResult => {
      const {errorCode} = sdkResult || {};

      const {
        imageBase64,
        imageCropBase64, //Side image: passport
        nearImageBase64, // Near face image,
      } = sdkResult || {};

      //For handle error from SDK
      if (errorCode) {
        switch (errorCode) {
          case EKYC_ERROR.USER_CANCELLED:
            ConsoleUtils.warn('User cancelled');
            break;
          case EKYC_ERROR.SDK_ERROR:
            ConsoleUtils.warn(
              'SDK error like permission or save data error by outofmemory...etc',
            );
            break;
        }
        return;
      }
      const data = screen === EKYC_ORC ? imageBase64 : nearImageBase64;
      const imageDisplay =
        screen === EKYC_ORC ? imageCropBase64 : nearImageBase64;
      setSDKImage({
        data,
        path: `data:image/jpeg;base64,${imageDisplay}`,
      });
      onChange('eKYCTutorialShown', true);
    };

    const EKYC_PERMISSIONS =
      Platform.OS === 'android'
        ? [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ]
        : [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY];

    const checkPermissionsResult = await checkMultiple(EKYC_PERMISSIONS);
    const isCheckPermissionsGranted = EKYC_PERMISSIONS.every(
      permission => checkPermissionsResult[permission] === RESULTS.GRANTED,
    );
    if (isCheckPermissionsGranted) {
      openSDK();
    } else {
      const requestPermissionsResult = await requestMultiple(EKYC_PERMISSIONS);
      const isRequestPermissionsGranted = EKYC_PERMISSIONS.every(
        permission => requestPermissionsResult[permission] === RESULTS.GRANTED,
      );
      if (isRequestPermissionsGranted) {
        openSDK();
      } else {
        setError({
          icon: Images.warning,
          title: strings?.kycPermissionTitle,
          ErrorMessage: strings?.permissionDenied,
          action: [
            {
              label: strings?.acceptRequested,
              onPress: () => Linking.openSettings(),
            },
            {
              label: strings?.cancelled,
            },
          ],
        });
        // Navigator.showAlert({
        //   icon: Images.warning,
        //   title: strings?.kycPermissionTitle,
        //   message: strings?.permissionDenied,
        //   positiveButton: {
        //     title: strings?.acceptRequested,
        //     onPress: () => Linking.openSettings(),
        //   },
        //   negativeButton: {
        //     title: strings?.cancelled,
        //   },
        // });
      }
    }
  };

  const captureFrontImage = () => {
    onOpenEkycSDK(EKYC_ORC);
  };

  const captureBackImage = () => {
    onOpenEkycSDK(EKYC_ORC, 'back');
  };

  const captureFaceImage = () => {
    onOpenEkycSDK(EKYC_FACE);
  };

  const extractCardInfo = async () => {
    const {identifyCard, ICBackPhoto, ICFrontPhoto} = contentRef.current;
    if (
      identifyCard &&
      ICFrontPhoto?.data &&
      (documentType === KYC_DOCUMENT_TYPE.PASSPORT ? true : ICBackPhoto?.data)
    ) {
      try {
        setLoading(true);
        const PhoneNumber = await getPhone();
        const extractData = await extractIdentityCardInfo({
          PhoneNumber,
          IdentityCardType: identifyCard.ICType,
          FrontPhoto: ICFrontPhoto.data,
          BackPhoto: ICBackPhoto.data,
          bank,
        });
        setLoading(false);
        ConsoleUtils.log('[extractCardInfo]', extractData);
        return extractData;
      } catch (e) {
        setLoading(false);
        // const {ErrorMessage = strings?.unknownError} = e || {};
      }
    } else {
      ConsoleUtils.warn('[extractCardInfo] Missing Data!');
    }
  };

  const compareUserFace = async () => {
    const {Avatar, extractCardInfo: _extractCardInfo = {}} = contentRef.current;
    const {CardID} = _extractCardInfo;
    if (CardID && Avatar?.data) {
      try {
        setLoading(true);
        const PhoneNumber = await getPhone();
        const result = await compareFace({
          PhoneNumber,
          CardId: CardID,
          FacePhoto: Avatar.data,
          bank,
        });
        setLoading(false);
        ConsoleUtils.log('[compareUserFace]', JSON.stringify(result));
        return result;
      } catch (e) {
        setLoading(false);
      }
    } else {
      ConsoleUtils.warn('[compareUserFace] Missing Data!');
    }
  };

  const verifyIdentityCard = info => {
    return new Promise(async (resolve, reject) => {
      if (info) {
        try {
          const PhoneNumber = await getPhone();
          const result = await identityCardVerify({
            PhoneNumber,
            IdentityCardInfor: info,
            bank,
          });
          ConsoleUtils.log('[verifyIdentityCard]', JSON.stringify(result));
          resolve(result);
        } catch (e) {
          ConsoleUtils.log('ERROR [verifyIdentityCard]', e);
          reject(e);
        }
      } else {
        ConsoleUtils.warn('[verifyIdentityCard] Missing Data!');
        reject();
      }
    });
  };

  return {
    disabledIdentify,
    disabledAvatar,
    verifyInfo: contentRef.current,
    showModalReVerify,
    onChange,
    onContinue,
    onUpdateAllInfo,
    onReVerify,
    onDoneIdentityCard,
    onDoneCaptureFace,
    kycType,
    captureFrontImage,
    captureBackImage,
    captureFaceImage,
    SDKImage,
    extractCardInfo,
    compareUserFace,
    verifyIdentityCard,
  };
};

export default useVerifyInfo;
