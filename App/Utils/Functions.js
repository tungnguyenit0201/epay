import {Platform, Dimensions} from 'react-native';
import queryString from 'query-string';
import dayjs from 'dayjs';
import 'intl';
import 'intl/locale-data/jsonp/vi';

const _baseWidth = Platform.isTV || Platform.isPad ? 834 : 375;
// const _screenWidth = Math.min(
//   Dimensions.get('window').width,
//   Dimensions.get('window').height,
// );
const _screenWidth = Math.min(
  375,
  812,
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
const formatMoney = number =>
  new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(
    number,
  );
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
};
