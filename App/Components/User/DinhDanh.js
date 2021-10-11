import React from 'react';
import {Text, Button} from 'components';
import {View, Image, StyleSheet} from 'react-native';
import {Colors, base} from 'themes';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {useTranslation} from 'context/Language';
const DinhDanh = () => {
  //TODO : translation
  const translation = useTranslation();
  return (
    <View style={base.boxShadow}>
      <View style={styles.ico}>
        <Image
          style={[{width: 40, height: 40}]}
          source={require('images/profile/User.png')}
        />
      </View>
      <Text fs="h4" centered bold mb={10}>
        Định danh tài khoản
      </Text>
      <Text centered mb={20}>
        {translation?.kycDescription}
      </Text>
      <Button
        type="img"
        label="Định danh ngay"
        onPress={() => {
          Navigator.navigate(SCREEN.CHOOSE_IDENTITY_CARD);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  ico: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
export default DinhDanh;
