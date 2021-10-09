import React from 'react';
import {View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {base, Colors, Images, Spacing} from 'themes';
import {Button, Text} from 'components';
import FooterContainer from 'components/Auth/FooterContainer';
import {scale} from 'utils/Functions';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
const Boarding = ({route}) => {
  const indexScreen = route?.params?.indexScreen || 0;
  const {width, height} = useWindowDimensions();
  // TODO: translate
  const data = [
    {
      title: 'Thanh toán đơn giản',
      content: 'Đi kèm công nghệ tiên tiến, đảm bảo mang đến tiện ích tốt nhất',
    },
    {
      title: 'Dịch vụ sân bay',
      content:
        'Cung cấp cho khách hàng tiện ích thanh toán vé máy bay qua giao dịch điện tử',
    },
    {
      title: 'Dịch vụ giao thông',
      content:
        'Hỗ trợ tiếp nhận, truyền dẫn và xử lý dữ liệu trong các giao dịch',
    },
  ];
  const onPress = () => {
    route?.params?.indexScreen == 2
      ? Navigator.reset(SCREEN.AUTH)
      : Navigator.push(SCREEN.BOADRING, {
          indexScreen: indexScreen + 1,
        });
  };
  return (
    <View style={[styles.container, {height: height}]}>
      <Image source={Images.Boarding[indexScreen]} style={styles.img} />
      <View style={styles.slide}>
        {[0, 1, 2].map(index => (
          <View
            key={Math.random(1, 100)}
            style={[styles.circle, indexScreen == index && styles.active]}
          ></View>
        ))}
      </View>
      <View style={styles.wrapText}>
        <Text fs="h5" fw="700" mb={14}>
          {data[indexScreen].title}
        </Text>
        <Text centered style={styles.content}>
          {data[indexScreen].content}
        </Text>
      </View>
      <FooterContainer style={[styles.bottomBtn, {width: width}]}>
        <Button label={'Bỏ qua'} onPress={onPress} />
      </FooterContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  img: {width: '100%', height: '67%'},
  slide: {
    paddingTop: Spacing.PADDING,
    paddingBottom: scale(36),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  circle: {
    width: scale(8),
    height: scale(8),
    backgroundColor: Colors.cl2,
    borderRadius: scale(4),
    marginRight: Spacing.PADDING / 2,
  },
  active: {
    width: scale(22),
    backgroundColor: Colors.cl1,
  },
  wrapText: {
    alignItems: 'center',
    paddingHorizontal: scale(38),
  },
  bottomBtn: {
    position: 'absolute',
    bottom: 0,
  },
  content: {lineHeight: 24},
});
export default Boarding;
