// 0	Kiểm tra số điện thoại đã đăng ký chưa
// 1	Đăng ký tài khoản
// 2	Đăng ký Smart OTP
// 3	Đồng bộ Smart OTP
// 4	Xác thực email chưa xác thực
// 5	Xác thực hành động thay đổi email qua số điện thoại
// 6	Xác thực hành động thay đổi email qua email cũ
// 7	Xác thực vào email mới sau khi thay đổi email
// 8	Xác thực hành động thay đổi số điện thoại qua số điện thoại cũ
// 9	Xác thực hành động thay đổi số điện thoại qua email
// 10	Xác thực số điện thoại mới bằng số điện thoại sau khi thay đổi
// 11	Quên mật khẩu
// 12	Nạp tiền qua ngân hàng đã liên kết
// 13	Rút tiền từ ngân hàng đã liên kết
// 14	Chuyển tiền ví – ví
// 15	Chuyển tiền ví – ví bằng QR Code
// 16	Đăng ký nạp ví tự động
// 17	Thanh toán phí giao thông
// 18	Thanh toán
// 19	Xác thực đăng nhập tài khoản trên thiết bị mới
const FUNCTION_TYPE = {
    REGISTER_ACCOUNT: 1,
    REGISTER_SMART_OTP: 2,
    SYNC_SMART_OTP: 3,
    AUTH_EMAIL: 4,
    CHANGE_UNAUTH_EMAIL: 5,
    CHANGE_EMAIL_BY_PHONE: 6,
    CHANGE_EMAIL_BY_EMAIL: 7,
    AUTH_NEW_PHONE_BY_PHONE: 8,
    AUTH_NEW_PHONE_BY_EMAIL: 9,
    AUTH_NEW_PHONE: 10,
    FORGOT_PASS: 11,
    RECHARGE_BY_BANK: 12,
    WITHDRAW_BY_BANK: 13,
    WALLET_BY_WALLET: 14,
    WALLET_BY_QR: 15,
    AUTO_RECHARGE: 16,
    TOLL_QRPAY_AUTO_RECHARGE: 17,
    PAYMENT_QRPAY: 18,
    CONFIRM_NEW_DEVICE: 19,
    PAYMENT_WITH_WALLET: 20,
    PAYMENT_WITH_LINKED_BANK: 21,
    PAYMENT_WITH_NAPAS: 22,
}
export default FUNCTION_TYPE