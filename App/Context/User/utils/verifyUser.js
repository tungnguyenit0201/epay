import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import Navigator from 'navigations/Navigator';
import { ERROR_CODE, SCREEN } from 'configs/Constants';
import {
  updatePersonalInfo,
  updateUserAddress,
  updateIdentify,
} from 'services/user';
import { useAsyncStorage, useError, useLoading } from 'context/Common/utils';
import _ from 'lodash';
import { useUser } from '..';
import { useTranslation } from 'context/Language';
import { useSelectRegion, useUserInfo } from 'context/User/utils';
import { PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions';
import Ekyc from 'utils/Ekyc';
import EKYC_ERROR from 'configs/Enums/EkycError';
import KYCType from 'configs/Enums/KYCType';
import {
  extractIdentityCardInfo,
  compareFace,
  identityCardVerify,
} from 'services/ekyc';
import { ConsoleUtils } from 'utils/Console';
import useAlert from 'utils/Alert';

const {
  SDK_SCREEN: {
    EKYC_ORC,
    EKYC_FACE,
  },
  KYC_DOCUMENT_TYPE,
} = KYCType;
const KYC_FLOW = {
  BANK: 'bank',
};

const useVerifyInfo = (initialValue = {}) => {
  const contentRef = useRef(initialValue);
  const { setLoading } = useLoading();
  const { setError } = useError();
  const { dispatch, userInfo } = useUser();
  const { getPhone } = useAsyncStorage();
  const { onGetAllInfo } = useUserInfo();
  let [disabledIdentify, setDisabledIdentify] = useState(true);
  let [disabledAvatar, setDisabledAvatar] = useState(true);
  const [showModalReVerify, setShowModalReVerify] = useState(false);
  const { onClearRegionData } = useSelectRegion();
  const { kycType } = userInfo;
  const [SDKImage, setSDKImage] = useState();
  const strings = useTranslation();
  const { showError } = useAlert();
  const documentType = contentRef.current?.identifyCard?.ICType;
  const eKYC = kycType === KYCType.EKYC;
  const bank = contentRef.current?.KYCFlow === KYC_FLOW.BANK;

  const onChange = (key, value) => {
    contentRef.current[key] = value;
    setDisabledIdentify(
      Boolean(
        !contentRef.current?.ICFrontPhoto || !contentRef.current?.ICBackPhoto,
      ),
    );
    (key === 'Avatar') && setDisabledAvatar(Boolean(!value));
  };

  const onContinue = screen => {
    Navigator.navigate(screen, contentRef.current);
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

  const onUpdatePersonalInfo = ({
    ICFullName,
    Avatar,
    DateOfBirth,
    Email,
    SexType,
  }, showErrorMessage = true) => {
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

  const onUpdateUserAddress = ({ Address, Ward, County, Provincial }, showErrorMessage = true) => {
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
          data: { Address, Ward, County, Provincial },
        });
        dispatch({
          type: 'SET_REGION',
          data: { Ward: '', County: '', Provincial: '' },
        });
        resolve();
      } else {
        showErrorMessage && setError(result);
        reject(result);
      }
    });
  };

  const onUpdateAllInfo = async value => {
    try {
      const updateInfo = { ...contentRef.current, ...value };
      if (eKYC) {
        const { extractCardInfo } = contentRef.current;
        const { CardID, CardNumber, Step, ICType, ValidDate, Verified } = extractCardInfo || {};
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
          ValidDate,
          Verified,
          Ward: value.Ward,
        });
      } else {
        await onUpdateIdentify(updateInfo);
      }
      await Promise.all([
        onUpdatePersonalInfo(updateInfo, false),
        onUpdateUserAddress(updateInfo, false),
        onGetAllInfo(),
        onClearRegionData(),
      ]);
      Navigator.navigate(SCREEN.VERIFY_SUCCESS);
    } catch (e) {
      const { ErrorMessage = strings?.unknownError } = e || {};
      showError({ message: ErrorMessage });
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
        Navigator.push(SCREEN.CHOOSE_IDENTITY_CARD);
    }
  };

  const onDoneIdentityCard = async () => {
    if (eKYC) {
      const result = await extractCardInfo();
      if (result) {
        onChange('extractCardInfo', { ...result });
        onContinue(SCREEN.VERIFY_IDENTITY_CARD);
      }
    } else {
      onContinue(SCREEN.VERIFY_IDENTITY_CARD);
    }
  };

  const onDoneCaptureFace = async () => {
    if (eKYC) {
      const { extractCardInfo: cardInfo, Avatar } = contentRef.current;
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
      dispatch({ type: 'SET_KYC_TYPE', data: 'EKYC' });
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
        titleFront: backSide ? 'Mặt sau' : 'Mặt trước',
      };
    };

    const onSDKOrcResult = async (sdkResult) => {
      const { errorCode } = sdkResult || {};

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
            ConsoleUtils.warn('SDK error like permission or save data error by outofmemory...etc');
            break;
        }
        return;
      }
      const data = screen === EKYC_ORC ? imageBase64 : nearImageBase64;
      const imageDisplay = screen === EKYC_ORC ? imageCropBase64 : nearImageBase64;
      setSDKImage({
        data,
        path: `data:image/jpeg;base64,${imageDisplay}`,
      });
    };

    const EKYC_PERMISSIONS = Platform.OS === 'android'
      ? [
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]
      : [
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ];


    const checkPermissionsResult = await checkMultiple(EKYC_PERMISSIONS);
    const isCheckPermissionsGranted = EKYC_PERMISSIONS.every(permission => checkPermissionsResult[permission] === RESULTS.GRANTED);
    if (isCheckPermissionsGranted) {
      openSDK();
    } else {
      const requestPermissionsResult = await requestMultiple(EKYC_PERMISSIONS);
      const isRequestPermissionsGranted = EKYC_PERMISSIONS.every(permission => requestPermissionsResult[permission] === RESULTS.GRANTED);
      if (isRequestPermissionsGranted) {
        openSDK();
      } else {
        //Permission error
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
    const { identifyCard, ICBackPhoto, ICFrontPhoto } = contentRef.current;
    if (identifyCard
      && ICFrontPhoto?.data
      && (documentType === KYC_DOCUMENT_TYPE.PASSPORT
        ? true
        : ICBackPhoto?.data
      )
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
        ConsoleUtils.log('ERROR [extractCardInfo]', e);
        const { ErrorMessage = strings?.unknownError } = e || {};
        showError({ message: ErrorMessage });
        // return {
        //   'Address': '3123zzzz',
        //   'BirthDay': '25-08-1991',
        //   'CardID': 2201,
        //   'CardNumber': '301382190',
        //   'District': '',
        //   'Extracted': 0,
        //   'FullName': 'Nguyễn Thanh Tâm',
        //   'Gender': 1,
        //   'ICType': documentType,
        //   'IssueDate': '20-07-2013',
        //   'IssuePlace': 'Long An',
        //   'Province': '',
        //   'ValidDate': '',
        //   'Verified': 3,
        //   'Ward': '',
        //   'Step': 0,
        // };
      }
    } else {
      ConsoleUtils.warn('[extractCardInfo] Missing Data!');
      showError();
    }
  };

  const compareUserFace = async () => {
    const { Avatar, extractCardInfo: _extractCardInfo = {} } = contentRef.current;
    const { CardID } = _extractCardInfo;
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
        ConsoleUtils.log('ERROR [compareUserFace]', e);
        const { ErrorMessage = strings?.unknownError } = e || {};
        showError({ message: ErrorMessage });
      }
    } else {
      ConsoleUtils.warn('[compareUserFace] Missing Data!');
      showError();
    }
  };

  const verifyIdentityCard = (info) => {
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
          const { ErrorMessage = strings?.unknownError } = e || {};
          showError({ message: ErrorMessage });
          reject(e);
        }
      } else {
        ConsoleUtils.warn('[verifyIdentityCard] Missing Data!');
        showError();
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
