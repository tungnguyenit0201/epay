const ERROR_CODE = {
  SUCCESS: 0, //Thành công
  ACCOUNT_IS_NOT_EXISTED_OR_INVALID_PASSWORD: 1, //Tài khoản không tồn tại hoặc mật khẩu sai
  ACCOUNT_IS_LOCKED: 2, //Tài khoản đang bị khóa
  ACCOUNT_WALLET_NO_EXIST: 1,
  TIME_OUT: 100,
  NOT_FIND_CUSTOMER_BANK: 102,
  VcbTransFailed: 101, // Giao dịch không thành công
  VcbOverTransactionLimit: 103, //Vượt quá hạn mức giao dịch trong 1 lần
  VcbOverDailyLimit: 104, // Vượt quá hạn mức giao dịch trong 1 ngày
  VcbInvalidAccount: 105, // Tài khoản không hợp lệ
  VcbBalanceNotEnoughAmount: 106, // Tài khoản trích nợ không đủ số dư
  VcbNotEnoughRequireAmount: 109, // Số tiền giao dịch nhỏ hơn hạn mức trên lần
  REQUIRED_BANK_OTP: 110, //
  LINK_WRONG_OTP: 111,
  ERROR_SEND_OTP: 112,
  LINK_OTP_EXPRISE: 113,
  LINK_WRONG_OTP_EXCEED: 114,
  NOT_EXACTLY: 115,
  ERROR_IMAGE_PASSPORT: 116,
  ERROR_PHONE: 119,
  VcbCustomerCodeExist: 120, //Customer code đã tồn tại
  VcbTransactionExist: 121, // Giao dịch đã tồn tại
  ERROR_BANK: 122,
  MAINTAIN_SYSTEM: 123,
  ERROR_SYSTEM_BANK: 124,
  BANK_PENDING_VERIFIED_IC_INFO: 125, // Chờ duyệt thông tin giấy tờ tuỳ thân đã thay đổi.
  BANK_PENDING_VERIFIED_IC_INFO_OUT_OF_TIME: 126, // Chờ duyệt thông tin giấy tờ tuỳ thân đã thay đổi quá x giờ.
  BANK_VERIFIED_IC_INFO_REJECTED: 127, // Yêu cầu thay đổi bị từ chối.
  BANK_ACCOUNT_NOT_ACTIVE_SMS_BANKING: 128, // Tài khoản bank chưa đăng ký sms banking

  PHONE_IS_REGISTERED: 3, //Số điện thoại xxx đã được đăng ký
  SYSTEM_IS_UPGRADING: 4, //Hệ thống đang nâng cấp, vui lòng quay lại sau
  OTP_IS_NOT_CORRECT: 5, //OTP không đúng
  ACCOUNT_IS_NOT_REGISTERED: 6, //Tài khoản chưa đăng ký Ví điện tử của Epay
  PHONE_IS_NOT_REGISTERED: 7, //Số điện thoại của quý khách chưa được đăng ký
  SMART_OTP_IS_NOT_ACTIVATED: 8, //Smart OTP chưa được kích hoạt
  OTP_IS_EXPIRED: 9, //OTP hết hiệu lực
  OTP_IS_CREATED_FAIL: 10, //Tạo mã giao dịch thất bại
  ACCOUNT_IS_EXISTED: 11, //Tài khoản đã tồn tại
  EMAIL_IS_NOT_FOUND: 12, //Không tìm thấy email trong hệ thống
  EMAIL_IS_AUTHENTICATED: 13, //Email đã được xác thực
  IB_IS_NOT_REGISTERED: 14, //Chưa đăng ký sử dụng dịch vụ Internet banking(Lỗi liên kết thẻ tín dụng)
  PENDING: 15, //Kết quả trả về Pending – chờ xử lý
  CREDIT_CARD_IS_ALREADY_LINKED: 16, //Đã liên kết với thẻ tín dụng xxxx nhưng vẫn yêu cầu liên kết
  TRANSACTION_FAIL: 17, //Giao dịch thất bại
  QR_CODE_NOT_FOUND: 21, //Mã QR không được tìm thấy
  TRANSACTION_NOT_FOUND: 22, //Giao dịch không tìm thấy
  TRANSACTION_TYPE_INVALID: 23, //Loại giao dịch không chính xác
  TRANSACTION_FORMAT_INVALID: 24, //Hình thức giao dịch không chính xác
  LOGIN_PASSWORD_INCORRECT: 25, //Mật khẩu đăng nhập không đúng
  SMART_OTP_PASSWORD_INCORRECT: 26, //Mật khẩu SmartOTP không đúng
  NEW_DEVICE_CONFIRM_REQUIRED: 27,
  OTP_REQUIRED_TO_CONFIRM_NEW_DEVICE_OUT_OF_LIMIT: 28,
  PASSWORD_CHANGE_REQUIRED_AFTER_LONG_TIME_NO_CHANGE: 29,
  USER_INFO_VERIFY_REQUIRED_AFTER_LONG_TIME_NO_MAKE_TRANS: 30,
  USER_INFO_NOT_MATCH: 31,
  NEW_PASSWORD_SIMILAR_TO_LAST_ONE: 32,
  FEATURE_PASSWORD_WRONG_OVER_TIME: 33,
  FEATURE_LOCK_BY_PASSWORD_WRONG: 34,
  FEATURE_CONFIRM_OTP_WRONG_OVER_TIME: 40,
  FEATURE_LOCK_BY_CONFIRM_OTP_WRONG: 41,
  FEATURE_RESEND_OTP_OVER_TIME: 42,
  FEATURE_LOCK_BY_RESEND_OTP: 43,
  FEATURE_SMART_OTP_PIN_WRONG: 44,
  FEATURE_SMART_OTP_PIN_WRONG_OVER_TIME: 45,
  FEATURE_LOCK_BY_SMART_OTP_PIN_WRONG: 46,
  EXTRACT_IDENTITY_CARD_OVER_TIMES: 51,
  INVALID_FORMAT_CONTENT: 98, //Định dạng bản tin không hợp lệ
  SYSTEM_ERROR: 99, //Lỗi hệ thống
  NOT_SEARCH: 210,

  //Error map with tollcollection
  TollNotRegister: 200, //Chưa đăng ký dịch vụ giao thông
  TollRegisterNotAccept: 201, //Thông tin đăng ký dịch vụ thanh toán giao thông bị từ chối
  TollRequestHasBeenSent: 202, //Yêu cầu đăng ký dịch vụ giao thông đã được gửi đi
  TollWaitForAccept: 203, //Yêu cầu chờ xử lý
  TollPlateNumberHasExisted: 204, //Biển số xe đã được đăng ký
  TollRFIDHasExisted: 205, //Số thẻ RFID đã được đăng ký
  TollRequestHasExisted: 206, //Yêu cầu đăng ký đã tồn tại
  TollTimeout: 207, //Timeout
  TollTransactionFailed: 208, //Giao dịch thất bại
  TollVehicleInfoNotExist: 209, //Không tìm thấy thông tin xe
  TollInformationNotFound: 210, //Không tìm thấy kết quả phù hợp

  //Error map with qrpay
  QrPayHasBeenPaid: 212, //Giao dịch đã được thanh toán
  QrPayNotEnoughRequireAmount: 214, //Giao dịch nhỏ hơn hạn mức 1 lần
  QrPayOverTransactionLimit: 213, //Giao dịch vượt quá hạn mức / lần
  QrPayOverDailyLimit: 215, //Giao dịch vượt quá hạn mức / ngày
  QrPayOverMonthlyLimit: 216, //Giao dịch vượt quá hạn mức / tháng
  QrPayTransactionExist: 217, //Mã giao dịch đã tồn tại
  QrPayNotEnoughAmount: 219, //Tài khoản không đủ số dư
  QrPayOtpInvalid: 220, //Sai mã OTP
  QrPayOtpExpired: 221, //Mã OTP không tồn tại hoặc đã hết hạn
  QrPayNeedOtp: 222, //Yêu cầu nhập OTP
  PromoCodeInvalid: 223, //Mã km không hợp lệ
  PromoCodeOver: 224, //Mã km đã hết lượt sử dụng
  PromoCodeUsed: 225, //Tài khoản đã sử dụng mã khuyến mại hết số lượt cho phép
  PromoCodeNonStart: 226, //Mã km chưa có hiệu lực
  TransactionExpired: 227, //Giao dịch quá thời gian thao tác

  /**
   * QR Error Type
   *
   * @param errorType
   * @return
   */
  QrCodeInvalid: 211, //Mã qr không hợp lệ
  QrCodePaymentExists: 212, //Mã qr đã thanh toán
  QrCodeExpired: 218, //Mã qr đã hết hạn
  NoBankLinkYet: 228, //Chưa liên kết ngân hàng
  MerchantInvalid: 229, //Mã đối tác không hợp lệ
  OrderInvalid: 230, //Mã đơn hàng không hợp lệ

  //Payment gateway error code
  GwMerchantNotFound: 301, // Mã nhà cung cấp không hợp lệ
  GwTransactionCancel: 302, // Giao dịch bị huỷ bởi người dùng
  GwTransactionExpired: 303, // Giao dịch hết hạn thanh toán
  GwSystemMaintenance: 304, // Hệ thống cổng bảo trì
  GwTransactionHasBeenPaid: 305, // Giao dịch đã được thanh toán
  GwTransactionExist: 306, // Giao dịch đã tồn tại
  GwPaymentMethodInvalid: 307, // Phương thức thanh toán không hợp lệ
  GwOrderNotFound: 308, // Đơn hàng không được tìm thấy
  GwTransactionProcessing: 309, // Giao dịch đang được xử lý

  //Napas error code
  NAPAS_LOCKED_CARD: 420, //Thẻ bị khóa
  NAPAS_INVALID_CARDINFO: 421, //Thông tin thẻ không chính xác
  NAPAS_EXPIRED_CARD: 422, //Thẻ bị hết hạn
  NAPAS_TIMED_OUT: 423, //Timeout với ngân hàng
  NAPAS_BANK_ERROR: 424, //Lỗi với ngân hàng
  NAPAS_INSUFFICIENT_FUNDS: 425, //Số dư không đủ
  NAPAS_INVALID_CHECKSUM: 426, //Lỗi checksum
  NAPAS_TRANSACTION_NOT_SUPPORTED: 427, //Lỗi với ngân hàng
  NAPAS_PENDING_FOR_OTP: 428, //Chờ nhập OTP
  NAPAS_CARD_LIMIT_EXCEEDED: 429, //Số tiền vượt quá hạn mức giao dịch ngày tại ngân hàng
  NAPAS_UNREGISTERED_CARD: 430, //Thẻ chưa đăng ký dịch vụ thanh toán trực tuyến
  NAPAS_INVALID_OTP: 431, //OTP không đúng
  NAPAS_INVALID_PASSWORD: 432, //Password không đúng
  NAPAS_INVALID_OTP3: 433, //OTP không đúng
  NAPAS_INVALID_CARDNAME: 434, //Tên chủ thẻ không chính xác
  NAPAS_INVALID_CARDNO: 435, //Số thẻ không đúng
  NAPAS_INVALID_ISSDATE: 436, //Ngày phát hành thẻ không đúng
  NAPAS_INVALID_DATE: 437, //Ngày hiệu lực thẻ không đúng
  NAPAS_INVALID_EXPDATE: 438, //Ngày hết hạn thẻ không đúng
  NAPAS_OTP_TIMED_OUT: 439, //OTP đã hết hiệu lực
  NAPAS_PENDING_FOR_CARDVER: 440, //Thông tin thẻ chưa được xác minh
  NAPAS_INELIGIBLE: 441, //Thẻ không đủ điều kiện thanh toán
  NAPAS_TRANSACTION_LIMIT_EXCEEDED: 442, //Giá trị thanh toán vượt quá hạn mức tối đa của Ngân hàng
  NAPAS_VALUE_EXCEEDED_LIMIT: 443, //Giá trị thanh toán vượt quá hạn mức tối đa của Ngân hàng
  NAPAS_PENDING_FOR_PURCHASE: 444, //Lỗi với ngân hàng
  NAPAS_AUTHENTICATION_FAILED: 445, //Thông tin xác thực không đúng
  NAPAS_EXPIRED_SESSION: 446, //Phiên giao dịch đã hết hạn
  NAPAS_TRANSACTION_BELOW_LIMIT: 448, //Giá trị thanh toán không đạt hạn mức tối thiểu của Ngân hàng
  NAPAS_TRANSACTION_OUT_OF_LIMIT_BANK: 449, //Giá trị thanh toán nằm ngoài hạn mức quy định của Ngân hàng
  NAPAS_UNDETERMINED_BALANCE: 450, //Lỗi với ngân hàng
  NAPAS_TRANSACTION_OUT_OF_LIMIT_PG: 451, //Giá trị thanh toán nằm ngoài hạn mức quy định của Ngân hàng
  NAPAS_CARD_ACCOUNT_NOT_ALLOWED: 452, //Thẻ hoặc tài khoản của Qúy khách không được phép thanh toán
  NAPAS_FINISHED_PAYMENT: 453, //Đơn hàng đã được thanh toán trước đó
  NAPAS_ISSUER_RES_CODE_NOT_FOUND: 454, //Lỗi với ngân hàng
  NAPAS_ISSUER_RES_CODE_DUPLICATE: 455, //Lỗi với ngân hàng
  NAPAS_OTHER_ERROR: 456, //Lỗi với ngân hàng
  NAPAS_ORDERS_NOT_FOUND: 457, //Order không tìm thấy
  NAPAS_ORDERS_NOT_PAID: 458, //Đơn hàng không hợp lệ
  NAPAS_DUPLICATE_ORDERS: 459, //Lặp đơn hàng -> không hợp lệ
  NAPAS_MC_ORDER_ID_DUPLICATE: 460, //Lặp đơn hàng -> không hợp lệ
  NAPAS_MC_TRANS_ID_DUPLICATE: 461, //Lặp đơn hàng -> không hợp lệ
  NAPAS_CANCEL: 462, //Giao dịch đã bị hủy bởi người dùng
  NAPAS_TOKEN_EXISTED: 463, //Lỗi với ngân hàng
  NAPAS_INVALID_INFO_FOR_CASHIN: 464, //Lỗi với ngân hàng
  NAPAS_INVALID_INFO_FOR_WHITELABEL: 465, //Lỗi với ngân hàng
  NAPAS_INVALID_MERCHANT: 466, //Lỗi với ngân hàng
  NAPAS_INVALID_REQUEST: 467, //Sai định dạng request
  NAPAS_INVALID_TOKEN: 468, //Lỗi với ngân hàng
  NAPAS_TOKEN_NOT_FOUND: 469, //Lỗi với ngân hàng
  NAPAS_INVALID_CARD: 470, //Số thẻ sai
  NAPAS_EXPIRED_SESSION_EX: 471, //Phiên thanh toán đã hết hạn
  NAPAS_BLACKLISTED_BIN: 472, //Giao dịch bị từ chối vì số BIN trong blacklist
  NAPAS_BLACKLISTED_IP: 473, //Giao dịch bị từ chối vì IP bị chặn
  NAPAS_BIN_VELOCITY: 474, //Giao dịch bị từ chối
  NAPAS_IP_VELOCITY: 475, //Giao dịch của quý khách bị từ chối
  NAPAS_VALUE_EXCEEDED_LIMIT_EX: 476, //Giao dịch của quý khách bị từ chối
  NAPAS_MISSING_DATA: 477, //Sai định dạng request
  NAPAS_INVALID_DATA: 478, //Sai định dạng request
  NAPAS_INVALID_AMOUNT: 479, //Sai định dạng request
  NAPAS_TRANSACTION_NOT_FOUND: 480, //Sai định dạng request
  NAPAS_DUPLICATE_TRANSACTION: 481, //Sai định dạng request
  NAPAS_RF_OTHER_ERROR: 482, //Sai định dạng request
  NAPAS_REFUND_TIMEOUT: 483, //Refund timeout
  NAPAS_ORIGINAL_TRANSACTION_FAIL: 484, //Sai định dạng request
  NAPAS_EXCEEDING_REFUND_AMOUNT: 485, //Refund sai giá trị amount
  NAPAS_NOT_ALLOWED: 486, //Sai định dạng request
  NAPAS_PENDING: 487, //Chưa xác minh được thông tin thẻ
  NAPAS_UNKNOWN: 488, //Chưa xác minh được thông tin thẻ
  NAPAS_REQUEST_ERROR: 489, //Request timeout napas
  NAPAS_REQUEST_TIMEOUT: 490, //Request timeout napas
  NAPAS_INVALID_OTP_1TIME: 491, //Sai OTP 1 lần
  NAPAS_EXPIRED_ORDER: 492, //Order hết hạn
  NAPAS_PURCHASE_TOKEN_ERROR: 493, //Lỗi logic khi token đã có mà vẫn gọi Purchase_otp_return_token
  NAPAS_ERROR: -1, //Mã lỗi Napas không trong bảng định nghĩa

  C08_TOKEN_ERROR: 500, //Lỗi token khi đăng nhập C08
  C08_NOT_FOUND: 501, //Lỗi không tìm thấy dữ liệu
  C08_LOGIN_USERNAME_OR_PASSWORD_INVALID: 502, //Lỗi sai tài khoản/mật khẩu khi đăng nhập C08
  C08_SYSTEM_ERROR: 503, //Lỗi hệ thống C08
  C08_SMART_OTP_NOT_ACTIVE: 504, //Tài khoản chưa active smartOTP
  C08_REQUIRED_SMART_OTP: 505, //Yêu cầu nhập mã SmartOTP
  C08_DUPLICATE_TRANSACTION: 506, //Trùng giao dịch
  C08_DECISION_CODE_HAS_BEEN_PAID: 507, //Quyết định xử phạt đã được thanh toán
  C08_DECISION_CODE_NOT_FOUND: 508, //Không tìm thấy quyết định xử phạt
  C08_TIMEOUT: 509, //C08 trả về timeout
  C08_RETURN_MORE_THAN_5: 510, //Lỗi trả về hơn 5 kq
  C08_SIGNATURE_INVALID: 511, //Lỗi chữ ký số
  C08_RECORD_NOT_FOUND: 512, //Không tìm thấy biên bản xử phạt
  C08_DECISION_CODE_UNPAID: 513, //Quyết định xử phạt chưa được thanh toán
  C08_DECISION_CODE_LOCK_OR_UNLOCK_SUCCESS: 514, //Quyết định xử phạt đã được khoá thanh toán thành công
  C08_DECISION_CODE_LOCKED: 515, //Quyết định xử phạt đã bị khoá thanh toán
  C08_DECISION_CODE_LOCK_OR_UNLOCK_FAILED: 516, //Quyết định xử phạt khoá không thành công
  C08_PAYMENT_UNIT_UNKNOWN: 517, //Đơn vị thanh toán không xác định
  C08_TOKEN_INVALID: 518, //Token không chính xác
  C08_DECISION_CODE_UNKNOWN: 519, //Quyết định xử phạt không xác định
  C08_DECISION_CODE_PAYMENT_NOT_FOUND: 520, //Không tìm thấy thông tin thanh toán
  C08_BAD_REQUEST: 521, //Dữ liệu đầu vào không hợp lệ
  C08_REQUEST_TIMEOUT: 522, //Gọi sang C08 bị timeout
  C08_REQUEST_ERROR: 523, //Gọi sang C08 bị lỗi
  C08_SYSTEM_ERROR_NEW: 524, //Mã lỗi mới của hệ thống
  C08_OTHER_ERROR: -1, //Lỗi không được định nghĩa

  CASHIN_REQUIRED_AUTHENTICATION: 110,

  //QRPay
  PAYMENT_REQUIRED_AUTHENTICATION: 110,

  //eKYC
  WAIT_FOR_CONFIRMATION: 37,
};

export default ERROR_CODE;
