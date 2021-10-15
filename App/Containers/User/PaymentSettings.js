import React, {useState, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';

import {Text, Button, Icon, Header, HeaderBg, Modal} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';

import {Switch} from 'react-native-ui-lib'; //eslint-disable-line
import {useUserInfo} from 'context/User/utils';
import {formatMoney} from 'utils/Functions';
const PaymentSettings = () => {
  const translation = useTranslation();
  const [xacNhan, isXacNhan] = useState(false);
  const {onGetLimit} = useUserInfo();
  const [open, setOpen] = useState(false);
  return (
    <>
      <HeaderBg>
        <Header back title={translation.payment_setting} />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <TouchableOpacity style={styles.item} onPress={() => setOpen(true)}>
          <Icon
            mr={8}
            icon={Images.Profile.MaThanhToan}
            size={24}
            tintColor={Colors.cl1}
          />
          <Text style={styles.text}> Cài đặt nạp tiền tự động</Text>
          <Icon
            style={[base.leftAuto]}
            icon={Images.ArrowRight}
            size={24}
            tintColor="#000"
          />
        </TouchableOpacity>
        <View style={styles.item}>
          <Icon
            mr={8}
            icon={Images.Profile.MaThanhToan}
            size={24}
            tintColor={Colors.cl1}
          />
          <Text style={styles.text}> Xác nhận thanh toán nhanh</Text>
          <Switch
            style={base.leftAuto}
            onColor={Colors.cl1}
            offColor={Colors.l3}
            value={xacNhan}
            onValueChange={isXacNhan}
          />
        </View>
        <Pressable style={styles.item} onPress={onGetLimit}>
          <Icon
            mr={8}
            icon={Images.Profile.MaThanhToan}
            size={24}
            tintColor={Colors.cl1}
          />
          <Text style={styles.text}> Hạn mức trong ngày</Text>
        </Pressable>
        <TouchableOpacity style={styles.item} onPress={() => setOpen(true)}>
          <Icon
            mr={8}
            icon={Images.Profile.MaThanhToan}
            size={24}
            tintColor={Colors.cl1}
          />
          <Text style={styles.text}> Đăng ký thanh toán giao thông</Text>
          <Icon
            style={[base.leftAuto]}
            icon={Images.ArrowRight}
            size={24}
            tintColor="#000"
          />
        </TouchableOpacity>

        <View style={[base.container, styles.mt]}>
          <Text>{`Cài đặt hạn mức: ${formatMoney(50000000)}đ`}</Text>
        </View>
      </ScrollView>
      <Modal
        visible={open}
        onClose={() => setOpen(false)}
        content="Coming soon"
        buttonGroup={() => (
          <View>
            <Text></Text>
          </View>
        )}
        icon={Images.Homes.Setting}
      />
    </>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.l2,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: Spacing.PADDING,
    alignItems: 'center',
  },
  text: {
    marginRight: 80,
    fontSize: Fonts.H6,
  },
  mt: {
    marginTop: 10,
  },
});
export default PaymentSettings;
