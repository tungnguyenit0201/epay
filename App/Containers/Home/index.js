import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Icon, Search, Text} from 'components';
import {Colors, Fonts, Images, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Content from 'components/Home/Content';

const Home = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View
          style={{
            paddingTop: top,
            paddingHorizontal: Spacing.PADDING,
          }}>
          <TouchableOpacity
            onPress={() => {
              Navigator.navigate('User');
            }}>
            <Text>Tên - SĐT Ví của tôi 900đ {'>'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Navigator.push('Bank');
            }}>
            <Text>Liên kết NH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Navigator.push('Notification');
            }}>
            <Text>🔔 Thông báo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <TouchableOpacity
            onPress={() => {
              Navigator.push('TopUp');
            }}>
            <Icon
              icon={Images.Withdraw}
              tintColor={Colors.BACKGROUNDCOLOR}
              size={Spacing.PADDING * 2.5}
            />
            <Text style={styles.text}>Nạp tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Navigator.push('Withdraw');
            }}>
            <Icon
              icon={Images.Withdraw}
              tintColor={Colors.BACKGROUNDCOLOR}
              size={Spacing.PADDING * 2.5}
            />
            <Text style={styles.text}>Rút tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Navigator.push('QRPay');
            }}>
            <Icon
              icon={Images.QRCode}
              tintColor={Colors.BACKGROUNDCOLOR}
              size={Spacing.PADDING * 2.5}
            />
            <Text style={styles.text}>QR Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Navigator.push('Transfer');
            }}>
            <Icon
              icon={Images.QRCode}
              tintColor={Colors.BACKGROUNDCOLOR}
              size={Spacing.PADDING * 2.5}
            />
            <Text style={styles.text}>Chuyển tiền</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Content />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  content: {
    flex: 1,
  },
  top: {
    backgroundColor: Colors.PRIMARY,
    height: '30%',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.PADDING,
    paddingVertical: Spacing.PADDING * 1.5,
  },
  text: {
    fontSize: Fonts.FONT_MEDIUM_LARGE,
    paddingTop: Spacing.PADDING,
    color: Colors.BACKGROUNDCOLOR,
  },
});
export default Home;
