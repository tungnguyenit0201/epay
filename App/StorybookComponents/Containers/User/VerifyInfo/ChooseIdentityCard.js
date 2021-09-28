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
import Wrapper from '../../../Groups/Wrapper';
import FooterContainer from '../../../Atoms/FooterContainer';
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
    <Wrapper>
      <SafeAreaProvider>
        <View>
          <View style={styles.bgWhite}>
            <HeaderBg>
              <Header
                back
                title={translation?.verify_your_account}
                style={{marginTop: 40, marginBottom: -15}}
              />
            </HeaderBg>
          </View>

          <View
            style={[base.container, styles.bgWhite, styles.flex1, styles.pt1]}>
            <Text fs="h6" bold mb={15}>
              Định danh tài khoản để bảo mật và nhận được nhiều ưu đãi hơn
            </Text>

            <View style={{position: 'relative'}}>
              <InputBlock
                label="Chọn giấy tờ tuỳ thân"
                isSelect
                onPress={() => setVisible(true)}
                value="CMND/CCCD"
              />
              <Image
                source={Images.Down.default}
                style={{
                  width: 20,
                  height: 14,
                  position: 'absolute',
                  right: 10,
                  top: '60%',
                }}
              />
            </View>
          </View>
        </View>
        <DropDown
          visible={visible}
          setVisible={setVisible}
          title={'Chọn giấy tờ tuỳ thân'}
          data={cardList}
        />
      </SafeAreaProvider>
      <Image source={require('images/wave.png').default} style={styles.bgImg} />
      <FooterContainer>
        <Image
          source={Images.Gradient.B_Continue.default}
          style={base.buttonSB}
        />
      </FooterContainer>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: Colors.white,
  },
  flex1: {flex: 1},
  pt1: {paddingTop: 20},
  bgImg: {
    width: 375,
    height: 375,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
export default ChooseIdentityCard;
