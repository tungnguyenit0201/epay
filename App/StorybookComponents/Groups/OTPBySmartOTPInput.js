import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../Atoms/Text';
import Row from '../Atoms/Row';
import {Colors, Spacing} from 'themes';

const OTPBySmartOTPInput = ({code}) => {
  return (
    <Row style={styles.container}>
      {code.split('').map((digit, index) => (
        <View key={index} style={styles.digitContainer}>
          <Text>{digit}</Text>
        </View>
      ))}
    </Row>
  );
};

export default OTPBySmartOTPInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
  },
  digitContainer: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    padding: Spacing.PADDING / 2,
  },
});
