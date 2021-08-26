const ROOT = 'https://test.epayservices.com.vn:9443/api/';
const TIMEOUT = 10000;

export default {
  ROOT,
  TIMEOUT,
  AUTH: {
    GET_CONFIG_INFO: 'config/get_config_info',
    CHECK_PHONE: 'account/check_exist',
    LOGIN: 'v2/account/login_account',
    REGISTER: 'account/create_account',
  },
  COMMON: {
    GEN_OTP: 'common/otp/gen_otp',
    CONFIRM_OTP: 'common/otp/confirm_otp',
    CHECK_SMART_OTP: 'smartotp/get_smartotp_active',
    ACTIVATE_SMART_OTP: 'smartotp/smartotp_check_active',
  },
  USER: {
    UPDATE_PASSWORD: 'account/change_password',
    UPDATE_PERSONAL_INFO: 'account/update_personal_info',
    GET_PERSONAL_INFO: 'account/get_personal_info',
    GET_ALL_INFO: 'account/get_all_info',
    UPDATE_USER_ADDRESS: 'account/update_address_info',
    UPDATE_IDENTIFY: 'account/update_identify_info',
    GET_CONNECTED_BANK: 'wallet/get_connected_bank',
    CONFIRM_PASSWORD: 'account/confirm_password',
    GET_LIMIT: 'security/get_limit',
  },
  WALLET: {
    GET_DOMESTIC_BANKS: 'bank/get_domestic_banks',
    GET_INTERNATIONAL_BANKS: 'bank/get_international_banks',
    GET_CONNECTED_BANK_DETAIL: 'wallet/get_connected_bank_detail',
    CHANGE_LIMIT: 'security/change_limit',
  },
  ADDRESS: {
    GET_PROVINCE: 'region/get_province_info',
    GET_DISTRICT: 'region/get_district_info',
    GET_WARD: 'region/get_ward_info',
  },
};
