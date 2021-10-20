import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Row} from 'components';
import {Colors, Spacing} from 'themes';
import {scale} from 'utils/Functions';

const OTPBySmartOTPInput = ({code}) => {
  return (
    <Row style={styles.container}>
      {code.split('').map((digit, index) => (
        <View key={index} style={styles.digitContainer}>
          <Text fs={'h2'}>{digit}</Text>
        </View>
      ))}
    </Row>
  );
};

export default OTPBySmartOTPInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    marginHorizontal: scale(5),
  },
  digitContainer: {
    borderBottomColor: Colors.bs2,
    borderBottomWidth: 3,
    paddingTop: Spacing.PADDING / 2,
    marginLeft: Spacing.PADDING / 2,
    marginRight: Spacing.PADDING / 2,
    flex: 1,
    alignItems: 'center',
  },
});
