import {Header, Text} from 'components';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Spacing} from 'themes';
const Policy = ({route}) => {
  return (
    // TODO: translate
    <View style={styles.container}>
      <Header back title="Chính sách quyền riêng tư" blackIcon avoidStatusBar />
      <Text>{route?.params?.Policy}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.PADDING,
  },
});
export default Policy;
