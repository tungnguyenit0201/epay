import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'components';
import {Colors, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

const VerifySuccess = () => {
  const translation = useTranslation();
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
        onPress={() => Navigator.navigate(SCREEN.TAB_NAVIGATION)}
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
  },
});
export default VerifySuccess;
