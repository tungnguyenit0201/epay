import React, {useRef} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  Pressable,
} from 'react-native';
import {Button, Text, FWLoading, Header, Icon} from 'components';
import {RNCamera} from 'react-native-camera';
import {Colors, Fonts, Images, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import {useIsFocused} from '@react-navigation/native';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useScanQR} from 'context/Wallet/utils';
import {useImagePicker} from 'context/User/utils';
import {getTranslation} from 'react-native-ui-lib/generatedTypes/src/incubator/panView/panningUtil';
import {useTranslation} from 'context/Language';
const QRPay = () => {
  const camera = useRef();
  const {width, height} = useWindowDimensions();
  const top = getStatusBarHeight();
  const isFocused = useIsFocused();
  const translation = useTranslation();
  const {
    loading,
    image,
    setImage,
    flash,
    setFlash,
    onGetQRCodeInfo,
    detectQRCode,
  } = useScanQR();
  const {onPhoto} = useImagePicker(detectQRCode);
  return (
    // TODO: translate
    isFocused ? (
      <RNCamera
        ref={camera}
        captureAudio={false}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onBarCodeRead={qrCode => {
          onGetQRCodeInfo(qrCode?.data);
        }}
      >
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') return <FWLoading />;
          return (
            <View
              style={{
                width: width,
                height: height,
              }}
            >
              <Header
                back
                avoidStatusBar
                title={'Quét mã'}
                style={{zIndex: 10}}
              />
              <View
                style={{
                  position: 'absolute',
                  width: width,
                  height: height,
                }}
              >
                {image?.path && (
                  <View style={styles.wrapQRImg}>
                    <Image source={{uri: image?.path}} style={styles.qrImg} />
                  </View>
                )}
                <Image
                  source={Images.Camera.ScanQR}
                  style={{width: width, height: height}}
                />

                {loading && <FWLoading />}
                <View style={[styles.wrapText, {top: scale(112)}]}>
                  <Text color={Colors.bs4} fs="h6" fw="700" centered>
                    {translation.point_the_camera_frame_at_the_qr_code_to_scan}
                  </Text>
                </View>
                <View style={styles.wrapAction}>
                  <Pressable
                    style={styles.action}
                    onPress={() => setFlash(!flash)}
                  >
                    <Icon
                      icon={Images.Camera.Flash}
                      tintColor={Colors.bs4}
                      mr={Spacing.PADDING / 4}
                    />
                    <Text fw="700" fs="h6" color={Colors.bs4}>
                      {translation.flash_on}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.action, {marginLeft: Spacing.PADDING}]}
                    onPress={() => setFlash(!flash)}
                  >
                    <Icon
                      icon={Images.Camera.Gallery}
                      tintColor={Colors.bs4}
                      mr={Spacing.PADDING / 2}
                    />
                    <Text
                      fw="700"
                      fs="h6"
                      color={Colors.bs4}
                      onPress={() => onPhoto(false)}
                    >
                      Chọn hình có sẵn
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.wrapBtn}>
                  <Button
                    label={translation.payment_qr}
                    bgImg={0}
                    leftIcon={Images.Camera.QR}
                    mode="outline"
                    mr={Spacing.PADDING / 2}
                  />
                  <Button
                    bgImg={0}
                    label={translation.scan_qr}
                    leftIcon={Images.Camera.Scan}
                    // onPress={detectQRCode}
                  />
                </View>
              </View>
            </View>
          );
        }}
      </RNCamera>
    ) : null
  );
};
const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  wrapAction: {
    position: 'absolute',
    bottom: scale(211),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  action: {
    flexDirection: 'row',
  },
  wrapBtn: {
    position: 'absolute',
    bottom: Spacing.PADDING * 3,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  wrapText: {
    position: 'absolute',
    alignSelf: 'center',
  },
  wrapQRImg: {
    width: scale(252),
    height: scale(252),
    position: 'absolute',
    top: scale(150),
    left: scale(61),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bs4,
  },
  qrImg: {
    width: scale(200),
    height: scale(200),
  },
});

export default QRPay;
