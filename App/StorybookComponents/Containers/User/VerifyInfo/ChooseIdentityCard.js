import React, {useRef, useState} from 'react';
import {ScrollView, View, StyleSheet, Pressable, Image} from 'react-native';
import {base, Colors, Images} from 'themes';
import {IC_TPYE, SCREEN} from 'configs/Constants';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DropDown from '../../../Groups/DropDown';
import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import Button from '../../../Atoms/Button';
import HeaderBg from '../../../Atoms/HeaderBg';
import InputBlock from '../../../Atoms/InputBlock';
const ChooseIdentityCard = ({route}) => {
  const translation = require('../../../../Context/Language/vi.json');
  const [visible, setVisible] = useState(false);

  // TODO: translate
  let cardList = [
    {label: 'CMND/CCCD', ICType: 1},
    {label: 'Chứng minh thư quân đội', ICType: 3},
    {label: 'Hộ chiếu', ICType: 2},
  ];

  return (
    <SafeAreaProvider>
      <View style={styles.bgWhite}>
        <HeaderBg>
          <Header back title={translation?.verify_your_account} />
        </HeaderBg>
      </View>

      <View style={[base.container, styles.bgWhite, styles.flex1, styles.pt1]}>
        <Text fs="h6" bold mb={24}>
          Định danh tài khoản để bảo mật và nhận được nhiều ưu đãi hơn
        </Text>

        <InputBlock
          label="Chọn giấy tờ tuỳ thân"
          isSelect
          onPress={() => setVisible(true)}
          rightIcon={Images.Down}
          value="CMND/CCCD"
        />
      </View>

      <View style={base.bottom}>
        <Button label={translation?.continue} />
        <DropDown
          visible={visible}
          setVisible={setVisible}
          title={'Chọn giấy tờ tuỳ thân'}
          data={cardList}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: Colors.white,
  },
  flex1: {flex: 1},
  pt1: {paddingTop: 20},
});
export default ChooseIdentityCard;
