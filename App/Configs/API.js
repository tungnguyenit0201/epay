const ROOT_LIST = [
  'https://dev2.epayservices.com.vn:9443/api/v2/',
  'https://test2.epayservices.com.vn:9443/api/v2/',
  'https://test3.epayservices.com.vn:9443/api/v2/',
  'https://test4.epayservices.com.vn:9443/api/v2/',
];
const ROOT = ROOT_LIST[0];
const TIMEOUT = 10000;

export default {
  ROOT,
  ROOT_LIST,
  TIMEOUT,
  AUTH: {
    CHECK_PHONE: 'account/check_exist',
    LOGIN: 'account/login_account',
    REGISTER: 'account/create_account',
  },
  COMMON: {
    GEN_OTP: 'common/otp/gen_otp',
    CONFIRM_OTP: 'common/otp/confirm_otp',
    CHECK_SMART_OTP: 'smartotp/smartotp_check_active',
    GET_SMART_OTP_INFO: 'smartotp/get_smartotp_active',
    ACTIVATE_SMART_OTP: 'smartotp/smartotp_active',
    CHECK_SMART_OTP_KEY: 'smartotp/smartotp_key_check',
    CHANGE_SMART_OTP_PASSWORD: 'smartotp/smartotp_pass_change',
    SYNC_SMART_OTP: 'smartotp/smartotp_synchronize',
    GEN_SMART_OTP: 'smartotp/gen_smart_otp',
    GET_CONFIG_INFO: 'config/get_config_info',
    GET_TERMS: 'common/get_terms_of_service',
    GET_BANNER: 'ads/get_banner',
  },
  USER: {
    UPDATE_FORGOT_PASSWORD: 'account/change_password',
    UPDATE_PERSONAL_INFO: 'account/update_personal_info',
    GET_PERSONAL_INFO: 'account/get_personal_info',
    GET_ALL_INFO: 'account/get_all_info',
    GET_ID_INFO: 'account/get_ic_info',
    UPDATE_USER_ADDRESS: 'account/update_address_info',
    UPDATE_IDENTIFY: 'account/update_identify_info',
    GET_CONNECTED_BANK: 'wallet/get_connected_bank',
    CONFIRM_PASSWORD: 'account/confirm_password',
    GET_LIMIT: 'security/get_limit',
    GET_SETTINGS_INFO: 'setting/get_all_info',
    GET_QRCODE: 'account/get_qrcode',
    VERIFY_EMAIL: 'account/authentication_email',
    UPDATE_EMAIL: 'account/change_email',
    UPDATE_AVATAR: 'account/update_avatar',
    UPDATE_PASSWORD: 'account/proactive_change_password',
  },
  BANK: {
    GET_BANK_IC_INFO: 'bank/get_ic_info',
    ACTIVE_USER: 'bank/active_customer',
    ACTIVE_USER_OTP: 'bank/active_customer_otp',
    GET_DOMESTIC_BANKS: 'bank/get_domestic_banks',
    GET_NAPAS_BANKS: 'bank/get_napas_banks',
    GET_INTERNATIONAL_BANKS: 'bank/get_international_banks',
    LINK_NAPAS: 'bank/link_card',
    CASH_IN_NAPAS: 'bank/cash_in_napas',
    CHECK_TRANS_NAPAS: 'bank/check_trans_napas',
  },
  WALLET: {
    GET_BANK_IC_INFO: 'bank/get_ic_info',
    ACTIVE_USER: 'bank/active_customer',
    ACTIVE_USER_OTP: 'bank/active_customer_otp',
    CHECK_AMOUNT_LIMIT: 'wallet/check_amount_limit',
    GET_DOMESTIC_BANKS: 'bank/get_domestic_banks',
    GET_NAPAS_BANKS: 'bank/get_napas_banks',
    GET_INTERNATIONAL_BANKS: 'bank/get_international_banks',
    GET_CONNECTED_BANK_DETAIL: 'wallet/get_connected_bank_detail',
    CHANGE_LIMIT: 'security/change_limit',
    FEE_CALCULATOR: 'bank/fee_calculator',
    PAYIN_CONNECTED_BANK: 'bank/payin_connected_bank',
    GET_WALLET_INFO: 'account/get_wallet_info',
    GET_HISTORY: 'history/get_history',
    CASH_OUT: 'bank/cashout',
    CASH_OUT_CONFIRM: 'bank/cashin_confirm',
    GET_HISTORY_DETAIL: 'history/get_detail',
    GET_QRCODE_INFO: 'qr/get_qr_info',
    GET_TRANSFER_USER: 'account/get_user_detail',
    CASH_IN: 'bank/cashin',
    CASH_IN_CONFIRM: 'bank/cashin_confirm',
    CASH_IN_NAPAS: 'bank/cash_in_napas',
    DEFAULT_BANK_CONNECT: 'default_bank_connect',
    PROMO_APPLY: 'payment/promo_apply',
    GET_PROMOTION: 'payment/get_promotions',
    PAYMENT: 'payment/payment',
    MONEY_TRANSFER: 'wallet/money_transfer',
    GET_SOURCE_MONEY: 'wallet/get_source_money',
  },
  ADDRESS: {
    GET_PROVINCE: 'region/get_province_info',
    GET_DISTRICT: 'region/get_district_info',
    GET_WARD: 'region/get_ward_info',
  },
  NOTIFY: {
    CHARGES_NOTIFY: 'notify/charges_notify',
    PROMOTION_NOTIFY: 'notify/promotion_notify',
    OTHER_NOTIFY: 'notify/other_notify',
    GET_NOTIFY: 'notify/get_notify',
    READ_NOTIFY: 'notify/read_notify',
  },
  EKYC: {
    EXTRACT_IDENTITY_CARD_INFO: 'account/extract_identity_card_info',
    COMPARE_FACE: 'account/compare_face',
    IDENTITY_CARD_VERIFY: 'account/identity_card_verify',
    BANK_EXTRACT_IDENTITY_CARD_INFO: 'bank/extract_identity_card_info',
    BANK_COMPARE_FACE: 'bank/compare_face',
    BANK_IDENTITY_CARD_VERIFY: 'bank/identity_card_verify',
  },
};
