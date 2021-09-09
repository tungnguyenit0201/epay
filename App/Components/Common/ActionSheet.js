import React, {useState} from 'react';
import {ActionSheet} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';
import {Platform} from 'react-native';

const ActionSheetScreen = ({visible, setVisible, data, title, message}) => {
  // data example
  // [
  //     {label: 'option 1', onPress: () => onChange('option 1')},
  //     {label: 'option 2', onPress: () => onChange('option 2')},
  //     {label: 'option 3', onPress: () => onChange('option 3')},
  //     {label: 'cancel', onPress: () => onChange('cancel')},
  //   ]
  return (
    <ActionSheet
      title={title}
      message={message}
      options={data}
      visible={visible}
      useNativeIOS={Platform.OS == 'ios'}
      onDismiss={() => setVisible(false)}
      showCancelButton
    />
  );
};
export default ActionSheetScreen;
