import React, {useRef, useState} from 'react';
import {
  ScrollView,
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
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import OTPContainer from 'components/Auth/OTPContainer';
import {useTranslation} from 'context/Language';
import {useAuth} from 'context/Auth/utils';
import {useOTP} from 'context/Common/utils';
import Color from 'components/Common/Color';

const OTP = ({route}) => {
  const {onChangePhone} = useAuth();
  const {
    errorMessage,
    countdown,
    showCall,
    code,
    showModal,
    setShowModal,
    onChange,
    onConfirmOTP,
    resenOTP,
    setshowCall,
    openCallDialog,
  } = useOTP(route?.params);
  const {sign_up} = useTranslation();
  const [checkShowModal, setShowModalPopup] = useState(false);

  const onShowModal = () => {
    setShowModalPopup(true);
  };

  const onHideModal = () => {
    setShowModalPopup(false);
  };

  const renderRightComponent = () => (
    <TouchableOpacity
      onPress={() => setShowModalPopup(true)}
      style={styles.iconRight}>
      <Icon icon={Images.Register.Info} />
    </TouchableOpacity>
  );

  return (
    <>
      <View>
        <Header
          back
          blackIcon
          style={{
            paddingTop: 10,
            backgroundColor: Colors.white,
            color: Colors.BLACK,
          }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: scale(10),
            right: 20,
          }}
          onPress={onShowModal}>
          <Icon
            icon={Images.Register.Info}
            style={{
              width: scale(24),
              height: scale(24),
            }}
            tintColor={Colors.BLACK}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={[styles.wrap, {paddingTop: Spacing.PADDING}]}>
          <View
            style={{
              marginBottom: Spacing.PADDING + 40,
              alignItems: 'center',
            }}>
            <Image source={Images.logoEpay} resizeMode="contain" />
          </View>
          <OTPContainer
            onChange={onChange}
            onCodeFilled={onConfirmOTP}
            message={errorMessage}
            code={code}
          />

          {/* {action == 'password' && (
            <Password
              onChangePassword={value => onChange('newPassword', value)}
              onChangeConfirm={value => onChange('passwordConfirm', value)}
            />
          )} */}

          {/* {countdown != 0 ? (
            <Button
              mb={10}
              disabled
              color={{color: Colors.BACKGROUNDACCORDION}}
              bg={Colors.white}
              label={'Gửi lại'}
              label2={` (${countdown}s)`}
              style={styles.disabled_btn}
              onPress={resenOTP}
            />
          ) : (
            <Button mb={10} label="Gửi lại" onPress={resenOTP} />
          )} */}
        </View>

        {/* <Text style={[styles.otp_code, {marginTop: 20}]}>
            <Text style={{
              textAlign: 'center',
              color: '#ccc'}}>OTP:</Text> 098909
          </Text> */}
      </View>

      <Modal
        // isVisible={showModal}
        isVisible={checkShowModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          margin: 0,
        }}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        onBackdropPress={onHideModal}>
        <View
          style={{
            backgroundColor: Colors.white,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}>
          <View
            style={{
              padding: 16,
              borderStyle: 'solid',
              borderBottomColor: Colors.l2,
              borderBottomWidth: 1,
            }}>
            <Text bold fs="h6" centered color={Colors.cl1}>
              Trợ giúp
            </Text>
            <Pressable
              style={{
                position: 'absolute',
                top: 20,
                right: 15,
              }}
              onPress={onHideModal}>
              <Image
                source={Images.WidthDraw.Plus}
                style={{
                  height: scale(13),
                  width: scale(13),
                  transform: [{rotate: '45deg'}],
                }}
              />
            </Pressable>
          </View>

          <View style={[styles.wrap, {paddingVertical: Spacing.PADDING}]}>
            <Text centered fs="md" mb={48}>
              Nếu bạn gặp vấn đề cần giúp đỡ, vui lòng gọi về cho chúng tôi để
              được tư vấn hỗ trợ.
            </Text>
            <Button mb={10} label="Gọi 1900-0000" bold />
          </View>
        </View>
      </Modal>

      {showCall && (
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: Spacing.PADDING - 5,
            backgroundColor: Colors.OtpGray_1,
          }}
          onPress={openCallDialog}>
          <View
            style={[
              styles.line_1,
              {
                position: 'absolute',
                top: 15,
                left: 40,
              },
            ]}></View>
          <View
            style={[
              styles.line_1,
              {
                position: 'absolute',
                top: 15,
                right: 40,
              },
            ]}></View>
          <Image
            source={Images.Phone}
            style={{
              height: scale(16),
              width: scale(16),
              marginRight: 10,
              top: 1,
            }}
          />
          <Text bold>Gọi cho tôi</Text>
        </Pressable>
      )}

      <View
        style={{
          paddingVertical: Spacing.PADDING - 10,
          backgroundColor: Colors.OtpGray_1,
        }}
        onPress={openCallDialog}>
        <View
          style={[
            styles.line_1,
            {
              position: 'absolute',
              top: '50%',
              left: 40,
            },
          ]}></View>
        <View
          style={[
            styles.line_1,
            {
              position: 'absolute',
              top: '50%',
              right: 40,
            },
          ]}></View>
        <Text style={styles.text_center}>Từ tin nhắn</Text>
        <Text style={styles.text_center}>328725</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  text_center: {textAlign: 'center'},
  // header: {
  //   fontSize: Fonts.FONT_LARGE,
  //   fontWeight: 'bold',
  //   paddingBottom: Spacing.PADDING,
  // },
  // loading: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // confirmation: {
  //   marginTop: Spacing.PADDING * 2,
  // },
  // disabled_btn: {
  //   backgroundColor: '#fff',
  //   borderRadius: 3,
  //   borderWidth: 0.5,
  //   borderColor: Colors.BACKGROUNDACCORDION,
  //   borderStyle: 'solid',
  // },
  line_1: {
    width: 1,
    height: 25,
    backgroundColor: Colors.OtpGray_2,
  },
  // otp_code: {
  //   paddingVertical: Spacing.PADDING,
  //   textAlign: 'center',
  //   backgroundColor: '#F5F5F5',
  // },
});
export default OTP;
