import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Image} from 'react-native';
import {Colors, Images, Fonts} from 'themes';
import Text from './Text';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {scale} from 'utils/Functions';

export default ({
  placeholder,
  onChange,
  style,
  marginBottom = 19,
  error,
  value,
  label,
  required,
  showErrorLabel = true,
  type = 'date',
  ...props
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const displayFormat = type === 'date' ? 'DD/MM/YYYY' : 'HH:mm DD/MM/YYYY';
  const valueFormat = type === 'date' ? 'DD-MM-YYYY' : 'YYYY-MM-DD HH:mm';
  const formatedDate = value ? dayjs(value).format(displayFormat) : placeholder;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    onChange?.(dayjs(date).format(valueFormat));
    hideDatePicker();
  };

  return (
    <>
      {!!label && (
        <Text medium mb={10}>
          {label}
          {required && <Text color={'red'}> *</Text>}
        </Text>
      )}

      <Pressable
        onPress={showDatePicker}
        style={[styles.wrap, error && styles.error]}>
        <View style={{flex: 1}}>
          <Text color={!!value ? Colors.TEXT : Colors.GRAY}>{value}</Text>
        </View>
        <Image
          source={Images.DatePicker}
          style={styles.icon}
          resizeMode={'contain'}
        />
      </Pressable>
      {!!error && showErrorLabel && (
        <Text color={Colors.ALERT} mt={3} size={scale(12)}>
          {error}
        </Text>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={type}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale={'vi'}
        cancelTextIOS={'Đóng'}
        confirmTextIOS={'Chọn'}
        headerTextIOS={'Vui lòng chọn ngày'}
        maximumDate={new Date()}
        themeVariant={'light'}
      />
      <View style={{marginBottom}} />
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    height: 48,
    paddingVertical: 10,
    paddingHorizontal: 11,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CCCCCB',
  },
  error: {
    borderColor: Colors.ALERT,
    borderWidth: 1,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: Colors.GRAY,
  },
});
