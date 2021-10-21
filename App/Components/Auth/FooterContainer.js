import React, {useState} from 'react';
import {View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import {Colors, Images, Spacing, base} from 'themes';
import {KeyboardContext} from 'utils/KeyboardStateProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'utils/Functions';

const FooterContainer = ({children, pb, style}) => {
  const {bottom} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  return (
    <KeyboardContext.Consumer>
      {isKeyboardShown => (
        <View
          style={[
            {
              paddingBottom: !!isKeyboardShown
                ? scale(12)
                : bottom > 0
                ? bottom
                : scale(12),
            },
            styles.wrap,
            style,
          ]}
        >
          {children}
        </View>
      )}
    </KeyboardContext.Consumer>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: scale(12),
    backgroundColor: Colors.bs4,
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
    shadowColor: Colors.tp2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
  },
});

export default FooterContainer;
