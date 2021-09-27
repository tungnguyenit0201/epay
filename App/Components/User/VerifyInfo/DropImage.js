import React, { useEffect, useMemo } from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { Button, Text, FWLoading, Header } from 'components';
import { RNCamera } from 'react-native-camera';
import { Colors, Fonts, Images, Spacing } from 'themes';
import { scale } from 'utils/Functions';
import { useDropImage } from 'context/User/utils';
import { useIsFocused } from '@react-navigation/native';
import PreviewImage from './PreviewImage';
import KYCType from 'configs/Enums/KYCType';
import { useVerifyInfo } from 'context/User/utils';
import { useTranslation } from 'context/Language';
import { IC_TPYE } from 'configs/Constants';

const DropImage = ({
  onDropImage,
  title,
  style,
  cameraType = 'back',
  draft,
  type,
  verifyParams,
  identify,
}) => {
  const { width, height } = useWindowDimensions();
  const { image, camera, showCamera, loading, setShowCamera, capturePicture } = useDropImage();
  const isFocused = useIsFocused();
  const translation = useTranslation();
  const {
    kycType,
    captureFrontImage,
    captureBackImage,
    captureFaceImage,
    SDKImage,
  } = useVerifyInfo(verifyParams);
  const eKYC = kycType === KYCType.EKYC;

  useEffect(() => {
    if (eKYC && SDKImage) {
      onDropImage(SDKImage);
    }
  }, [SDKImage, eKYC]);

  const KYCFunction = useMemo(() => {
    if (eKYC) {
      if (cameraType === 'front') {
        return () => captureFaceImage();
      }
      return () => type === 'back'
        ? captureBackImage()
        : captureFrontImage();
    }
    return () => setShowCamera(1);
  }, [eKYC, cameraType, type]);

  const imagePath = useMemo(() => {
    return eKYC ? SDKImage?.path : image?.path;
  }, [SDKImage, image]);

  return (
    // TODO: translate
    <>
      {!showCamera && (
        <View style={style}>
          {imagePath || draft ? (
            <View style={[styles.wrapImg, style]}>
              <View style={styles.titleRow}>
                <Text
                  size={Fonts.H6}
                  centered
                  bold
                  style={styles.textUppercase}>
                  {title}
                </Text>
                <Button
                  onPress={KYCFunction}
                  label={translation?.take_a_photo}
                  style={styles.smallButton}
                  leftIcon={Images.VerifyUserInfo.camera}
                  bold
                />
              </View>
              <Image
                style={[
                  styles.img,
                  cameraType !== 'back' && styles.imgFront,
                  cameraType !== 'back' && {
                    width: image?.widthImg || scale(150),
                    height: image?.heightImg || scale(150),
                  },
                ]}
                source={{ uri: imagePath ? imagePath : draft?.path }}
                resizeMode={'contain'}
              />
            </View>
          ) : (
            <View style={styles.emptyHolder}>
              <Text
                size={Fonts.H6}
                mb={10}
                centered
                bold
                style={styles.textUppercase}>
                {title}
              </Text>
              <Image
                style={[styles.img]}
                source={
                  identify
                    ? identify === IC_TPYE.PASSPORT
                      ? Images.VerifyUserInfo.Passport
                      : Images.VerifyUserInfo.IdFront
                    : Images.VerifyUserInfo.IdBack
                }
                resizeMode={'contain'}
              />
              <View style={styles.button}>
                <Button
                  onPress={KYCFunction}
                  label={translation?.take_a_photo}
                  style={styles.btn}
                  leftIcon={Images.VerifyUserInfo.camera}
                  bold
                />
              </View>
            </View>
          )}
        </View>
      )}
      {showCamera && (
        <Modal isVisible={showCamera} transparent={true}>
          {showCamera === 1 && isFocused && (
            <RNCamera
              ref={camera}
              style={styles.preview}
              captureAudio={false}
              type={RNCamera.Constants.Type.back}
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
              }}>
              {({ camera, status, recordAudioPermissionStatus }) => {
                if (status !== 'READY') { return <FWLoading />; }
                return (
                  <View
                    style={{
                      width: width,
                      height: height,
                    }}>
                    <Header
                      back
                      avoidStatusBar
                      title={title}
                      onPressBack={() => setShowCamera(false)}
                      style={{ zIndex: 10 }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        width: width,
                        height: height,
                      }}>
                      <Image
                        source={Images.Camera.CameraSquare}
                        style={{ width: width, height: height }}
                      />
                      {loading && <FWLoading />}
                      <View style={styles.wrapText}>
                        <Text
                          color={Colors.white}
                          fs="h6"
                          centered
                          ml={Spacing.PADDING}
                          mr={Spacing.PADDING}
                          mt={Spacing.PADDING * 2}>
                          Xin vui lòng đặt giấy tờ nằm vừa khung hình chữ nhật,
                          chụp đủ sáng và rõ nét
                        </Text>
                      </View>

                      <Pressable
                        disabled={loading}
                        style={styles.wrapBtn}
                        onPress={() =>
                          capturePicture(onDropImage, cameraType === 'back')
                        }>
                        <Image
                          source={Images.Capture}
                          style={styles.captureIcon}
                        />
                      </Pressable>
                    </View>
                  </View>
                );
              }}
            </RNCamera>
          )}
          <PreviewImage
            visible={showCamera === 2}
            setShowCamera={setShowCamera}
            image={image}
            title={title}
            cameraType={cameraType}
          />
        </Modal>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  wrap: {
    paddingVertical: scale(16),
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(31),
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  wrapImg: {
    paddingVertical: Spacing.PADDING / 2,
    paddingHorizontal: Spacing.PADDING,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
    shadowRadius: 8,
    shadowColor: Colors.gray,
    shadowOpacity: 0.3,
    backgroundColor: Colors.white,
  },
  img: {
    width: '100%',
    height: scale(186),
  },
  imgFront: {
    borderColor: Colors.cl1,
    borderWidth: 1,
    borderRadius: 5,
  },
  captureIcon: {
    width: scale(64),
    height: scale(64),
  },
  textUppercase: { textTransform: 'uppercase', fontWeight: '600' },
  bgImg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  btn: {
    width: 128,
    paddingHorizontal: 5,
  },
  wrapBtn: {
    position: 'absolute',
    bottom: Spacing.PADDING * 2,
    alignSelf: 'center',
  },
  wrapText: {
    position: 'absolute',
    top: scale(420),
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    marginTop: Spacing.PADDING,
  },
  emptyHolder: {
    paddingVertical: Spacing.PADDING,
    backgroundColor: Colors.l2,
    borderRadius: 8,
  },
  titleRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.PADDING / 2,
    marginTop: 4,
  },
  smallButton: {
    height: scale(32),
    paddingHorizontal: 16,
  },
});
export default DropImage;
