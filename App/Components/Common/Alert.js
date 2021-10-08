import React, {useState} from 'react';
import {StyleSheet, Pressable, View, Platform, Image} from 'react-native';
import Modal from 'react-native-modal';
import {useCommon} from 'context/Common';
import {useError} from 'context/Common/utils';
import {scale} from 'utils/Functions';
import {Colors, Spacing, Fonts, Images} from 'themes';
import {Text, Button} from 'components';
import WebView from 'components/WebView/Partial';

const AlertCustom = () => {
  const {error} = useCommon();
  const {setError} = useError();

  return (
    // TODO: translate
    <View style={styles.container}>
      <Modal
        animationIn="zoomIn"
        transparent={true}
        visible={!!error?.errorCode}
        onBackdropPress={() => setError(null)}>
        <View style={styles.centeredView}>
          <View style={styles.header}>
            <Image
              source={Images.BgModal}
              style={styles.bgImg}
              resizeMode="contain"
            />
            <Image
              source={error?.icon ? error?.icon : Images.Modal.Danger}
              style={styles.icon}
            />
          </View>
          <View style={styles.modalView}>
            {!!error?.title && (
              <Text bold fs="h6" centered mb={8}>
                {error?.title}
              </Text>
            )}
            <View style={{paddingVertical: Spacing.PADDING}}>
              <WebView
                style={{minHeight: 70}}
                source={{html: ` ${error?.errorMessage}`}}
              />
            </View>

            {/* <Text style={styles.modalText}>{error?.errorMessage}</Text> */}
            <Button
              label={error?.label || 'Đóng'}
              onPress={() => {
                setError(null);
                error?.onClose && error?.onClose();
              }}
            />
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
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: scale(20),
    width: scale(311),
    alignSelf: 'center',
    paddingBottom: Spacing.PADDING,
  },
  modalView: {
    paddingHorizontal: Spacing.PADDING * 2,
    paddingVertical: Spacing.PADDING,
  },
  title: {
    fontSize: Fonts.H5,
    fontWeight: 'bold',
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
  header: {
    height: 124,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bgImg: {
    width: '100%',
    position: 'absolute',
  },

  icon: {
    width: 64,
    height: 64,
  },
});

export default AlertCustom;
