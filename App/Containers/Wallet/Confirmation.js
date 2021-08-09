import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, InputBlock, Header, Button, FWLoading, TextInput, Icon } from 'components';
import { Colors, Fonts, Images, Spacing } from 'themes';
import Navigator from 'navigations/Navigator';
import Password from 'components/Auth/Password';
import { SCREEN } from 'configs/Constants';
import { scale } from 'utils/Functions';
import Modal from 'react-native-modal';
import HeaderBg from 'components/Common/HeaderBg';
import { useTranslation } from 'context/Language';
const TopUp = () => {
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
        <Text bold style={styles.font_16}>{val}
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
          <Text bold style={styles.information}>Thông tin chuyển tiền</Text>
          {renderItem("Chuyển từ", "Ví Epay")}
          {renderItem("Chuyển đến", "Bảo An Đỗ")}
          {renderItem("Số điện thoại", "909000999")}
          {renderItem("Số tiền", "10.000 vnđ")}
          {renderItem("Số tiền", "10.000 vnđ")}
          {renderItem("Lời nhắn", "Nạp tiền điện thoại")}
          {renderItem("Phí giao dịch", "Miễn phí")}
          {renderItem("Tổng tiền", "10.000 vnđ")}
          <Button
            label="Tiếp tục"
            onPress={handleClick}
            style={styles.mt_20}
            fs={Fonts.FONT_MEDIUM}
          />
        </ImageBackground>
      </View>
      <Modal
        isVisible={open}
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={{ flex: 1 }}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Nhập mật khẩu</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu"
            password
            placeholderTextColor="black"
            onChange={handleChange}
          />
          <View></View>
          <Text style={styles.textUnderline}>
            Quên mật khẩu?
          </Text>
        </View>
      </Modal>
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
    paddingTop: Spacing.PADDING * 3,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mt_20: {
    marginTop: scale(20)
  },
  input: {
    borderColor: Colors.BLACK,
    backgroundColor: "transparent",
    fontSize: Fonts.H6,
    marginTop: Spacing.PADDING + scale(10)
  },
  textUnderline: {
    fontSize: Fonts.FONT_MEDIUM,
    textDecorationLine: 'underline',
    marginTop: scale(10),
    textAlign: 'center'
  },
  modal: {
    height: scale(200),
    backgroundColor: Colors.white,
    padding: Spacing.PADDING,
  },
  modalTitle: {
    fontSize: Fonts.H4,
    textAlign: "center",
    fontWeight: 'bold'
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
  header: {
    height: scale(80),
  },
  headerTitle: {
    color: Colors.white, 
    marginTop: scale(35), 
    fontSize: Fonts.H6,
    textAlign: 'center'
  },
  font_16: {
    fontSize: Fonts.H6
  },
  information: {
    fontSize: Fonts.H5, 
    marginBottom: scale(16)
  }
});
export default TopUp;
