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
          <Text color={!!value ? Colors.TEXT : Colors.GRAY} style={styles.pl1}>
            {value}
          </Text>
        </View>
        <View
          style={[
            styles.fullHeight,
            styles.justifyCenter,
            styles.p1,
            {backgroundColor: Colors.l4},
          ]}>
          <Image
            source={Images.Kyc.Calendar}
            style={styles.icon}
            resizeMode={'contain'}
          />
        </View>
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
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.cl4,
  },
  //----------------
  fullHeight: {height: '100%'},
  //----------------
  justifyCenter: {justifyContent: 'center'},
  //----------------
  p1: {padding: 12},
  //----------------
  pl1: {paddingLeft: 10},
  //----------------
  error: {
    borderColor: Colors.ALERT,
    borderWidth: 1,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: Colors.GRAY,
  },
});
