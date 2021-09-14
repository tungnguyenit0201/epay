// 1	Nạp tiền
// 2	Rút tiền
// 3	Chuyển tiền
// 4	Tự động nạp tiền
// 5	Nhận tiền
// 6	Thanh toán giao thông
// 7	Liên kết ngân hàng
// 8	Hủy liên kết ngân hàng
// 9	Thanh toán merchant

const TRANS_TYPE = {
  CashIn: 1,
  CashOut: 2,
  CashTransfer: 3,
  AutoCashIn: 4,
  CashReceive: 5,
  PaymentToll: 6,
  ActiveCustomer: 7,
  DeactiveCustomer: 8,
  PaymentMerchant: 9,
};
export default TRANS_TYPE;
