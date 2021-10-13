import {Header, Button, Text, Icon} from 'components';
import React from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {Spacing, Colors, Images} from 'themes';
import {useTranslation} from 'context/Language';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {scale} from 'utils/Functions';

const PreviewImage = ({visible, image, setShowCamera, title, cameraType}) => {
  const translation = useTranslation();
  const {width, height} = useWindowDimensions();
  const top = getStatusBarHeight();
  return (
    <View style={{display: visible ? 'flex' : 'none'}}>
      <View
        style={{
          width: width,
          height: height,
        }}
      >
        <Pressable
          style={[styles.left, {width: width}]}
          onPress={() => setShowCamera(1)}
          hitSlop={{
            right: scale(30),
            top: scale(20),
            bottom: scale(20),
            left: scale(30),
          }}
        >
          <View style={styles.back}>
            <Icon icon={Images.ArrowLeft} tintColor={Colors.white} />
          </View>
          <Text style={styles.center} color={Colors.white} fs="h6" bold>
            {title}
          </Text>
        </Pressable>

        <Image source={Images.Background} style={styles.img} />
        {image?.path && (
          <View
            style={[
              styles.wrapPreview,
              cameraType != 'back' && {
                left: width / 2 - image?.widthImg + scale(38),
              },
            ]}
          >
            <Image
              source={{uri: image?.path}}
              style={[
                styles.previewImg,
                cameraType != 'back' && {
                  width: image?.widthImg,
                  height: image?.heightImg,
                },
              ]}
            />
            <Pressable
              style={{alignItems: 'center'}}
              onPress={() => setShowCamera(1)}
            >
              <Text
                mt={Spacing.PADDING}
                fs="h6"
                bold
                color={Colors.white}
                style={styles.underLine}
              >
                {translation.take_a_photo_again}
              </Text>
            </Pressable>
          </View>
        )}
        <View style={styles.groupButton}>
          <Button
            label={translation.continue}
            onPress={() => setShowCamera(false)}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
  wrapPreview: {
    position: 'absolute',
    top: 173,
    paddingHorizontal: scale(38),
  },
  previewImg: {
    width: scale(300),
    height: scale(180),
    borderRadius: 5,
    borderColor: Colors.cl1,
    borderWidth: 1,
  },
  groupButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    width: '100%',
    paddingBottom: Spacing.PADDING * 2,
    paddingTop: Spacing.PADDING,
    paddingHorizontal: Spacing.PADDING,
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
  },

  left: {
    top: getStatusBarHeight(),
    position: 'absolute',
    height: 42,
    zIndex: 1,
    flexDirection: 'row',
  },

  back: {
    paddingHorizontal: Spacing.PADDING / 2,
    position: 'absolute',
  },
  underLine: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  center: {
    textAlign: 'center',
    width: '100%',
  },
});
export default PreviewImage;
