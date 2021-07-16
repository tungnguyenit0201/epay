import { MEDIA_ROOT, MEDIAS3_ROOT, PRODUCT_MEDIA_ROOT, ROOT } from 'configs/API';
import { Images } from 'themes';
import queryString from 'query-string';

export const sourceValidation = (_uri) => {
  if (typeof _uri === 'string') {
    let uri = '';
    if (/^https?:\/\//.test(_uri)) uri = _uri;
    else if (/^\/pub\/media/.test(_uri)) uri = ROOT + _uri;
    else if (/^\/\w\/\w/.test(_uri)) uri = PRODUCT_MEDIA_ROOT + _uri;
    else if (/^\//.test(_uri)) uri = MEDIA_ROOT + _uri.replace(/^\//, '');
    else uri = MEDIA_ROOT + _uri;
    return { uri };
  }
  if (typeof _uri === 'number') {
    return _uri;
  }
  return Images.NoImage;
};

export const  sourceS3 = (_uri) => {
  return `${MEDIAS3_ROOT}${_uri}`
}

export const buildSearchCriteria = (
  field,
  operation,
  value,
  index = 0,
  array = false
) => {
  const filters = {
    [`searchCriteria[filter_groups][0][filters][${index}][field]`]: field,
    [`searchCriteria[filter_groups][0][filters][${index}][condition_type]`]: operation,
    [`searchCriteria[filter_groups][0][filters][${index}][value]`]: value
  };

  if (array) {
    return filters;
  }

  return '&' + queryString.stringify(filters);
};
