import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Text from '../Atoms/Text';
import {scale} from 'utils/Functions';
import { FONT_BOLD_ITALIC } from 'themes/Fonts';

const Xacthuc = ({style}) => {
  const [isShow, setIsShow] = useState(true);
  return (
    <>
      {isShow && (
        <View style={[styles.item, style]}>
          <TouchableOpacity
            onPress={() => {
              console.log('press')
            }}
            style={styles.box}>
            <Text>
              Vui lòng định danh
              <Text bold>(bấm vào đây)</Text>
              để bảo vệ tài khoản của bạn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.close}
            onPress={() => setIsShow(!isShow)}>
            <Text style={{
              color:"#fff",
              fontSize: 14,
              lineHeight: 14,
              textAlign: 'center',
              marginTop: -1,
              }}>
              x
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    position: 'relative',
  },
  box: {
    backgroundColor: '#FFEDED',
    borderRadius: 16,
    padding: scale(20),
  },
  close: {
    width: 16,
    height: 16,
    backgroundColor: '#D70000',
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: 99,
  },
  closeText: {
    lineHeight: 14,
    textAlign: 'center',
    marginTop: -1,
    marginLeft: '20px'
  },
});

export default Xacthuc;
