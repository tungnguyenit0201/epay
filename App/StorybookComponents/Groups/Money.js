import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Button from '../Atoms/Button';
import Icon from '../Atoms/Icon';
import Text from '../Atoms/Text';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

const Eye = require('images/Eye.png');
const EyeGray = require('images/EyeGray.png');

const Money = ({style}) => {
  const translation = require('../../Context/Language/vi.json');
  const [isMoney, setIsMoney] = useState(false);
  return (
    <View style={[styles.item, base.shadow, style]}>
      <View style={[]}>
        <Text size={Fonts.H6} style={styles.title}>
        {translation.my_wallet}
        </Text>
      </View>
      <View style={[styles.right]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!isMoney ? (
            <Text size={Fonts.H2} style={[styles.text, {paddingTop: 3}]}>
              ******
            </Text>
          ) : (
            <Text bold size={Fonts.H5} style={styles.text}>
              5555 đ
            </Text>
          )}
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => setIsMoney(!isMoney)}>
            <Icon
              icon={isMoney ? Eye : EyeGray}
              //tintColor={isMoney ? Colors.l4 : ''}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 99,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {},
  right: {
    marginLeft: 'auto',
  },
  text: {
    height: 20,
  },
});

export default Money;
