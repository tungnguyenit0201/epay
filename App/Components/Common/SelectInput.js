import React, {useState} from 'react';
import {TouchableOpacity, View, StyleSheet, TextInput} from 'react-native';
import {Text, Row} from '..';
import Modal from 'react-native-modal';
import Colors from 'themes/Colors';
import Spacing from 'themes/Spacing';
import {scale} from 'utils/Functions';
import Icon from './Icon';
import Images from 'themes/Images';

// Example:
// <SelectInput
//   optionList={[
//     {label: 'CMND', value: 'cmnd'},
//     {label: 'Căn cước', value: 'cancuoc'},
//   ]}
//   defaultValue={'cancuoc'}
//   style={{}}
//   inputStyle={{}}
// />;

const SelectInput = ({
  optionList,
  defaultValue,
  style,
  inputStyle,
  onSelect,
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => {
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
  };

  const _onSelect = value => {
    onSelect && onSelect();
    setSelectedValue(value);
    onHideModal();
  };

  return (
    <Row style={[styles.container, style]}>
      <TouchableOpacity onPress={onShowModal}>
        <Row style={styles.selectContainer}>
          <Text>
            {selectedValue?.label ||
              optionList.find(x => x.value === defaultValue)?.label}
          </Text>
          <Icon icon={Images.Down} />
        </Row>
      </TouchableOpacity>
      <View style={styles.seperator} />
      <TextInput style={[styles.input, inputStyle]} />
      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{flex: 1}}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        onBackdropPress={onHideModal}>
        <ModalContent optionList={optionList} onselect={_onSelect} />
      </Modal>
    </Row>
  );
};

const ModalContent = ({optionList, onselect}) => {
  return (
    <View style={styles.modalContainer}>
      {optionList.map(item => {
        const {value, label} = item;
        return (
          <TouchableOpacity key={value} onPress={() => onselect(item)}>
            <Text>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(8),
    borderColor: Colors.gray,
    borderWidth: 1,
  },
  selectContainer: {
    padding: Spacing.PADDING / 2,
  },
  seperator: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.gray,
  },
  modalContainer: {
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  input: {
    flex: 1,
    marginHorizontal: Spacing.PADDING / 2,
  },
});
