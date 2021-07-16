import numeral from 'numeral';
import dayjs from 'dayjs';
import * as yup from 'yup';

import 'dayjs/locale/vi';
import 'numeral/locales/vi';
import utc from 'dayjs/plugin/utc';
import YupLocale from './YupLocale';
import './UIConfigs';

numeral.locale('vi');
dayjs.locale('vi');
dayjs.extend(utc);
yup.setLocale(YupLocale);
