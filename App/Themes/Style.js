import {StyleSheet} from 'react-native';
import {scale} from 'utils/Functions';
import {Colors, Spacing, Fonts} from 'themes';

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: Colors.bs4,
  },
  wrap: {
    backgroundColor: Colors.bs4,
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
    shadowColor: Colors.tp2,
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
    backgroundColor: Colors.bs4,
    borderRadius: 10,
    shadowColor: Colors.tp2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modal: {
    backgroundColor: Colors.bs4,
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
    backgroundColor: Colors.bs1,
    position: 'absolute',
    top: -8,
    right: -8,
    borderRadius: 99,
  },
  closeText: {
    lineHeight: 20,
    textAlign: 'center',
    marginTop: -1,
    color: Colors.bs4,
  },
  bottom: {
    paddingHorizontal: Spacing.PADDING,
    paddingBottom: Spacing.PADDING,
    paddingTop: 10,
    position: 'relative',
    backgroundColor: Colors.bs4,
  },
  boxBottom: {
    padding: scale(20),
    paddingBottom: 30,
    backgroundColor: Colors.bs4,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: Colors.tp2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonBottom: {
    height: 48,
  },
  footer: {
    height: 100,
  },
  //----------------
  boxShadowGray: {
    backgroundColor: Colors.bs4,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
    borderRadius: 8,
  },
});
export default styles;
