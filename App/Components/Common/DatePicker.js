import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Image} from 'react-native';
import {Colors, Images, Fonts} from 'themes';
import Text from './Text';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {scale} from 'utils/Functions';
import moment from 'moment';

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
  noIconBg,
  ...props
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const displayFormat = type === 'date' ? 'DD/MM/YYYY' : 'HH:mm DD/MM/YYYY';
  const valueFormat = type === 'date' ? 'DD-MM-YYYY' : 'YYYY-MM-DD HH:mm';
  // const formatedDate = value ? dayjs(value).format(displayFormat) : placeholder;
  const [date, setDate] = useState(moment(value, valueFormat).toDate());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    onChange?.(dayjs(selectedDate).format(valueFormat));
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
        style={[styles.wrap, error && styles.error, style]}
      >
        <View style={[styles.block1, styles.fullHeight, styles.flex1]}>
          <Text color={!!value ? Colors.TEXT : Colors.GRAY} style={styles.pl1}>
            {value}
          </Text>
        </View>
        <View
          style={[
            styles.blockIcon1,
            styles.fullHeight,
            {backgroundColor: noIconBg ? 'unset' : Colors.l4},
          ]}
        >
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
        // date={date}
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cl4,
  },
  //----------------
  flex1: {flex: 1},
  //----------------
  fullHeight: {height: '100%'},
  //----------------
  pl1: {paddingLeft: 10},
  //----------------
  error: {
    borderColor: Colors.ALERT,
    borderWidth: 1,
  },
  //-----------------
  icon: {
    width: 24,
    height: 24,
    tintColor: Colors.GRAY,
  },
  blockIcon1: {
    justifyContent: 'center',
    right: -1,
    padding: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  block1: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
