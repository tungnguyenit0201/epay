import React, {useState} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import Modal from 'react-native-modal';
import {Colors, Spacing} from 'themes';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ModalBottom = ({children, visible, onClose}) => {
  const {width} = useWindowDimensions();
  const {bottom} = useSafeAreaInsets();
  return (
    //TODO: Translate
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.alignCenter}>
      <View style={[styles.contentModal, {width: width, bottom: -bottom}]}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentModal: {
    backgroundColor: Colors.white,
    position: 'absolute',
    marginLeft: -Spacing.PADDING,
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
    padding: Spacing.PADDING,
    paddingBottom: 50,
  },
});

export default ModalBottom;
