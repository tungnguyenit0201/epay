const crypto = require('crypto');
const moment = require('moment');
const request = require('request');
const AES = require('./aes');
const RSA = require('./rsa');

var aes = new AES();
var rsa = new RSA();
//
// phone = "0944562512"
// password = crypto.createHash('sha256').update('Mango@123').digest('base64')
path = 'https://dev2.epayservices.com.vn:9443/api/v2/account/login_account';

// Data trước khi mã hóa
RequestTime = moment().format('DD-MM-YYYY HH:mm:ss');
payload = {
    'Channel': 'App',
    'Lang': 'vi',
    'AppVersion': '2.19.6',
    'AppCode': '2.19.6.101',
    'DeviceOS': 'ios',
    'DeviceID': '3853C165-8CD8-43CE-B013-1FC0643556C3',
    'OsVersion': '14.5',
    'IpAddress': '115.77.106.159',
    'DeviceInfo': 'Iphone iOS 14.5',
    'RequestTime': RequestTime,
};

// Data request mặc định cho tất cả API
dataRequest = {
    'MsgID': '3853C165-8CD8-43CE-B013-1FC0643556C318-08-2021 09:37:34.226',
    'TransactionID': '16292539287326044',
};

// Thêm dataRequest cho riêng API Login
dataRequest.MsgType = 'login_account',
dataRequest.Password = password;
dataRequest.PushToken = 'FCM Token to receive notification';

// B1. Mã hóa AES phần Data
payload.Data = aes.Encrypt(JSON.stringify(dataRequest));

// B2. Mã hóa RSA phần Signature
payload.Signature = rsa.Sign(RequestTime, payload.Data);

request.post(
    path,
    { json: payload },
    function (error, response, body) {
        // Error code lấy từ Body trước. Thường có error trả về thì báo lỗi luôn, không cần phải decrypt dữ liệu
        // B3. Verify lại thông tin Core trả về
        const verified = rsa.Verify(body.ResponseTime, body.Data, body.Signature);
        if (verified == true) {
            // B4. Descrypt data lấy dữ liêu
            const data = aes.Decrypt(body.Data);
            console.log(JSON.parse(data));
        } else {
            console.log('Verify signature sai. Báo lỗi API không hợp lệ');
        }
    }
);
