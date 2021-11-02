import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Text} from 'components';
import {Colors, Images, base} from 'themes';
import {scale} from 'utils/Functions';

const ButtonAdd = ({
  onPress,
  label,
  mt,
  mb,
  ml,
  mr,
  style,
  color,
}) => {
  return (
    <TouchableOpacity
      style={[base.row, 
        styles.btnAddBank,
        mt && {marginTop: mt},
        mb && {marginBottom: mb},
        ml && {marginLeft: ml},
        mr && {marginRight: mr},
        style]}
      onPress={onPress}
    >
      <View style={styles.flex1}>
        <Text fs="h6" color={color} mr={10}>{label}</Text>
      </View>
      <Image
        source={Images.ConnectBank.Plus}
        style={styles.iconPlus}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};
export default ButtonAdd;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  //---------------
  iconPlus: {
    width: scale(24),
    height: scale(24),
  },
  //----------------
  btnAddBank: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.bs1,
    borderRadius: 8,
  },
});
