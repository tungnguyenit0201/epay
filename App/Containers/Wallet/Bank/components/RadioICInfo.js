import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'components';
import {Colors} from 'themes';
import {scale} from 'utils/Functions';

const Radio = ({
  items, // [{label, value}]
  onChange,
  selectedItem,
}) => {
  const onPress = item => {
    onChange?.(item);
  };

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }
  return (
    <View style={{}}>
      <View style={{}}>
        {items.map((item, index) => (
          <TouchableOpacity
            onPress={() => onPress?.(item)}
            key={index}
            style={[styles.radio]}
          >
            <View style={styles.tickWrap}>
              {item?.value === selectedItem?.value ? (
                <View style={styles.tick} />
              ) : null}
            </View>
            <Text mt={2}>{item?.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const RadioICInfo = forwardRef(
  ({kycInfo, selectedItem: propsSelectedItem, style}, ref) => {
    const data = kycInfo;
    const [selectedItem, setSelectedItem] = useState(
      propsSelectedItem || data?.[0],
    );

    useImperativeHandle(ref, () => ({getItem}));
    const getItem = () => {
      return selectedItem;
    };
    const handleChange = item => {
      setSelectedItem(item);
    };

    return (
      <View>
        <Text style={{}}>
          Thông tin giấy tờ tuỳ thân mà bạn chọn để liên kết phải trùng khớp với
          thông tin giấy tờ tuỳ thân được khai báo tại ngân hàng.
        </Text>
        <Radio
          onChange={handleChange}
          items={data}
          selectedItem={selectedItem}
          style={[styles.radioView]}
          wrapStyle={{flexDirection: 'column', flexWrap: ''}}
          marginBottom={0}
        />
      </View>
    );
  },
);
export default RadioICInfo;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUNDCOLOR,
    paddingBottom: 40,
    marginTop: 16,
    // padding: 16,
  },
  image: {
    width: 20,
    height: 20,
  },
  icon: {
    position: 'absolute',
    top: 48,
    left: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.cl4,
    zIndex: 1,
  },
  input_text: {
    paddingLeft: 50,
    // borderRightWidth: 1,
    // borderStyle: 'solid',
    // borderColor: Colors.l4,
    borderWidth: 0,
    borderRadius: 8,
  },
  item: {alignItems: 'center', flex: 1},
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(40),
    marginTop: 12,
  },
  radioView: {
    marginRight: 0,
    marginTop: 4,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'column',
  },

  radioEnd: {
    marginRight: 0,
  },
  tickWrap: {
    width: 15,
    height: 15,
    borderColor: Colors.l6,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  tick: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.cl1,
  },
});
