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

const ModalCustom = ({children, visible, onClose, icon}) => {
  return (
    <Modal transparent={true} isVisible={visible} onBackdropPress={onClose}>
      <View style={[styles.Modal]}>
        <View style={styles.header}>
          <Image
            source={Images.BgModal}
            style={styles.bgImg}
            resizeMode="contain"
          />
          {icon && <Image source={icon} style={styles.icon} />}
        </View>
        <View style={styles.contentModal}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Modal: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    position: 'relative',
    width: 311,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  contentModal: {
    padding: scale(20),
  },
  header: {
    height: 124,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
