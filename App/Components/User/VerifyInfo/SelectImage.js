import React from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';
import {Text, Button} from 'components';
import {useImagePicker} from 'context/User/utils';
import {TEXT} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {base, Row, Col} from 'components';
import {Fonts, Colors, Images} from 'themes';

const SelectImage = ({title, onSelectImage, chooseImage, css}) => {
  const {image, onCamera, onPhoto} = useImagePicker(onSelectImage);

  return (
    <View style={[styles.container, css && css]}>
      <Text size={Fonts.H6} mb={10} centered bold style={styles.textUppercase}>
        {title}
      </Text>
      {image?.path && (
        <Image
          style={{marginBottom: 20, width: '100%', height: scale(270)}}
          source={{uri: image?.path}}
        />
      )}

      <View style={{alignItems: 'center'}}>
        <Button
          onPress={onCamera}
          label={TEXT.TAKE_PHOTO}
          style={styles.btn}
          leftIcon={Images.VerifyUserInfo.camera}
        />
        {!!chooseImage && (
          <Button
            onPress={onPhoto}
            label={TEXT.SELECT_IMAGE_IN_LIBRARY}
            style={styles.w1}
          />
        )}
      </View>
      <Image
        style={styles.bgImg}
        source={Images.VerifyUserInfo.wave}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 54,
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
  w1: {width: 200},
});

export default SelectImage;
