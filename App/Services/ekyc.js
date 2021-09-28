import { API } from 'configs';
import { request } from 'utils/Request';
import { ERROR_CODE } from 'configs/Constants';

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
        await request({
            url,
            method: 'post',
            params: {
                PhoneNumber,
                IdentityCardType,
                FrontPhoto,
                BackPhoto,
            },
            success: (res = {}) => {
                const { ErrorCode, IdentityCardInfor } = res;
                if (ErrorCode === ERROR_CODE.SUCCESS && IdentityCardInfor) {
                    resolve(IdentityCardInfor);
                }
                reject(res);
            },
            failure: err => {
                reject(err);
            },
        });
    });
};

const compareFace = async ({
    PhoneNumber,
    CardId,
    FacePhoto,
    bank,
}) => {
    return new Promise(async (resolve, reject) => {
        const url = bank
            ? API.EKYC.BANK_COMPARE_FACE
            : API.EKYC.COMPARE_FACE;
        await request({
            url,
            method: 'post',
            params: {
                PhoneNumber,
                CardId,
                FacePhoto,
            },
            success: (res = {}) => {
                const { ErrorCode } = res;
                if (ErrorCode === ERROR_CODE.SUCCESS) {
                    resolve(res);
                }
                reject(res);
            },
            failure: err => {
                reject(err);
            },
        });
    });
};

const identityCardVerify = async ({
    PhoneNumber,
    IdentityCardInfor,
    bank,
}) => {
    return new Promise(async (resolve, reject) => {
        const url = bank
            ? API.EKYC.BANK_IDENTITY_CARD_VERIFY
            : API.EKYC.IDENTITY_CARD_VERIFY;
        await request({
            url,
            method: 'post',
            params: {
                PhoneNumber,
                IdentityCardInfor,
            },
            success: (res = {}) => {
                const { ErrorCode } = res;
                if (ErrorCode === ERROR_CODE.SUCCESS) {
                    resolve(res);
                }
                reject(res);
            },
            failure: err => {
                reject(err);
            },
        });
    });
};

export {
    extractIdentityCardInfo,
    compareFace,
    identityCardVerify,
};
