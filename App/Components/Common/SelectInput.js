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
  showInputStyle = true,
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
        <Row
          style={[styles.selectContainer, !showInputStyle && {width: '80%'}]}
        >
          <Text>
            {selectedValue?.label ||
              optionList.find(x => x.value === defaultValue)?.label}
          </Text>
          <Icon icon={Images.Down} style={{width: 12}} />
        </Row>
      </TouchableOpacity>
      {showInputStyle && <View style={styles.seperator} />}
      {showInputStyle && <TextInput style={[styles.input, inputStyle]} />}
      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{flex: 1}}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        onBackdropPress={onHideModal}
      >
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
          <TouchableOpacity
            key={value}
            onPress={() => onselect(item)}
            style={{
              paddingBottom: 10,
              marginBottom: 10,
              borderColor: Colors.tp3,
              borderBottomWidth: 1,
            }}
          >
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
    borderColor: Colors.tp3,
    borderWidth: 1,
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 113,
    marginRight: 10,
    paddingVertical: Spacing.PADDING / 2,
    paddingLeft: Spacing.PADDING / 2,
  },
  seperator: {
    width: 1,
    height: '55%',
    marginTop: 10,
    backgroundColor: Colors.bs1,
  },
  modalContainer: {
    backgroundColor: Colors.bs4,
    padding: Spacing.PADDING / 2,
  },
  input: {
    flex: 1,
    marginHorizontal: Spacing.PADDING / 2,
  },
});
