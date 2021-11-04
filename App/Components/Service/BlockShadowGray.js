import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'components';
// import {useTranslation} from 'context/Language';
// import {scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts, base} from 'themes';

const BlockShadowGray = ({title, callback, 
  text,mb=16, noArrow=false}) => (
  <TouchableOpacity
    style={[styles.boxItem1, base.boxShadowGray,
      {marginBottom: mb}]}
    onPress={callback}
  >
    <View flex={1}>
      <Text size={Fonts.LG} bold mr={10}>
        {title}
      </Text>
      {!!text && 
      <Text size={Fonts.MD} color={Colors.tp3} mt={5}>{text}</Text>}
    </View>

    {!noArrow && <Image
      source={Images.Right}
      style={styles.iconRight}
      resizeMode='contain'
    />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  iconRight: {
    width: 20,
    tintColor: Colors.tp3,
    aspectRatio: 1,
  },
  //---------------
  boxItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 16,
  },
});

export default BlockShadowGray;
