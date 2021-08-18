import React, {useState} from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import Modal from 'react-native-modal';
import {useCommon} from 'context/Common';
import {useError} from 'context/Common/utils';
import {scale} from 'utils/Functions';
import {Colors, Spacing} from 'themes';
const AlertCustom = () => {
  const {error} = useCommon();
  const {setError} = useError();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!error?.ErrorCode}
      onBackdropPress={() => setError(null)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{error?.ErrorMessage}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setError(null)}>
            <Text style={styles.textStyle}>Đóng</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: scale(20),
    paddingHorizontal: Spacing.PADDING * 2,
    paddingVertical: Spacing.PADDING,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: scale(20),
    paddingVertical: Spacing.PADDING / 2,
    paddingHorizontal: Spacing.PADDING,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: Colors.PRIMARY,
  },
  textStyle: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: Spacing.PADDING,
    textAlign: 'center',
  },
});

export default AlertCustom;
