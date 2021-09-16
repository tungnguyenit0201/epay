import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../Atoms/Icon';
import Text from '../Atoms/Text';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

import {formatMoney} from 'utils/Functions';

const Monney = ({style}) => {
  const translation = require('../../Context/Language/vi.json');
  const [showMoney, setShowMoney] = useState(false);

  return (
    <View style={[styles.item, style]}>
      <View style={[]}>
        <Text fs="h6" style={[styles.title]}>
          {translation.my_wallet} :
        </Text>
      </View>
      <View style={[styles.right]}>
        <View style={base.row}>
          {!showMoney ? (
            <Text fs="h6" style={[styles.text, {paddingTop: 5}]}>
              ******
            </Text>
          ) : (
            <Text bold fs="h5" style={[styles.text]}>
              {formatMoney('100000')}đ
            </Text>
          )}
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => setShowMoney(!showMoney)}>
            <Icon
              icon={showMoney ? Images.Eye : Images.EyeGray}
              tintColor={Colors.white}
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
    marginBottom: 20,
  },
  title: {color: Colors.white},
  right: {
    marginLeft: 'auto',
  },
  text: {
    height: 25,
    color: Colors.white,
  },
});

export default React.memo(Monney);
