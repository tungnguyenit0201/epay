import React, {useEffect, useMemo} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import {Button, Text, FWLoading, Header} from 'components';
import {RNCamera} from 'react-native-camera';
import {Colors, Fonts, Images, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import {useDropImage} from 'context/User/utils';
import {useIsFocused} from '@react-navigation/native';
import PreviewImage from './PreviewImage';
import {useVerifyInfo} from 'context/User/utils';
import KYCType from 'configs/Enums/KYCType';
import {useTranslation} from 'context/Language';

const CapturePicture = ({
  onDropImage,
  title,
  style,
  cameraType = 'back',
  draft,
  verifyParams,
  type,
}) => {
  const {width, height} = useWindowDimensions();
  const {image, camera, showCamera, loading, setShowCamera, capturePicture} =
    useDropImage();
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
      return () => (type === 'back' ? captureBackImage() : captureFrontImage());
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
        <View style={styles.cardContainer}>
          <Text fs="h6" bold style={styles.label}>
            {title}
          </Text>
          <Pressable style={styles.contentContainer} onPress={KYCFunction}>
            {!!imagePath && (
              <Image
                style={{
                  width: image?.widthImg || scale(150),
                  height: image?.heightImg || scale(150),
                }}
                source={{uri: imagePath}}
                resizeMode={'contain'}
              />
            )}
            <View style={styles.imageCover}>
              <Image
                style={styles.iconBigCamera}
                source={Images.TrafficFee.BigCamera}
                resizeMode={'contain'}
              />
              <Text color={Colors.bs4} bold centered mt={10} fs="h6">
                {translation?.face_authentication}
              </Text>
            </View>
          </Pressable>
        </View>
      )}
      {showCamera && (
        <Modal isVisible={showCamera} transparent={true}>
          {showCamera == 1 && isFocused && (
            <RNCamera
              ref={camera}
              style={styles.preview}
              captureAudio={false}
              type={
                cameraType == 'back'
                  ? RNCamera.Constants.Type.back
                  : RNCamera.Constants.Type.front
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
                      title={title}
                      onPressBack={() => setShowCamera(false)}
                      style={{zIndex: 10}}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        width: width,
                        height: height,
                      }}
                    >
                      <Image
                        source={
                          cameraType == 'back'
                            ? Images.Camera.CameraSquare
                            : Images.Camera.Oval
                        }
                        style={{width: width, height: height}}
                      />
                      {loading && <FWLoading />}
                      <View style={styles.wrapText}>
                        <Text
                          color={Colors.bs4}
                          fs="h6"
                          centered
                          ml={Spacing.PADDING}
                          mr={Spacing.PADDING}
                          mt={Spacing.PADDING * 2}
                        >
                          {
                            translation.please_position_your_id_card_in_this_rectangular_frame_take_a_clear_and_bright_picture
                          }
                        </Text>
                      </View>

                      <Pressable
                        disabled={loading}
                        style={styles.wrapBtn}
                        onPress={() =>
                          capturePicture(onDropImage, cameraType == 'back')
                        }
                      >
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
            visible={showCamera == 2}
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
    paddingVertical: Spacing.PADDING * 3,
    backgroundColor: Colors.bs2,
    borderRadius: 8,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  cardContainer: {
    paddingVertical: Spacing.PADDING + 3,
    paddingHorizontal: Spacing.PADDING + 12,
    marginBottom: Spacing.PADDING,
    backgroundColor: Colors.bs4,
    borderRadius: 8,
    shadowColor: Colors.tp2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
  },
  imgFront: {
    borderColor: Colors.brd1,
    borderWidth: 1,
    borderRadius: 5,
  },
  captureIcon: {
    width: scale(64),
    height: scale(64),
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 10,
  },
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
  titleRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.PADDING / 2,
    marginTop: 4,
  },
  smallButton: {
    paddingHorizontal: 16,
    marginLeft: Spacing.PADDING,
    flex: 1,
  },
  emptyHolder: {
    paddingVertical: Spacing.PADDING * 3,
    backgroundColor: Colors.bs2,
    borderRadius: 8,
  },
  imageCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.tp2,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    zIndex: 1,
  },
  iconBigCamera: {
    width: 60,
    height: 48,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: scale(186),
  },
});
export default CapturePicture;
