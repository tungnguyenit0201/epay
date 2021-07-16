import {Typography} from 'react-native-ui-lib';
import {Fonts} from 'themes';
import {StyleSheet} from 'react-native';

const typographies = StyleSheet.create({
  heading: {fontSize: 26},
  subheading: {fontSize: 18},
  error: {fontSize: 12, marginTop: 3, color: '#FF0600'},
  body: {fontSize: 18, fontWeight: '400'},
  bold: {fontWeight: null},
  medium: {fontWeight: null},
  semibold: {fontWeight: null},
  underline: {textDecorationLine: 'underline'},
  sm: {fontSize: 12},
  size20: {fontSize: 20},
});

Typography.loadTypographies(typographies);
