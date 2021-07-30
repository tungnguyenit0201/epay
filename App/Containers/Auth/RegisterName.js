import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Text,
  InputBlock,
  Header,
  Button,
  FWLoading,
  TextInput,
} from 'components';
import {TEXT} from 'configs/Constants';
import {Colors, Fonts, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

const RegisterName = () => {
  let [loading, setLoading] = useState(false);
  let [disable, setDisable] = useState(true);

  const register = async () => {
    Navigator.navigate(SCREEN.HOME);
  };

  return (
    <ScrollView style={styles.container}>
      <Header back shadow={false}/>

      {!loading ? (
        <View style={styles.wrap}>
          <Text style={[styles.title]} mb={20}>Nhập tên</Text>
          <Text style={styles.text} mb={40}>Lorem Ipsum is simply dummy text of 
            the printing and typesetting industry.</Text>
          <InputBlock phone style={[styles.input]} 
            placeholder="Nhập Họ và Tên"
            onFocus={e => setDisable(false)}/>
          <Button
            mt={56}
            disabled={disable}
            label="Tiếp tục"
            style={styles.btn}
            onPress={register}/>
        </View>
      ) : (
        <FWLoading wrapStyle={[styles.loading, {height: height}]} />
      )}
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
    textTransform: 'uppercase'
  },
  text: {
    fontSize: 14
  },
  input: {
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: '#fff'
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
