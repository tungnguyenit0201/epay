import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../../../Atoms/Button';
import Text from '../../../Atoms/Text';
import {Colors, Spacing} from 'themes';

const VerifySuccess = () => {
  const translation = require('../../../../Context/Language/vi.json');
  return (
    // TODO: translate
    <View style={styles.container}>
      <Text centered fs="h4" mb={Spacing.PADDING}>
        Thông tin của bạn đã gửi đi và đang chờ duyệt
      </Text>
      <Text centered>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Text>
      <Button
        label={translation?.back_to_home_page}
        style={styles.btn}
        onPress={() => console.log('hello')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: Spacing.PADDING * 4,
    top: 200
  },
});
export default VerifySuccess;
