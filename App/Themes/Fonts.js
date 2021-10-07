import {scale} from 'utils/Functions';

export const FONT_NAME = 'SVN-Gilroy';

export const FONT_REGULAR = FONT_NAME;
export const FONT_ITALIC = FONT_NAME + 'Italic';
export const FONT_500 = FONT_NAME + 'Medium';
export const FONT_BOLD_ITALIC = FONT_NAME + 'BoldItalic';
export const FONT_BOLD = FONT_NAME + 'Bold';

const FONT_SMALL = scale(12);
const FONT_MEDIUM = scale(14);

const SX = scale(10);
const SM = scale(12);
const MD = scale(14);
const H7 = scale(18);
const H6 = scale(16);
const H5 = scale(20);
const H4 = scale(24);
const H3 = scale(28);
const H2 = scale(32);
const H1 = scale(40);
export default {
  FONT_NAME,
  FONT_REGULAR,
  FONT_BOLD_ITALIC,
  FONT_ITALIC,
  FONT_BOLD,
  FONT_500,
  FONT_SMALL,
  FONT_MEDIUM,
  SM,
  MD,
  H7,
  H6,
  H5,
  H4,
  H3,
  H2,
  H1,
};
