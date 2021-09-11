import React, {useRef, useState} from 'react';
import {ScrollView, View, StyleSheet, Pressable, Image} from 'react-native';
// import {
//   Text,
//   Header,
//   Button,
//   HeaderBg,
//   ActionSheet,
//   InputBlock,
// } from 'components';
import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import InputBlock from '../../../Atoms/InputBlock';
import Button from '../../../Atoms/Button';
import {base, Colors, Images} from 'themes';

const ChooseIdentityCard = () => {
  // const {verifyInfo, onChange, onContinue} = useVerifyInfo();
  const translation = require('../../../../Context/Language/vi.json');
  const [visible, setVisible] = useState(false);

  // TODO: translate
  let cardList = [
    {label: translation?.id_card, value: 1},
    {label: 'Chứng minh thư quân đội', value: 2},
    {label: translation?.passport, value: 3},
  ];
  // cardList?.map((item, index) => {
  //   cardList[index] = {...item, onPress: () => onChange('identifyCard', item)};
  // });
  return (
    <>
      <View style={styles.bgWhite}>
        <HeaderBg>
          <Header back title={translation?.verify_your_account} />
        </HeaderBg>
      </View>

      <View
        style={[
          base.container,
          styles.bgWhite,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            flex: 1,
          },
        ]}>
        <Text fs="h6" bold mb={24}>
          Định danh tài khoản để bảo mật và nhận được nhiều ưu đãi hơn
        </Text>

        <InputBlock
          label="Chọn giấy tờ tuỳ thân"
          isSelect
          onPress={() => setVisible(true)}
          rightIcon={Images.Down}
          value={cardList[0].label}
        />
      </View>

      <View style={base.bottom}>
        <Button
          label={translation?.continue}
          onPress={() => console.log('hello')}
        />
        {/* <ActionSheet
          visible={visible}
          setVisible={setVisible}
          data={cardList}
          // cancelButtonIndex={0}
          useNativeIOS={true}
          showCancelButton={false}
          renderTitle={() => (
            <View style={styles.childModal}>
              <Text bold fs="h6" centered color={Colors.cl1}>
                Trợ giúp
              </Text>
              <Pressable style={styles.btn}>
                <Image
                  source={Images.WidthDraw.Plus}
                  style={styles.iconClose}
                />
              </Pressable>
            </View>
          )}
          containerStyle={[
            styles.bgWhite,
            {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          ]}
        /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: Colors.white,
  },
  // iconClose: {
  //   height: 13,
  //   width: 13,
  //   transform: [{rotate: '45deg'}],
  // },
  // childModal: {
  //   padding: 16,
  //   borderStyle: 'solid',
  //   borderBottomColor: Colors.l2,
  //   borderBottomWidth: 1,
  // },
});
export default ChooseIdentityCard;
