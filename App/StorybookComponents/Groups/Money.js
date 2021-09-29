import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from '../Atoms/Icon';
import Text from '../Atoms/Text';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

import {useUser} from 'context/User';
const Monney = ({style}) => {
  const translation = require('../../Context/Language/vi.json');
  const [isMoney, setIsMoney] = useState(false);
  return (
    <View style={[styles.item, style]}>
      <View style={[]}>
        <Text style={{fontSize: 14}}>{translation.my_wallet}</Text>
      </View>
      <View style={[styles.right]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!isMoney ? (
            <Text size={Fonts.H2} style={[styles.text, {paddingTop: 3}]}>
              ******
            </Text>
          ) : (
            <Text bold size={Fonts.H5} style={styles.text}>
              7.000.000 vnđ
            </Text>
          )}
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => setIsMoney(!isMoney)}>
            <Icon
              icon={isMoney ? Images.Eye : Images.EyeGray}
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
    backgroundColor: Colors.l1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },

  right: {
    marginLeft: 'auto',
  },
  text: {
    height: 20,
  },
});

export default Monney;
