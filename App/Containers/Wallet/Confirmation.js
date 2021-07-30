import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Text, InputBlock, Header, Button, FWLoading, TextInput } from 'components';
import { Colors, Fonts, Spacing } from 'themes';
import Navigator from 'navigations/Navigator';
import Password from 'components/Auth/Password';
import { SCREEN } from 'configs/Constants';
import { scale } from 'utils/Functions';
import Modal from 'react-native-modal';
const TopUp = () => {
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
      <View style={styles.content}>
        <Text style={styles.textContent}>{key}
        </Text>
        <Text style={styles.textContent}>{val}
        </Text>
      </View>
    )
  }
  const handleClick = () => {
    setOpen(true)
  }
  const handleChange = (e) => {
    if(e === "thanhcong"){
      setOpen(false)
      Navigator.navigate(SCREEN.CHECKOUT_SUCCESS);
    }
    if(e === "thatbai"){
      setOpen(false)
      Navigator.navigate(SCREEN.CHECKOUT_FAILURE);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Header 
        back 
        title="Xác nhận rút tiền" 
      />
      <View style={styles.wrap}>
        {renderItem("Ngân hàng nhận tiền", "Vietcombank")}
        {renderItem("Số tiền", "550.000 vnđ")}
        {renderItem("Phí giao dịch", "0 vnđ")}
        {renderItem("Tổng số tiền", "550.000 vnđ")}
        <Button
          label="Tiếp tục"
          onPress={handleClick}
          style={styles.buttonBlock}
          fs={Fonts.FONT_MEDIUM}
        />
      </View>
      <Modal
          isVisible={open}
          animationIn="fadeIn"
          animationOut="fadeOut"
          style={{flex: 1}}
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
  header: {
    fontSize: Fonts.FONT_LARGE,
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBlock: {
    paddingVertical: Spacing.PADDING,
    backgroundColor: Colors.g9
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
  content: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: scale(36)
  },
  title: {
    fontSize: scale(50)
  },
  modal: {
    height: scale(200), 
    backgroundColor: Colors.white, 
    padding: Spacing.PADDING
  },
  modalTitle: {
    fontSize: Fonts.H4, 
    textAlign: "center", 
    fontWeight: 'bold'
  },
  textContent: {
    fontSize: Fonts.FONT_MEDIUM, 
    textTransform: 'uppercase'
  }
});
export default TopUp;
