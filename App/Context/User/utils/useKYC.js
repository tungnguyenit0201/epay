import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useUser } from '../index';
import { PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions';
import Ekyc from 'utils/Ekyc';
import EKYC_ERROR from 'configs/Enums/EkycError';
import KYCType from 'configs/Enums/KYCType';

const { SDK_SCREEN: { EKYC_ORC, EKYC_FACE } } = KYCType;

const useKYC = (documentType) => {
    const { dispatch, userInfo } = useUser();
    const { kycType } = userInfo;
    const [SDKImage, setSDKImage] = useState();

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
                    Ekyc.captureDocument(ekycSDKConfig(side), onSDKOrcResult);
                    break;
                case EKYC_FACE:
                    Ekyc.captureFace(ekycSDKConfig(side), onSDKOrcResult);
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
                        console.warn('User cancelled');
                        break;
                    case EKYC_ERROR.SDK_ERROR:
                        console.warn('SDK error like permission or save data error by outofmemory...etc');
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

    return [
        kycType,
        captureFrontImage,
        captureBackImage,
        captureFaceImage,
        SDKImage,
    ];
};

export default useKYC;
