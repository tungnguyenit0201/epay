const ROOT = 'https://dev.epayservices.com.vn:9443/api/';
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
  },
  USER: {
    UPDATE_PASSWORD: 'account/change_password',
    UPDATE_PERSONAL_INFO: 'account/update_personal_info',
    GET_PERSONAL_INFO: 'account/get_personal_info',
    GET_ALL_INFO: 'account/get_all_info',
    UPDATE_USER_ADDRESS: 'account/update_address_info',
    UPDATE_IDENTIFY: 'account/update_identify_info',
    GET_CONNECTED_BANK: 'wallet/get_connected_bank',
  },
};
