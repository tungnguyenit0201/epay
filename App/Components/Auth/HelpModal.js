import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Button, Modal} from 'components';
import {Images, Colors, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';
const HelpModal = ({showModal, setShowModal, onPress}) => {
  const translation = useTranslation();
  return (
    <Modal
      visible={showModal}
      onClose={() => setShowModal(false)}
      title={translation.call_the_center}
      content={
        translation.if_you_have_a_problem_and_need_help_please_call_us_for_advice_and_support
      }
      buttonGroup={() => (
        <>
          <Button mb={15} label={translation.call_19000000} onPress={onPress} />
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text style={styles.textSecondary}>{translation.no_thank_you}</Text>
          </TouchableOpacity>
        </>
      )}
      icon={Images.SignUp.BigPhone}
    />
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.bs4,
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
    borderBottomColor: Colors.bs2,
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
