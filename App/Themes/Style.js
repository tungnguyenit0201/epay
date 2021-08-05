import {StyleSheet} from 'react-native';
import {scale} from 'utils/Functions';
import {Colors, Spacing} from 'themes';

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  container: {
    paddingHorizontal: Spacing.PADDING,
    position: 'relative',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default styles;
