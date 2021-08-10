import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, InputBlock, Header, Button, FWLoading, TextInput, Icon } from 'components';
import { Colors, Fonts, Images, Spacing } from 'themes';
import Navigator from 'navigations/Navigator';
import Password from 'components/Auth/Password';
import { SCREEN } from 'configs/Constants';
import { scale } from 'utils/Functions';
import Modal from 'react-native-modal';
import { useTranslation } from 'context/Language';
import HeaderBg from 'components/Common/HeaderBg';
const CheckoutSuccess = () => {
  const translation = useTranslation();
  let { height } = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  let [open, setOpen] = useState(false);
  let forgotRef = useRef({
    phone: '',
  });
  const onChange = (key, val) => {
    forgotRef.current[key] = val;
  };
  const renderItem = (key, val) => {
    return (
      <View style={styles.blockRender}>
        <Text style={styles.font_16}>{key}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          bold
          style={styles.font_16}
        >
          {val}
        </Text>
      </View>
    )
  }
  const handleClick = () => {
    setOpen(true)
  }
  const handleChange = (e) => {
    if (e === "thanhcong") {
      setOpen(false)
      Navigator.navigate(SCREEN.CHECKOUT_SUCCESS);
    }
    if (e === "thatbai") {
      setOpen(false)
      Navigator.navigate(SCREEN.CHECKOUT_FAILURE);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <HeaderBg style={styles.header}>
        <Text bold style={styles.headerTitle}>{translation.transaction_details}</Text>
      </HeaderBg>
      <View style={styles.wrap}>
        <ImageBackground
          source={Images.Transfer.Background}
          resizeMode="center"
          style={styles.image}
        >
          <Text bold style={styles.information}>{translation.successfully_transfer}</Text>
          {renderItem("Chuyển từ", "Ví Epay")}
          {renderItem("Chuyển đến", "Bảo An Đỗ")}
          {renderItem("Số điện thoại", "909000999")}
          {renderItem("Số tiền", "10.000 vnđ")}
          {renderItem("Số tiền", "10.000 vnđ")}
          {renderItem("Lời nhắn", "Nạp tiền điện thoại")}
          {renderItem("Phí giao dịch", "Miễn phí")}
          {renderItem("Tổng tiền", "10.000 vnđ")}
          <View style={styles.blockButton}>
            <Button
              label="Lưu ảnh"
              style={styles.buttonSave}
              color={Colors.cl1}
              fs={Fonts.H6}
            />
            <Button
              label="Chia sẻ ảnh"
              style={styles.buttonShare}
              fs={Fonts.H6}
            />
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING * 2,
  },
  header: {
    height: scale(80),
  },
  headerTitle: {
    color: Colors.white,
    marginTop: scale(35),
    fontSize: Fonts.H6,
    textAlign: 'center'
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: Colors.BLACK,
    backgroundColor: "transparent",
    fontSize: Fonts.H6,
    marginTop: Spacing.PADDING + scale(10)
  },
  image: {
    flex: 1,
    justifyContent: "center",
    marginBottom: scale(30)
  },
  blockRender: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.g2,
    paddingVertical: scale(15),
    borderStyle: 'dotted'
  },
  font_16: {
    fontSize: Fonts.H6,
  },
  information: {
    fontSize: Fonts.H5,
    marginBottom: scale(16)
  },
  blockButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(16)
  },
  buttonSave: {
    width: scale(160),
    height: scale(42),
    backgroundColor: 'transparent',
    borderColor: Colors.cl1,
    borderWidth: 1,
  },
  buttonShare: {
    width: scale(160),
    height: scale(42)
  },
});
export default CheckoutSuccess;
