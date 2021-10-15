import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Text from './Text';
import {Colors, Images, Spacing} from 'themes';
import {View, Dialog, WheelPicker} from 'react-native-ui-lib';
import {TEXT} from 'configs/Constants';

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

  const onShowModal = () => {
    if (!value && items?.length) {
      onChange(items[0]);
    }
    setShowModal(true);
  };
  const onHideModal = () => setShowModal(false);

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
            color={disabled ? Colors.l2 : Colors.Text}
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
        panDirection={'none'}
        visible={showModal}
        onDismiss={onHideModal}
        width={'100%'}
      >
        <View background-white br20>
          <View row>
            <View flex padding-page>
              <Text bold>{label}</Text>
            </View>
            <TouchableOpacity
              style={{
                paddingRight: Spacing.PADDING,
                paddingTop: Spacing.PADDING / 2,
              }}
              onPress={onHideModal}
            >
              <Text semibold color={Colors.brd1}>
                {TEXT.DONE}
              </Text>
            </TouchableOpacity>
          </View>
          <WheelPicker
            onValueChange={(value, index) => onChange(items[index])}
            selectedValue={value?.value_index}
            itemStyle={{alignItems: 'flex-start'}}
          >
            {items?.map?.((item, idx) => {
              return (
                <WheelPicker.Item
                  key={String(idx) + String(item.value_index)}
                  value={item.value_index}
                  label={item.label}
                />
              );
            })}
          </WheelPicker>
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
  // scroll: {maxHeight: height * 0.7},
});

export default Picker;
