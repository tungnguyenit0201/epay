import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Header, Button, FWLoading} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import Password from 'components/Auth/Password';

const Withdraw = () => {
  let {height} = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  let forgotRef = useRef({
    phone: '',
  });
  const onChange = (key, val) => {
    forgotRef.current[key] = val;
  };

  const onPress = async () => {
    Navigator.navigate('TabNavigation');
  };
  return (
    <ScrollView style={styles.container}>
      <Header back title="Rút tiền" />
      <InputBlock label="Số tiền" />
      <Button
        label="Liên kết ngân hàng"
        onPress={() => Navigator.navigate('Bank')}
      />
      <Button label="Rút" onPress={() => Navigator.navigate('Confirmation')} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING * 3,
  },
  header: {
    fontSize: Fonts.FONT_LARGE,
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Withdraw;
