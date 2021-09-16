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

const DropImage = ({onDropImage, title, style, cameraType = 'back'}) => {
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
                style={[styles.img, {width: width - Spacing.PADDING * 2}]}
                source={{uri: image?.path}}
                resizeMode={cameraType == 'back' ? 'contain' : 'cover'}
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
                          capturePicture(onDropImage, cameraType == 'back')
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
            visible={showCamera == 2}
            setShowCamera={setShowCamera}
            image={image}
            title={title}
          />
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
});
export default DropImage;
