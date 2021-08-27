import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Text, Header, Button, Modal, Icon} from 'components';
import {Colors, Fonts, Images, Spacing} from 'themes';
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

  const renderRightComponent = () => (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={styles.iconRight}>
      <Icon icon={Images.Register.Info} />
    </TouchableOpacity>
  );

  return (
    <>
      <Header
        back
        title={sign_up}
        renderRightComponent={renderRightComponent}
      />
      <ScrollView style={styles.container}>
        <View style={styles.wrap}>
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

          {countdown != 0 ? (
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
          )}

          <View style={[styles.box_1, {marginTop: 20}]}>
            <Pressable onPress={() => setshowCall(true)}>
              <Text
                style={[styles.link_text]} //translate
              >
                Không nhận được OTP
              </Text>
            </Pressable>

            <Pressable onPress={onChangePhone}>
              <Text style={[styles.link_text]}>Đổi số điện thoại</Text>
            </Pressable>
          </View>
        </View>

        {showCall && (
          <Pressable
            style={[
              styles.otp_code,
              {
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              },
            ]}
            onPress={openCallDialog}>
            <Image
              source={Images.Register.phone_1}
              style={{
                height: scale(12),
                width: scale(12),
                marginRight: 10,
              }}
            />
            <Text bold style={[styles.link_text]}>
              Gọi cho tôi
            </Text>
          </Pressable>
        )}
      </ScrollView>
      {showModal && (
        <Modal
          visible={showModal}
          onClose={() => setShowModal(false)}
          content="Nếu bạn gặp vấn đề cần giúp đỡ, vui lòng gọi về cho chúng tôi để được  tư vấn hỗ trợ." //translate
          buttonGroup={() => (
            <View style={styles.buttonGroup}>
              <Button
                mb={10}
                label="Gọi 024 32252336"
                onPress={() => {
                  setShowModal(false);
                  openCallDialog();
                }}
              />
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.link_text}>Không, cám ơn</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
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
    paddingTop: Spacing.PADDING * 3,
  },

  iconRight: {
    paddingRight: Spacing.PADDING,
  },

  disabled_btn: {
    // color: Colors.BLACK,
    backgroundColor: Colors.white,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: Colors.BACKGROUNDACCORDION,
    borderStyle: 'solid',
  },
  link_text: {
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.BLACK,
    textDecorationLine: 'underline',
  },
  box_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  otp_code: {
    paddingVertical: Spacing.PADDING,
    textAlign: 'center',
    backgroundColor: Colors.l1,
  },
  buttonGroup: {
    alignItems: 'center',
  },
});
export default OTP;
