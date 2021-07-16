import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions
} from 'react-native';
import Text from './Text';
import { Colors, Images, Spacing } from 'themes';
import { View, Dialog, TouchableOpacity } from 'react-native-ui-lib';

const { height } = Dimensions.get('window');

const Select = ({
  label,
  placeholder,
  style,
  flex,
  marginRight,
  leftComponent,
  value,
  disabled,
  onChange,
  required,
  marginBottom = 10,
  items,
  showErrorLabel = true,
  error
}) => {
  const [showModal, setShowModal] = useState(false);
  const [mappedValue, setMappedValue] = useState({});

  useEffect(() => {
    const mapped = {};
    items?.forEach((item, index) => {
      mapped[item.value] = items[index];
    });
    setMappedValue(mapped);
  }, [items]);

  const onShowModal = () => setShowModal(true);
  const onHideModal = () => setShowModal(false);

  const renderOption = (item, index) => {
    const isSelected = value === item.value;
    const borderB = index !== items?.length - 1;

    return (
      <Pressable
        key={index}
        onPress={() => {
          onChange?.(item.value);
          onHideModal();
        }}>
        <View
          paddingH-page
          paddingV-middle
          borderB={borderB}
          borderColor={'#eee'}>
          <Text color={isSelected ? Colors.PRIMARY : Colors.TEXT}>
            {item?.label}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.wrap, style, { flex, marginRight, marginBottom }]}>
      {!!label && (
        <Text medium>
          {required && <Text color={'red'}>* </Text>}
          {label}
        </Text>
      )}
      <Pressable
        disabled={disabled}
        onPress={onShowModal}
        style={styles.inputWrap}>
        {leftComponent}
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            medium
            color={disabled ? '#ccc' : Colors.Text}>
            {mappedValue?.[value]?.label || placeholder}
          </Text>
        </View>
        <Image
          source={Images.Down}
          style={{ width: 10, height: 10 }}
          resizeMode={'contain'}
        />
      </Pressable>
      {!!error && showErrorLabel && (
        <Text color={'#FF0600'} mt={3} size={12}>
          {error}
        </Text>
      )}
      <View style={{ marginBottom }} />

      <Dialog
        migrate
        useSafeArea
        center
        panDirection={'none'}
        visible={showModal}
        onDismiss={onHideModal}>
        <View backgroundColor={'white'} br20>
          <View paddingH-page paddingV-page borderB>
            <Text bold>{label}</Text>
          </View>
          <ScrollView style={styles.scroll}>
            {items?.map?.(renderOption)}
          </ScrollView>
        </View>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {},
  inputWrap: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderColor: '#F6F6F6',
    borderWidth: 1,
    paddingVertical: 11,
    paddingHorizontal: 8,
    marginTop: 10,
    borderRadius: 5
  },
  scroll: { maxHeight: height * 0.7 },
  error: {
    borderColor: 'red',
    borderWidth: 1
  }
});

export default Select;
