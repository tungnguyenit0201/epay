import {Dimensions, Platform} from 'react-native';
import {scale} from 'utils/Functions';

const {width, height} = Dimensions.get('window');
const heightVideo = (width / 16) * 9;
const BASE_WIDTH = 375;
export default {
  PADDING: scale(16),
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  HEIGHTVIDEO: heightVideo,
  BASE_WIDTH: BASE_WIDTH,
};
