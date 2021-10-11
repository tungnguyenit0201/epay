import {Platform, Dimensions} from 'react-native';
import queryString from 'query-string';
import dayjs from 'dayjs';
import 'intl';
import 'intl/locale-data/jsonp/vi';
import {COMMON_ENUM} from 'configs/Constants';
import {getUniqueId} from 'react-native-device-info';
import base32Encode from 'base32-encode';
import * as OTPAuth from 'otpauth';

const _baseWidth = 375;
const _screenWidth = Math.min(
  Dimensions.get('window').width,
  Dimensions.get('window').height,
);
// const _scaleRatio = Platform.isTV || Platform.isPad ? 0.7 : 1;
const _scaleRatio = 1;

const spliceToChunks = (items, size = 2) => {
  const clone = Array.from(items);
  const result = [];
  while (clone?.length) {
    result.push(clone.splice(0, size));
  }
  return result;
};

const toObjectKeys = (data = [], field = 'id') => {
  const result = {};
  data?.forEach(item => (result[item?.[field]] = true));
  return result;
};

const buildURL = (url, query) => {
  let _url = url;
  if (query) {
    _url += /\?/.test(url) ? '&' : '?';
    if (typeof query === 'object') {
      _url += queryString.stringify(query);
    } else {
      _url += query;
    }
  }
  return _url;
};

