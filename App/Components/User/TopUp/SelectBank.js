import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Text, Row, Col} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';

const SelectBank = ({data, label, style}) => {
  const translation = useTranslation();
  let [value, setValue] = useState(1);
  const [checked, setChecked] = useState();

  return (
    <View style={[styles.block, style]}>
      <Text bold size={Fonts.H6} mb={20}>
        {label}
      </Text>

      <Row space="10">
        {data.map((item, index) => (
          <Col width="33.33%" space="10" key={index}>
            <Pressable
              style={[styles.item]}
              onPress={() => setChecked(item.id)}>
              <View style={[styles.wicon]}>
                <Image source={item.icon} style={[styles.icon]} />
              </View>
              <Text centered size={12} mt={5}>
                {item.name}
              </Text>
              {checked === item.id && <Text>sss</Text>}
            </Pressable>
          </Col>
        ))}
      </Row>

      <View style={styles.itemAddBank}>
        <Image source={Images.Bank.Plus} style={[styles.iconAddBank]} />
        <Text centered>{translation.add_cardbank_account}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  block: {
    marginBottom: 20,
  },
  item: {
    alignItems: 'center',
    marginBottom: 20,
  },
  wicon: {
    width: scale(48),
    height: scale(48),
    backgroundColor: '#DAE9F8',
    borderRadius: 16,
    marginBottom: 5,
  },
  icon: {
    width: scale(28),
    height: scale(28),
    resizeMode: 'contain',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: scale(-14)}, {translateY: scale(-14)}],
  },

  itemAddBank: {
    alignItems: 'center',
    borderColor: Colors.l5,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  iconAddBank: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    marginBottom: 10,
  },
});
export default SelectBank;
