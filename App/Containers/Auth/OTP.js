import React, {useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Text, Header, Button, Icon} from 'components';
import {Colors, Fonts, Images, Spacing} from 'themes';
import Modal from 'react-native-modal';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import OTPContainer from 'components/Auth/OTPContainer';
import {useTranslation} from 'context/Language';
import {useAuth} from 'context/Auth/utils';
import {useOTP} from 'context/Common/utils';

const OTP = ({route}) => {
  const {onChangePhone} = useAuth();
  const {
    errorMessage,
    countdown,
    code,
    showModal,
    setShowModal,
    onChange,
    onConfirmOTP,
    resentOTP,
    openCallDialog,
    label,
  } = useOTP(route?.params);
  const translation = useTranslation();

  const renderRightComponent = () => (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={styles.iconRight}>
      <Icon icon={Images.Register.Info} tintColor={Colors.BLACK} />
    </TouchableOpacity>
  );

  return (
    <>
      <View>
        <Header
          back
          blackIcon
          style={styles.header}
          renderRightComponent={() => renderRightComponent()}
        />
      </View>

      <View style={styles.container}>
        <View style={[styles.wrap, {paddingTop: Spacing.PADDING}]}>
          <View style={styles.logo}>
            <Image source={Images.logoEpay} resizeMode="contain" />
          </View>
          <OTPContainer
            onChange={onChange}
            onCodeFilled={onConfirmOTP}
            message={errorMessage}
            code={code}
            countdown={countdown}
            resentOTP={resentOTP}
            onChangePhone={onChangePhone}
            label={label}
          />
        </View>
      </View>

      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.wrapModal}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setShowModal(false)}>
        <View style={styles.modal}>
          <View style={styles.childModal}>
            <Text bold fs="h6" centered color={Colors.cl1}>
              Trợ giúp
            </Text>
            <Pressable style={styles.btn} onPress={() => setShowModal(false)}>
              <Image source={Images.WidthDraw.Plus} style={styles.img} />
            </Pressable>
          </View>

          <View style={[styles.wrap, {paddingVertical: Spacing.PADDING}]}>
            <Text centered fs="md" mb={48}>
              Nếu bạn gặp vấn đề cần giúp đỡ, vui lòng gọi về cho chúng tôi để
              được tư vấn hỗ trợ.
            </Text>
            <Button
              mb={10}
              label="Gọi 1900-0000"
              bold
              onPress={openCallDialog}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  header: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    color: Colors.BLACK,
  },
  logo: {
    marginBottom: Spacing.PADDING + 40,
    alignItems: 'center',
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  wrapModal: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    margin: 0,
  },
  modal: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  childModal: {
    padding: 16,
    borderStyle: 'solid',
    borderBottomColor: Colors.l2,
    borderBottomWidth: 1,
  },
  btn: {
    position: 'absolute',
    top: 20,
    right: 15,
  },
  img: {
    height: scale(13),
    width: scale(13),
    transform: [{rotate: '45deg'}],
  },
  iconRight: {
    paddingRight: Spacing.PADDING,
  },
});
export default OTP;
