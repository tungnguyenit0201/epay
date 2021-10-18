import React from 'react';
import {
  View,
  Pressable,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {Text, Button} from 'components';
import {Images, Colors, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HelpModal = ({showModal, setShowModal, onPress}) => {
  const {height, width} = useWindowDimensions();
  const {bottom} = useSafeAreaInsets();

  return (
    // TODO: translate
    <Modal
      isVisible={showModal}
      transparent={true}
      onBackdropPress={() => setShowModal(false)}>
      <View style={[styles.modal, {width: width, bottom: -bottom}]}>
        <View style={styles.header}>
          <Text bold fs="h6" centered color={Colors.cl1}>
            Trợ giúp
          </Text>
          <Pressable style={styles.btn} onPress={() => setShowModal(false)}>
            <Image source={Images.WidthDraw.Plus} style={styles.img} />
          </Pressable>
        </View>

        <View style={[styles.wrap]}>
          <Text centered fs="md" mb={48}>
            Nếu bạn gặp vấn đề cần giúp đỡ, vui lòng gọi về cho chúng tôi để
            được tư vấn hỗ trợ.
          </Text>
          <Button mb={10} label="Gọi 1900-0000" onPress={onPress} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.white,
    position: 'absolute',
    marginLeft: -Spacing.PADDING,
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
  },
  wrap: {
    padding: Spacing.PADDING,
  },
  header: {
    padding: Spacing.PADDING,
    borderStyle: 'solid',
    borderBottomColor: Colors.l2,
    borderBottomWidth: 1,
  },
  btn: {
    position: 'absolute',
    top: scale(20),
    right: Spacing.PADDING,
  },
  img: {
    height: scale(13),
    width: scale(13),
    transform: [{rotate: '45deg'}],
  },
});

export default HelpModal;
