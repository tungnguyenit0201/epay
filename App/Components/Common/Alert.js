import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {useCommon} from 'context/Common';
import {useError} from 'context/Common/utils';
import {scale} from 'utils/Functions';
import {Colors, Spacing, Fonts, Images} from 'themes';
import {Text, Button} from 'components';
import WebView from 'components/WebView/Partial';
import {useTranslation} from 'context/Language';

const AlertCustom = () => {
  const {error} = useCommon();
  const {setError} = useError();
  const translation = useTranslation();
  const onPressAction = action => {
    typeof action === 'function' && action?.();
    error?.onClose?.();
    setError(-1);
  };
  return (
    // TODO: translate
    <View style={styles.container}>
      <Modal
        animationIn="zoomIn"
        transparent={true}
        visible={!!error?.errorMessage}
        onBackdropPress={() => onPressAction()}
      >
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
              resizeMode="contain"
            />
          </View>
          <View style={styles.modalView}>
            {!!error?.title && (
              <Text bold fs="h6" centered mb={8}>
                {error?.title}
              </Text>
            )}
            <ScrollView style={{paddingVertical: Spacing.PADDING}}>
              <WebView
                style={{minHeight: 70}}
                source={{html: ` ${error?.errorMessage}`}}
              />
            </ScrollView>
            {error?.renderContent?.()}
            {error?.action?.length > 0 &&
              error?.action?.map((item, index) => {
                return (
                  <View key={`${Math.random(1, 100)}-action`}>
                    {index == 0 ? (
                      <Button
                        label={item?.label || translation.agree}
                        onPress={() => onPressAction(item?.onPress)}
                      />
                    ) : item?.mode == 'outline' ? (
                      <Button
                        label={item?.label}
                        onPress={() => onPressAction(item?.onPress)}
                        mode="outline"
                        size="sm"
                        mt={Spacing.PADDING}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.btnOutline}
                        onPress={() => onPressAction(item?.onPress)}
                      >
                        <Text color={Colors.tp3}>{item?.label}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
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
    backgroundColor: Colors.tp2,
  },
  centeredView: {
    justifyContent: 'center',
    backgroundColor: Colors.bs4,
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
    color: Colors.bs4,
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
    marginBottom: Spacing.PADDING / 2,
  },
  bgImg: {
    width: '100%',
    position: 'absolute',
  },

  icon: {
    width: 64,
    height: 64,
  },
  btnOutline: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.PADDING,
  },
});

export default AlertCustom;
