import {request} from 'utils/Request';
import {API} from 'configs';


export const mapBankNapas = async param => {
    let response = null;
    await request({
        url: API.BANK.LINK_NAPAS,
        method: 'post',
        params: param,
        success: res => {
            response = res;
        },
    });
    return response;
};

export const cashinNapas = async param => {
    let response = null;
    await request({
        url: API.BANK.LINK_NAPAS,
        method: 'post',
        params: param,
        success: res => {
            response = res;
        },
    });
    return response;
};


export const getIdentifyInfo = async ({phone,BankId}) => {
    let response = null;
    await request({
        url: API.BANK.GET_BANK_IC_INFO,
        method: 'post',
        params: {PhoneNumber: phone,BankId},
        success: res => {
            response = res;
        },
    });
    return response;
};

export const activeUser = async param => {
    const {phone, BankConnectInfo} = param || {};
    let response = null;
    await request({
        url: API.BANK.ACTIVE_USER,
        method: 'post',
        params: {
            'MsgType': 'active_customer',
            BankConnectInfo: BankConnectInfo || {},
            PhoneNumber: phone,
        },
        success: res => {
            response = res;
        },
    });
    return response;
};

export const activeCustomerOtp = async param => {
    const {phone, TransState, otp} = param || {};
    let response = null;
    await request({
        url: API.BANK.ACTIVE_USER_OTP,
        method: 'post',
        params: {
            PhoneNumber: phone,
            'MsgType': 'link_card',
            ...param,
        },
        success: res => {
            response = res;
        },
    });
    return response;
};

export const getConnectedBank = async ({phone}) => {
    let response = null;
    await request({
        url: API.USER.GET_CONNECTED_BANK,
        method: 'post',
        params: {PhoneNumber: phone},
        success: res => {
            response = res;
        },
    });
    return response;
};

export const getDomesticBank = async ({phone}) => {
    let response = null;
    await request({
        url: API.BANK.GET_DOMESTIC_BANKS,
        method: 'post',
        params: {PhoneNumber: phone},
        success: res => {
            response = res;
        },
    });
    return response;
};
export const getNapasBank = async ({phone}) => {
    let response = null;
    await request({
        url: API.BANK.GET_NAPAS_BANKS,
        method: 'post',
        params: {PhoneNumber: phone},
        success: res => {
            response = res;
        },
    });
    return response;
};

export const getInternationalBank = async ({phone}) => {
    let response = null;
    await request({
        url: API.BANK.GET_INTERNATIONAL_BANKS,
        method: 'post',
        params: {PhoneNumber: phone},
        success: res => {
            response = res;
        },
    });
    return response;
};

export const getConnectedBankDetail = async ({phone, bankID}) => {
    let response = null;
    await request({
        url: API.BANK.GET_CONNECTED_BANK_DETAIL,
        method: 'post',
        params: {PhoneNumber: phone, BankConnectId: bankID},
        success: res => {
            response = res;
        },
    });
    return response;
};
