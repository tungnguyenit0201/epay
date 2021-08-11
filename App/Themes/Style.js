import {StyleSheet} from 'react-native';
import {scale} from 'utils/Functions';
import {Colors, Spacing, Fonts} from 'themes';

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
  modal: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    position: 'relative',
  },
  modalTitle: {
    fontSize: Fonts.H4,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  close: {
    width: 20,
    height: 20,
    backgroundColor: '#D70000',
    position: 'absolute',
    top: -8,
    right: -8,
    borderRadius: 99,
  },
  closeText: {
    lineHeight: 20,
    textAlign: 'center',
    marginTop: -1,
    color: '#fff',
  },
  bottom: {
    padding: Spacing.PADDING,
    position: 'relative',
    backgroundColor: '#fff',
  },
});
export default styles;
