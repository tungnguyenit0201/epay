import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import FWLoading from './FWLoading';
import Alert from './Alert';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from 'themes';
import {useCommon} from 'context/Common';
const Wrapper = React.memo(
  ({
    barStyle = 'dark-content',
    children,
    disableAvoidKeyboard = false,
    avoidStatusBar = false,
  }) => {
    const {loading, error} = useCommon();
    return (
      <View style={styles.flexFill}>
        <KeyboardAvoidingView
          style={styles.flexFill}
          behavior={'padding'}
          enabled={Platform.OS === 'ios' && !disableAvoidKeyboard}>
          <StatusBar
            barStyle={barStyle}
            translucent
            backgroundColor={'transparent'}
          />
          {avoidStatusBar && <View style={styles.avoidStatusBar} />}
          <View style={styles.flexFill}>{children}</View>
          {loading && <FWLoading />}
          {!!error?.errorCode && <Alert />}
        </KeyboardAvoidingView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  avoidStatusBar: {height: getStatusBarHeight()},
});

export default Wrapper;
