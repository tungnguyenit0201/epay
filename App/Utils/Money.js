import numeral from 'numeral';

export const formatMoney = (value) => numeral(value).format('0,0');
