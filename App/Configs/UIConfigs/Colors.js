import { Colors } from 'react-native-ui-lib';
import { Colors as CustomColors } from 'themes';

Colors.loadColors({
  primary: CustomColors.PRIMARY,
  text: CustomColors.TEXT,
  error: '#E63B2E',
  success: '#ADC76F',
  warn: '#FF963C',
  gray3: '#333',
  gray5: '#555',
  gray9: '#999'
});
