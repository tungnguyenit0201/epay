import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, Icon, Header} from 'components';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import HeaderBg from 'components/Common/HeaderBg';
import {useTranslation} from 'context/Language';

import {Switch} from 'react-native-ui-lib'; //eslint-disable-line

const PaymentSettings = () => {
  const translation = useTranslation();
  const [xacNhan, isXacNhan] = useState(false);

  return (
    <ScrollView style={base.wrap}>
      <HeaderBg>
        <Header back title={translation.language_setting} back />
      </HeaderBg>

      <View style={styles.item}>
        <Icon
          mr={8}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text size={Fonts.H6}> Cho phép định vị vị trí</Text>
        <Switch
          style={base.leftAuto}
          onColor={Colors.cl1}
          offColor={Colors.l3}
          value={xacNhan}
          onValueChange={isXacNhan}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: Spacing.PADDING,
    alignItems: 'center',
  },
});
export default PaymentSettings;
