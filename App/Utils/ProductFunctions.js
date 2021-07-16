import { formatMoney } from './Money';
import { PRODUCT_ATTR_CODE } from 'configs/Constants';

export const getAttribute = (attributes, attribute_code) => {
  if (attributes?.constructor !== Array) {
    return '';
  }
  const item = attributes.find((item) => item.attribute_code == attribute_code);
  return item?.value || '';
};

export const getRatingInfo = (product) => {
  const review = product?.extension_attributes?.review?.review_summary?.[0];

  const votes = {};
  if (review?.vote)
    for (const vote of review?.vote) {
      votes[vote.value] = vote.count;
    }

  return {
    rating: Math.floor(
      (review?.rating_summary ||
        product?.rating_summary ||
        product?.rating ||
        0) / 20
    ),
    count:
      review?.review_counts ||
      product?.reviews_count ||
      product?.review_counts ||
      0,
    votes
  };
};

export const getPricing = (product, extraFee = 0) => {
  const pricing = product?.extension_attributes?.pricing || product || {};
  const final_price = +pricing?.final_price + extraFee;
  const regular_price = +pricing?.regular_price || +pricing.price;
  const unit =
    product?.extension_attributes?.price_group?.[0]?.price_unit_text || 'đ';

  const result = {
    final: final_price,
    original: regular_price,
    formatedFinal: formatMoney(final_price) + ` ${unit}`,
    formatedOriginal: formatMoney(regular_price) + ` ${unit}`,
    isSale: final_price < regular_price,
    salePercentage: 100 - Math.ceil((final_price * 100) / (regular_price || 1))
  };
  return result;
};

export const getProductDetailPricing = (product, pricing) => {
  const final_price = +pricing?.final_price || 0;
  const regular_price = +pricing?.regular_price || 0;
  const unit =
    product?.extension_attributes?.price_group?.[0]?.price_unit_text || 'đ';

  const result = {
    final: final_price,
    original: regular_price,
    formatedFinal: formatMoney(final_price) + ` ${unit}`,
    formatedOriginal: formatMoney(regular_price) + ` ${unit}`,
    isSale: final_price < regular_price,
    salePercentage: 100 - Math.ceil((final_price * 100) / (regular_price || 1))
  };
  return result;
};

export const regionExtraFee = (item, city, config) => {
  // they just decided to calculate this by themeself ¯\_(ツ)_/¯
  // leave this function here in case they change their mind
  return 0;
};
