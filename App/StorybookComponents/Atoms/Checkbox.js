import React, {useState} from 'react';
import {StyleSheet, Image, Pressable, View} from 'react-native';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {scale} from 'utils/Functions';

import Text from './Text';
const Checkbox = ({onPress, hitSlop, label}) => {
  const [active, setActive] = useState(false);
  const _onPress = () => {
    onPress && onPress(!active);
    setActive(active => !active);
  };

  return (
    <Pressable
      hitSlop={hitSlop}
      style={{flexDirection: 'row'}}
      onPress={_onPress}>
      {
        <>
          <View
            style={[
              styles.container,
              !active && styles.checked,
              label && {marginRight: 10},
              ,
            ]}>
            <Image
              resizeMode="cover"
              source={Images.Check}
              style={{
                width: '100%',
                height: '100%',
                display: active ? 'flex' : 'none', //tránh tạo lại component mới load hình lâu
              }}></Image>
          </View>
          {<Text>{label}</Text>}
        </>
      }
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(3),
    overflow: 'hidden',
  },
  checked: {
    borderColor: Colors.MEDIUMGRAY,
    borderWidth: 1,
  },
});
