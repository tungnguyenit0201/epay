import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Icon, Text} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';

import {useUser} from 'context/User';
import {formatMoney} from 'utils/Functions';
const Monney = ({style}) => {
  const {userInfo} = useUser();
  const translation = useTranslation();
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
              {formatMoney(userInfo?.myWallet)}
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

export default Monney;
