import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, InputBlock, Header, Button} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import {useUpdateInfo} from 'context/User/utils';
const RegisterName = () => {
  let [disable, setDisable] = useState(true);
  const {sign_up} = useTranslation();
  const {onUpdatePersonalInfo, setPersonalInfo} = useUpdateInfo();

  return (
    <ScrollView style={styles.container}>
      <Header back shadow={false} title={sign_up} />

      <View style={styles.wrap}>
        <Text style={[styles.title]} mb={20}>
          Nhập tên
        </Text>
        <Text style={styles.text} mb={40}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
        <InputBlock
          style={[styles.input]}
          placeholder="Nhập Họ và Tên"
          onFocus={e => setDisable(false)}
          onChange={val => setPersonalInfo('FullName', val)}
        />
        <Button
          mt={56}
          disabled={disable}
          label="Tiếp tục"
          style={styles.btn}
          onPress={onUpdatePersonalInfo}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING * 2,
    paddingTop: Spacing.PADDING * 3,
  },
  // header: {
  //   // fontSize: Fonts.FONT_LARGE,
  //   // fontWeight: 'bold',
  //   // paddingBottom: Spacing.PADDING,
  //   // boxShadow: unset
  // },
  title: {
    fontSize: 30,
    // marginBottom: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 14,
  },
  input: {
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  btn: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterName;
