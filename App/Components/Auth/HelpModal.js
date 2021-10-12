import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Button, Modal} from 'components';
import {Images, Colors, Spacing} from 'themes';
import {scale} from 'utils/Functions';

const HelpModal = ({showModal, setShowModal, onPress}) => {
  return (
    // TODO: translate
    <Modal
      visible={showModal}
      onClose={() => setShowModal(false)}
      title="Gọi tổng đài"
      content="Nếu bạn đang gặp vấn đề cần được giúp đỡ, vui lòng gọi về cho chúng tôi để được tư vấn hỗ trợ"
      buttonGroup={() => (
        <>
          <Button mb={15} label="Gọi 1900-0000" onPress={onPress} />
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text style={styles.textSecondary}>Không, cảm ơn</Text>
          </TouchableOpacity>
        </>
      )}
      icon={Images.SignUp.BigPhone}
    />
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
  textSecondary: {
    textAlign: 'center',
    marginTop: scale(6),
    marginBottom: Spacing.PADDING,
  },
});

export default HelpModal;
