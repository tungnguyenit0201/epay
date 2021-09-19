import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useUser } from '../index';
import { PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions';
import Ekyc from 'utils/Ekyc';
import EKYC_ERROR from 'configs/Enums/EkycError';
import KYCType from 'configs/Enums/KYCType';
import {
    extractIdentityCardInfo,
    compareFace,
    identityCardVerify,
} from 'services/ekyc';
import Navigator from 'navigations/Navigator';
import { useTranslation } from 'context/Language';
import { ConsoleUtils } from 'utils/Console';
import { useLoading } from 'context/Common/utils';
import useAlert from 'utils/Alert';
const { SDK_SCREEN: { EKYC_ORC, EKYC_FACE } } = KYCType;

const useKYC = (documentType) => {
    const { dispatch, userInfo } = useUser();
    const { kycType } = userInfo;
    const [SDKImage, setSDKImage] = useState();
    const strings = useTranslation();
    const { setLoading } = useLoading();
    const { showError } = useAlert();

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
                imageBase64, //Side image: passport
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
            setSDKImage({
                data,
                path: `data:image/jpeg;base64,${data}`,
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

    const extractCardInfo = async (data = {}, bank) => {
        const { identifyCard, ICBackPhoto, ICFrontPhoto } = data;
        if (identifyCard
            && ICBackPhoto?.data
            && ICFrontPhoto?.data) {
            try {
                setLoading(true);
                const extractData = await extractIdentityCardInfo({
                    IdentityCardType: identifyCard.ICType,
                    FrontPhoto: ICFrontPhoto.data,
                    BackPhoto: ICBackPhoto.data,
                    bank,
                });
                setLoading(false);
                ConsoleUtils.log('[extractCardInfo]', JSON.stringify(extractData));
                return extractData;
            } catch (e) {
                setLoading(false);
                ConsoleUtils.log('ERROR [extractCardInfo]', e);
                const { ErrorMessage = strings?.unknownError } = e || {};
                // showError({ message: ErrorMessage });
                return {
                    "Address": "3123zzzz",
                    "BirthDay": "25-08-1991",
                    "CardID": 2201,
                    "CardNumber": "301382190",
                    "District": "",
                    "Extracted": 0,
                    "FullName": "Nguyễn Thanh Tâm",
                    "Gender": 1,
                    "ICType": 1,
                    "IssueDate": "20-07-2013",
                    "IssuePlace": "Long An",
                    "Province": "",
                    "ValidDate": "",
                    "Verified": 3,
                    "Ward": ""
                }
            }
        } else {
            ConsoleUtils.warn('[extractCardInfo] Missing Data!');
            showError();
        }
    };

    const compareUserFace = async (data = {}, bank) => {
        const { CardId, Avatar } = data;
        if (CardId && Avatar?.data) {
            try {
                setLoading(true);
                const result = await compareFace({
                    CardId,
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
                // showError({ message: ErrorMessage });
                return true;
            }
        } else {
            ConsoleUtils.warn('[compareUserFace] Missing Data!');
            showError();
        }
    };

    const verifyIdentityCard = (data = {}, bank) => {
        return new Promise(async (resolve, reject) => {
            const { IdentityCardInfor } = data;
            if (IdentityCardInfor) {
                try {
                    const result = await identityCardVerify({
                        IdentityCardInfor,
                        bank,
                    });
                    ConsoleUtils.log('[verifyIdentityCard]', JSON.stringify(result));
                    resolve(result);
                } catch (e) {
                    ConsoleUtils.log('ERROR [verifyIdentityCard]', e);
                    const { ErrorMessage = strings?.unknownError } = e || {};
                    showError({ message: ErrorMessage });
                    reject(e)
                }
            } else {
                ConsoleUtils.warn('[verifyIdentityCard] Missing Data!');
                showError();
                reject();
            }
        });
    };

    return {
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

export default useKYC;
