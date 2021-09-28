import {StyleSheet} from 'react-native';
import {scale} from 'utils/Functions';
import {Colors, Spacing, Fonts} from 'themes';

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: Colors.white,
  },
  wrap: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
  },
  container: {
    paddingHorizontal: Spacing.PADDING,
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftAuto: {
    marginLeft: 'auto',
  },
  rightAuto: {
    marginRight: 'auto',
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxShadow: {
    position: 'relative',
    marginBottom: 20,
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.black,
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
    backgroundColor: Colors.l4,
    position: 'absolute',
    top: -8,
    right: -8,
    borderRadius: 99,
  },
  closeText: {
    lineHeight: 20,
    textAlign: 'center',
    marginTop: -1,
    color: Colors.white,
  },
  bottom: {
    paddingHorizontal: Spacing.PADDING,
    paddingBottom: Spacing.PADDING,
    paddingTop: 10,
    position: 'relative',
    backgroundColor: Colors.white,
  },
  boxBottom: {
    padding: scale(20),
    paddingBottom: 30,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footer: {
    height: 100,
  },
  buttonSB: {
    height: 48,
    borderRadius: 8,
    cursor: 'pointer',
    /* position: 'absolute',
    width: '100%',
    bottom: 0, */
  },
});
export default styles;
