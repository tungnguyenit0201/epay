import React, {useState} from 'react';
import {
  StyleSheet,
  Pressable,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import {scale} from 'utils/Functions';
import {Colors, Spacing, Images, Fonts} from 'themes';
import {Text} from 'components';

const ModalCustom = ({visible, title, content, buttonGroup, onClose, icon}) => {
  return (
    //TODO: Translate
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.alignCenter}>
      <View
        style={[
          styles.bgWhite,
          styles.maxWidth1,
          styles.w1,
          styles.borderRadius1,
          styles.pb1,
        ]}>
        <ImageBackground
          source={Images.SignUp.BlueWave}
          style={[
            styles.fullWidth,
            styles.alignCenter,
            styles.justifyCenter,
            styles.h1,
          ]}
          resizeMode="contain">
          {!!icon && (
            <Image
              source={icon}
              style={[styles.iconBigSize, styles.topMinus1]}
              resizeMode="contain"
            />
          )}
        </ImageBackground>

        {title && (
          <Text bold fs="h6" centered mb={8}>
            {title}
          </Text>
        )}

        {content && (
          <View style={[styles.px1]}>
            <Text centered fs="md" mb={42}>
              {content}
            </Text>

            {!buttonGroup ? (
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={onClose}>
                <Text style={styles.textStyle}>Đóng</Text>
              </Pressable>
            ) : (
              buttonGroup()
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: scale(20),
    paddingVertical: Spacing.PADDING / 2,
    paddingHorizontal: Spacing.PADDING,
    elevation: 2,
  },
  buttonClose: {backgroundColor: Colors.cl1},
  textStyle: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //------------------
  topMinus1: {top: -22},
  //------------------
  alignCenter: {alignItems: 'center'},
  justifyCenter: {justifyContent: 'center'},
  //------------------
  fullWidth: {width: '100%'},
  w1: {width: '90%'},
  maxWidth1: {maxWidth: 311},
  //------------------
  h1: {height: 195},
  //------------------
  px1: {paddingHorizontal: 32},
  pb1: {paddingBottom: 15},
  //------------------
  bgWhite: {backgroundColor: Colors.BACKGROUNDCOLOR},
  //------------------
  borderRadius1: {borderRadius: Spacing.PADDING},
  //------------------
  iconBigSize: {
    width: 64,
    height: 64,
  },
});

export default ModalCustom;
