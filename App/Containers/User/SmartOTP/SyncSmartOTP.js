import React from 'react';
import {StyleSheet, View, abs} from 'react-native';
import {Header, HeaderBg, Text, Button} from 'components';
import {Spacing, Colors} from 'themes';
import {useSmartOTP, useSyncSmartOTP} from 'context/User/utils';
import {Modal} from 'components';

const SyncSmartOTP = ({route}) => {
  const {onGoPasswordSync, onBack} = useSmartOTP();
  const {status, onSync} = useSyncSmartOTP(route?.params);

  const renderText = () => {
    switch (status) {
      case 'success':
        return (
          <Text>
            Trong trường hợp Smart OTP không hoạt động, hãy thực hiện đồng bộ
            Smart OTP.
          </Text>
        );
      case 'sync':
        return null;
      default:
        return (
          <>
            <Text bold mb={Spacing.PADDING}>
              Nếu Smart OTP không hoạt động, hãy thực hiện đồng bộ Smart OTP.
            </Text>
            <Text>
              Sau khi đồng bộ, nếu ứng dụng vẫn thông báo mã xác thực không
              chính xác. Qúy khách vui lòng liên hệ hotline 1900-0000 để được hỗ
              trợ.
            </Text>
          </>
        );
    }
  };

  return (
    <View style={{flex: 1}}>
      <HeaderBg>
        <Header back title="Smart OTP không hoạt động" />
      </HeaderBg>
      <View style={{flex: 1}}>{renderText()}</View>
      <Button label="Đồng bộ smart OTP" onPress={onGoPasswordSync} />
      {status === 'sync' && (
        <View style={styles.modalContainer}>
          <View style={styles.modalBackground} />
          <Text style={styles.modalText}>Đang đồng bộ smart otp ......</Text>
        </View>
      )}
      {status === 'success' && (
        <View style={styles.completionContainer}>
          <Text>✔️ Đồng bộ smart OTP thành công</Text>
        </View>
      )}
      {status === 'failure' && (
        <Modal
          visible
          onClose={onBack}
          content="Đã có lỗi xảy ra trong quá trình đồng bộ. Vui lòng thử lại."
          buttonGroup={() => <Button label="Thử lại" onPress={onSync} />}
        />
      )}
    </View>
  );
};

export default SyncSmartOTP;

const styles = StyleSheet.create({
  modalContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.black,
    opacity: 0.8,
  },
  modalText: {
    color: Colors.WHITETEXT,
  },
  completionContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: Spacing.PADDING * 2,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});