const stripTags = html =>
  (typeof html == 'string' &&
    html
      .replace(/(<([^>]+)>)/gi, '')
      .replace(/&#8211;/g, '-')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&#160;/g, ' ')
      .replace(/&#038;/g, '&')
      .replace(/&#8217;/g, "'")) ||
  '';
const detetedBreakline = str => str.replace(/\r?\n|\r/g, '');
const formatOrderNumber = id => `${id}`.padStart(9, '0');

const nameExtractor = (fullname = '') => {
  const separatorIndex = fullname.indexOf(' ');

  if (separatorIndex === -1) {
    return {
      firstname: fullname,
      lastname: fullname,
    };
  }

  return {
    firstname: fullname.slice(0, separatorIndex),
    lastname: fullname.slice(separatorIndex + 1),
  };
};

const utcToLocal = utcString =>
  dayjs.utc(utcString).local().format('DD/MM/YYYY HH:mm');

const scale = value => {
  const scaledValue = (value * _screenWidth) / _baseWidth;
  return scaledValue * _scaleRatio;
};

const formatDate = date => {
  let arr;
  if (!!date) {
    arr = date.search('T') == -1 ? date.split(' ') : date.split('T');
    if (Boolean(arr?.length > 0))
      return arr[0].replace('-', '/').replace('-', '/');
    return date;
  }
  return date;
};
const getYoutubeId = url => {
  if (!!url) {
    let index = url.search('v=');
    if (index != -1) {
      return url.slice(index + 2).split('&')[0];
    }
    let id = url.split('/');
    return id[id.length - 1];
  }
  return url;
};

function timeSince(date) {
  const intervals = [
    {label: 'year', seconds: 31536000},
    {label: 'month', seconds: 2592000},
    {label: 'day', seconds: 86400},
    {label: 'hour', seconds: 3600},
    {label: 'minute', seconds: 60},
    {label: 'second', seconds: 1},
  ];
  let seconds = 0;
  let now = new Date();
  seconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000 -
      (Platform.OS == 'ios' ? 3600 * 7 : 0),
  );

  if (Number.isNaN(seconds)) return 'long time ago';
  const interval = intervals.find(i => i.seconds < seconds);

  if (!interval) return 'long time ago';
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}

const converTailwind = str => {
  let res = {};
  let arr = str.split('\n.');
  arr.map((item, index) => {
    if (item.indexOf('tailwind') == -1) {
      res[item.slice(0, item.indexOf('{') - 1)] = item.slice(
        item.indexOf('@'),
        item.indexOf(';'),
      );
    }
  });
  return res;
};

const formatMoney = (number, currency) =>
  new Intl.NumberFormat('vi-VN').format(number) + (currency ? 'đ' : '');

const sencondsToTime = num => {
  var sec_num = parseInt(num, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
};

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const toUpperCaseFirst = str => str[0].toUpperCase() + str.slice(1);

const getAll = async (...functionList) => {
  return await new Promise(resolveAll => {
    let promiseList = [];
    functionList.forEach(func => {
      promiseList.push(
        new Promise(async resolve => {
          const result = await func();
          resolve(result);
        }),
      );
    });
    Promise.all(promiseList).then(results => {
      resolveAll(results);
    });
  });
};

const calculateFee = ({cash, feeData, fixedFee, bankFee, minFee, maxFee}) => {
  const _fixedFee = fixedFee || feeData?.FixedFee;
  const _bankFee = bankFee || feeData?.BankFee;
  const _minFee = minFee || feeData?.MinFee;
  const _maxFee = maxFee || feeData?.MaxFee;

  let total = _fixedFee + cash * _bankFee;
  return total < _minFee ? _minFee : total > _maxFee ? _maxFee : total;
};

const stringToArrayBuffer = str => {
  if (/[\u0080-\uffff]/.test(str)) {
    throw new Error('this needs encoding, like UTF-8');
  }
  var arr = new Uint8Array(str.length);
  for (var i = str.length; i--; ) arr[i] = str.charCodeAt(i);
  return arr.buffer;
};

const generateTOTP = ({phone, smartOtpSharedKey}) => {
  const hash = COMMON_ENUM.TOTP_KEY + phone + getUniqueId() + smartOtpSharedKey;
  const buffer = stringToArrayBuffer(hash);
  const hashToGenOtp = base32Encode(buffer, 'RFC4648', {padding: false});
  const totp = new OTPAuth.TOTP({
    algorithm: 'SHA1',
    digits: 6,
    period: 60, // TODO: get config from server
    secret: hashToGenOtp,
  });
  const code = totp.generate({timestamp: new Date().getTime()});
  return code;
};

const hidePhone = phone =>
  phone?.slice(0, 3) + '****' + phone?.slice(phone?.length - 3, phone?.length);

const hideCMND = number =>
  number?.slice(0, 2) +
  '*********' +
  number?.slice(number?.length - 2, number?.length);

function formatCurrency(number, currency = '') {
  if (!number || isNaN(number) || Number(number) == 0) {
    return '0' + currency;
  }

  let array = [];
  let result = '';
  let isNegative = false;

  if (number < 0) {
    number = -number;
    isNegative = true;
  }

  let numberString = number.toString();
  if (numberString.length < 3) {
    return numberString + currency;
  }

  let count = 0;
  for (let i = numberString.length - 1; i >= 0; i--) {
    count += 1;
    if (numberString[i] == '.' || numberString[i] == ',') {
      array.push(',');
      count = 0;
    } else {
      array.push(numberString[i]);
    }
    if (count == 3 && i >= 1) {
      array.push('.');
      count = 0;
    }
  }

  for (let i = array.length - 1; i >= 0; i--) {
    result += array[i];
  }

  if (isNegative) result = '-' + result;

  return result + currency;
}

function fromCurrency(money) {
  if (money) {
    money = money.toString();
    let moneyString = money
      .replaceAll(',', '')
      .replaceAll('đ', '')
      .replaceAll('VND', '')
      .replaceAll('.', '')
      .replaceAll(' ', '');
    let number = Number(moneyString);
    if (isNaN(number)) {
      return 0;
    }
    return number;
  } else {
    return money;
  }
}

export {
  toObjectKeys,
  buildURL,
  spliceToChunks,
  stripTags,
  formatOrderNumber,
  nameExtractor,
  utcToLocal,
  scale,
  formatDate,
  getYoutubeId,
  timeSince,
  converTailwind,
  detetedBreakline,
  formatMoney,
  sencondsToTime,
  shuffle,
  toUpperCaseFirst,
  getAll,
  calculateFee,
  generateTOTP,
  hidePhone,
  hideCMND,
  fromCurrency,
  formatCurrency,
};
