import {Header, Text} from 'components';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Spacing} from 'themes';
const Agreement = ({route}) => {
  return (
    // TODO: translate
    <View style={styles.container}>
      <Header back title="Thoả thuận người dùng" blackIcon avoidStatusBar />
      <Text>
        <Text>{route?.params?.Policy}</Text>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.PADDING,
  },
});
export default Agreement;
