import React, {useState} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import Modal from 'react-native-modal';
import {useCommon} from 'context/Common';
import {useError} from 'context/Common/utils';
import {scale} from 'utils/Functions';
import {Colors, Spacing, Fonts} from 'themes';
import {Text} from 'components';
const AlertCustom = () => {
  const {error} = useCommon();
  const {setError} = useError();

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!error?.errorCode}
        onBackdropPress={() => setError(null)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {!!error?.title && (
              <Text style={[styles.modalText, styles.title]}>
                {error?.title}
              </Text>
            )}
            <Text style={styles.modalText}>{error?.errorMessage}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setError(null)}>
              <Text style={styles.textStyle}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.7,
    backgroundColor: Colors.black,
  },
  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: scale(20),
    paddingHorizontal: Spacing.PADDING * 2,
    paddingVertical: Spacing.PADDING,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: Fonts.H5,
    fontWeight: 'bold',
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
