import React from 'react';
import {Text, Button} from 'components';
import {View, Image, StyleSheet} from 'react-native';
import {Colors, base} from 'themes';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {useTranslation} from 'context/Language';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
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
      <Text fs="h6" centered bold mb={8}>
        {translation.verify_your_account}
      </Text>
      <Text
        centered
        mb={20}
        fs="md"
        style={[styles.maxWidth1, styles.marginCenter]}
      >
        {
          translation.verified_account_will_have_a_higher_level_of_security_and_greater_limits_for_transactions
        }
      </Text>
      <Button
        type="img"
        label={translation.verify_now}
        onPress={() => {
          Navigator.navigate(SCREEN.CHOOSE_IDENTITY_CARD);
        }}
        size="sm"
        style={[styles.maxWidth2, styles.marginCenter]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  marginCenter: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  //----------------
  ico: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  maxWidth1: {
    maxWidth: 311,
  },
  maxWidth2: {
    maxWidth: 240,
  },
});
export default DinhDanh;
