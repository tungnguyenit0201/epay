import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import Text from './Text';
import {Colors, Images, Spacing} from 'themes';
import {View, Dialog, TouchableOpacity} from 'react-native-ui-lib';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {height} = Dimensions.get('window');

const Picker = ({
  label,
  placeholder,
  style,
  flex,
  marginRight,
  leftComponent,
  value,
  disabled,
  onChange,
  items,
}) => {
  const [showModal, setShowModal] = useState(false);
  const {bottom} = useSafeAreaInsets();

  const onShowModal = () => setShowModal(true);
  const onHideModal = () => setShowModal(false);

  const renderOption = (item, index) => {
    const isSelected = value?.value_index === item.value_index;
    const borderB = index !== items?.length - 1;

    return (
      <Pressable
        key={index}
        onPress={() => {
          onChange?.(item);
          onHideModal();
        }}
      >
        <View
          paddingH-page
          paddingV-middle
          borderB={borderB}
          borderColor={Colors.l2}
        >
          <Text color={isSelected ? Colors.brd1 : Colors.BLACKTEXT}>
            {item?.label}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.wrap, style, {flex, marginRight}]}>
      {!!label && <Text medium>{label}</Text>}
      <Pressable
        disabled={disabled}
        onPress={onShowModal}
        style={styles.inputWrap}
      >
        {leftComponent}
        <View style={{flex: 1}}>
          <Text
            numberOfLines={1}
            medium
            color={disabled ? Colors.l4 : Colors.BLACKTEXT}
          >
            {value?.label || placeholder}
          </Text>
        </View>
        <Image
          source={Images.Down}
          style={{width: 10, height: 10}}
          resizeMode={'contain'}
        />
      </Pressable>
      <Dialog
        migrate
        bottom
        panDirection={'down'}
        visible={showModal}
        onDismiss={onHideModal}
        width={'100%'}
        background-white
      >
        <View backgroundColor={'white'} br20 style={{paddingBottom: bottom}}>
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
  wrap: {
    marginTop: Spacing.PADDING,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.BORDER,
    borderWidth: 1,
    paddingVertical: 11,
    paddingHorizontal: 8,
    marginTop: 10,
    borderRadius: 5,
  },
  scroll: {maxHeight: height * 0.7},
});

export default Picker;
