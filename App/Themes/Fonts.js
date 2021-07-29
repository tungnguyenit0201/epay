import {scale} from 'utils/Functions';
import {Platform} from 'react-native';

// export const FONT_NAME ='UTM-Neo-Sans-Intel'
export const FONT_NAME = 'Roboto';

export const FONT_REGULAR = FONT_NAME;
export const FONT_ITALIC = FONT_NAME + '-Italic';
export const FONT_BOLD_ITALIC = FONT_NAME + '-BoldItalic';
export const FONT_BOLD = FONT_NAME + '-Bold';

const FONT_SMALL = scale(
  Platform.isPad || Platform.isTV || Platform.OS == 'macos' ? 12 : 10,
);
const FONT_MEDIUM = scale(
  Platform.isPad || Platform.isTV || Platform.OS == 'macos' ? 13 : 12,
);
const FONT_MEDIUM_LARGE = scale(14);
const FONT_LARGE = scale(
  Platform.isPad || Platform.isTV || Platform.OS == 'macos' ? 16 : 16,
);
export default {
  FONT_NAME,
  FONT_REGULAR,
  FONT_BOLD_ITALIC,
  FONT_ITALIC,
  FONT_BOLD,
  FONT_SMALL,
  FONT_MEDIUM,
  FONT_MEDIUM_LARGE,
  FONT_LARGE,
};
