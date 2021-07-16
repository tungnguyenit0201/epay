import {Platform, StyleSheet} from 'react-native';
import {Colors, ThemeManager, Typography} from 'react-native-ui-lib';
import {Fonts} from 'themes';

const commonViewProps = props => {
  const {
    border,
    borderT,
    borderB,
    borderL,
    borderR,
    borderColor,
    borderWidth,
    overflowHidden,
    selfStretch,
    selfStart,
    selfEnd,
    selfCenter,
    maxWidth,
    tlRadius,
    trRadius,
    blRadius,
    brRadius,
    radius,
    shadow,
    zIndex,
  } = props;
  return {
    style: {
      borderColor: borderColor || Colors.grey50,
      borderWidth: border ? borderWidth || 1 : 0,
      borderTopWidth: borderT || border ? borderWidth || 1 : 0,
      borderBottomWidth: borderB || border ? borderWidth || 1 : 0,
      borderLeftWidth: borderL || border ? borderWidth || 1 : 0,
      borderRightWidth: borderR || border ? borderWidth || 1 : 0,
      overflow: overflowHidden ? 'hidden' : null,
      alignSelf: selfStretch
        ? 'stretch'
        : selfCenter
        ? 'center'
        : selfStart
        ? 'flex-start'
        : selfEnd
        ? 'flex-end'
        : null,
      maxWidth,
      borderTopLeftRadius: tlRadius || radius,
      borderTopRightRadius: trRadius || radius,
      borderBottomLeftRadius: blRadius || radius,
      borderBottomRightRadius: brRadius || radius,
      zIndex,
      ...(shadow &&
        Platform.select({
          ios: {
            shadowColor: '#000',
            shadowRadius: 4,
            shadowOpacity: 0.08,
            shadowOffset: {
              width: 0,
              height: 2,
            },
          },
          android: {
            elevation: 1,
          },
        })),
    },
  };
};

// Image
ThemeManager.setComponentTheme('Image', props => {
  return {
    style: [
      {
        width: props.width || props.size,
        height: props.height || props.size,
      },
      props.style,
    ],
  };
});

// Text
ThemeManager.setComponentTheme(
  'Text',
  ({style, bold, medium, semibold, color, underline, ...rest}) => {
    let propsColor = null;
    Object.keys(rest).forEach(key => {
      if (Colors[key]) {
        propsColor = Colors[key];
      }
    });
    return {
      style: [
        {
          textDecorationLine: underline ? 'underline' : null,
          // fontFamily: bold
          //   ? Fonts.FONT_BOLD
          //   : medium
          //   ? Fonts.FONT_MEDIUM
          //   : semibold
          //   ? Fonts.FONT_SEMIBOLD
          //   : Fonts.FONT_REGULAR,
          // color: color || propsColor || Colors.text
        },
        style,
      ],
    };
  },
);

// Checkbox
ThemeManager.setComponentTheme('Checkbox', props => ({
  color: props.color || Colors.primary,
  size: props.size || 16,
  borderRadius: props.borderRadius || 2,
  labelStyle: [
    {
      // fontFamily: Fonts.FONT_REGULAR,
    },
    props.labelStyle,
  ],
  containerStyle: [
    {
      marginBottom: 10,
    },
    props.containerStyle,
  ],
}));

// RadioButton
ThemeManager.setComponentTheme('RadioButton', props => ({
  color: props.color || '#555',
  size: props.size || 15,
  style: {
    borderWidth: 1,
  },
  labelStyle: [
    {
      // fontFamily: Fonts.FONT_REGULAR,
      marginLeft: 20,
      color: '#555',
    },
    props.labelStyle,
  ],
}));

// View
ThemeManager.setComponentTheme('View', props => {
  return {
    ...commonViewProps(props),
  };
});

// TouchableOpacity
ThemeManager.setComponentTheme('TouchableOpacity', props => {
  return {
    ...commonViewProps(props),
  };
});

// TextField
ThemeManager.setComponentTheme('TextField', props => ({
  floatingPlaceholder: false,
  titleColor: Colors.grey20,
  titleStyle: styles.defaultFont,
  underlineColor: props.underlineColor || {
    default: Colors.grey50,
    error: Colors.red50,
    focus: Colors.primary,
    disabled: Colors.grey20,
  },
  style: {
    ...styles.defaultFont,
    padding: 0,
    margin: 0,
  },
}));

const styles = StyleSheet.create({
  defaultFont: {
    // fontFamily: Fonts.FONT_REGULAR,
  },
});
