import React, {PureComponent, useRef, useState} from 'react';
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

const DropPicture = ({onDropImage, title, style, cameraType = 'back'}) => {
  const {width, height} = useWindowDimensions();
  const {image, camera, showCamera, loading, setShowCamera, capturePicture} =
    useDropImage();
  const isFocused = useIsFocused();

  return (
    // TODO: translate
    <>
      {!showCamera && (
        <View
          style={[
            styles.wrap,
            image?.path && {paddingVertical: Spacing.PADDING},
            style && style,
          ]}>
          {image?.path ? (
            <View style={{paddingBottom: Spacing.PADDING}}>
              <Image
                style={styles.img}
                source={{uri: image?.path}}
                resizeMode="contain"
              />
            </View>
          ) : (
            <>
              <Text
                size={Fonts.H6}
                mb={10}
                centered
                bold
                style={styles.textUppercase}>
                {title}
              </Text>

              <Image
                style={styles.bgImg}
                source={Images.VerifyUserInfo.wave}
                resizeMode="contain"
              />
            </>
          )}
          <View style={{alignItems: 'center'}}>
            <Button
              onPress={() => {
                setShowCamera(1);
              }}
              label={'Chụp ảnh'}
              style={styles.btn}
              leftIcon={Images.VerifyUserInfo.camera}
            />
          </View>
        </View>
      )}
      {showCamera && (
        <Modal isVisible={showCamera} transparent={true}>
          {showCamera == 1 && isFocused && (
            <RNCamera
              ref={camera}
              style={styles.preview}
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
              }}>
              {({camera, status, recordAudioPermissionStatus}) => {
                if (status !== 'READY') return <FWLoading />;
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
                      style={{zIndex: 10}}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        width: width,
                        height: height,
                      }}>
                      <View
                        style={[
                          styles.bgCamera,
                          styles.bgCameraTop,
                          {width: width},
                        ]}></View>
                      <View style={styles.bgWrapCameraLR}>
                        <View style={[styles.bgCamera, styles.bgCameraLR]}>
                          <View style={styles.iconTL}>
                            <Image
                              source={Images.Camera.TopLeft}
                              style={styles.iconCorner}
                            />
                          </View>
                        </View>
                        <View style={[styles.bgCamera, styles.bgCameraLR]}>
                          <View style={styles.iconTR}>
                            <Image
                              source={Images.Camera.TopRight}
                              style={styles.iconCorner}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={[styles.bgCamera, {height: height}]}>
                        <View style={styles.iconBL}>
                          <Image
                            source={Images.Camera.BottomLeft}
                            style={styles.iconCorner}
                          />
                        </View>
                        <View style={styles.iconBR}>
                          <Image
                            source={Images.Camera.BottomRight}
                            style={styles.iconCorner}
                          />
                        </View>
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
                      {loading && <FWLoading />}
                      <Pressable
                        disabled={loading}
                        style={styles.wrapBtn}
                        onPress={() => capturePicture(onDropImage)}>
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
          {showCamera == 2 && (
            <PreviewImage
              visible={showCamera == 2}
              setShowCamera={setShowCamera}
              image={image}
              title={title}
            />
          )}
        </Modal>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  img: {
    width: '100%',
    height: scale(186),
  },

  captureIcon: {
    width: scale(64),
    height: scale(64),
  },
  wrap: {
    paddingVertical: Spacing.PADDING * 3,
    backgroundColor: Colors.l2,
    borderRadius: 8,
  },
  textUppercase: {textTransform: 'uppercase'},
  bgImg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  btn: {
    width: 128,
    paddingHorizontal: 5,
  },
  bgCamera: {
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
  bgCameraTop: {left: 0, top: 0, height: scale(170)},
  bgWrapCameraLR: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bgCameraLR: {width: scale(37), height: scale(178)},
  wrapBtn: {
    position: 'absolute',
    bottom: Spacing.PADDING * 2,
    alignSelf: 'center',
  },
  iconCorner: {
    width: 24,
    height: 24,
  },
  iconTL: {
    right: -12,
    top: -12,
    position: 'absolute',
  },
  iconBL: {
    left: scale(37) - 12,
    top: -12,
    position: 'absolute',
  },
  iconTR: {
    left: -12,
    top: -12,
    position: 'absolute',
  },
  iconBR: {
    right: scale(37) - 12,
    top: -12,
    position: 'absolute',
  },
});
export default DropPicture;
