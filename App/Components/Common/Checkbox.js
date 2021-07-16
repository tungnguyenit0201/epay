import React, {useState} from 'react';
import {StyleSheet, Image, Pressable} from 'react-native';
import Colors from 'themes/Colors';
import Images from 'themes/Images';
import {scale} from 'utils/Functions';

const Checkbox = ({onPress, hitSlop}) => {
  const [active, setActive] = useState(false);
  const _onPress = () => {
    onPress && onPress(!active);
    setActive(active => !active);
  };

  return (
    <Pressable
      hitSlop={hitSlop}
      style={[styles.container, !active && styles.checked]}
      onPress={_onPress}>
      {
        <Image
          resizeMode="cover"
          source={Images.Check}
          style={{
            width: '100%',
            height: '100%',
            display: active ? 'flex' : 'none', //tránh tạo lại component mới load hình lâu
          }}></Image>
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
