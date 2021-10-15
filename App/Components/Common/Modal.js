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
      animationIn="zoomIn"
      transparent={true}
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.alignCenter}
    >
      <View
        style={[
          styles.bgWhite,
          styles.maxWidth1,
          styles.w1,
          styles.borderRadius1,
          styles.pb1,
        ]}
      >
        <View style={styles.header}>
          <Image
            source={Images.BgModal}
            style={styles.bgImg}
            resizeMode="contain"
          />
          {icon && <Image source={icon} style={styles.icon} />}
        </View>

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
                onPress={onClose}
              >
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
  buttonClose: {backgroundColor: Colors.brd1},
  textStyle: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  //------------------
  alignCenter: {alignItems: 'center'},

  //------------------

  w1: {width: 311},
  maxWidth1: {maxWidth: '100%'},

  //------------------
  px1: {paddingHorizontal: 32},
  pb1: {paddingBottom: 15},
  //------------------
  bgWhite: {backgroundColor: Colors.BACKGROUNDCOLOR},
  //------------------
  borderRadius1: {borderRadius: Spacing.PADDING},

  header: {
    height: 124,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bgImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },

  icon: {
    width: 64,
    height: 64,
  },
});

export default ModalCustom;
