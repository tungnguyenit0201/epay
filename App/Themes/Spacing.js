import {Dimensions, Platform} from 'react-native';
import {scale} from 'utils/Functions';

const {width, height} = Dimensions.get('window');
const BASE_WIDTH = 375;
export default {
  PADDING: scale(20),
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  BASE_WIDTH: BASE_WIDTH,
};
