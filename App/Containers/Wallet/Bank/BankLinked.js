import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import {Button, Header, InputBlock} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {Colors, Fonts, Spacing, Images, base} from 'themes';
import {useTranslation} from 'context/Language';
import HeaderBg from 'components/Common/HeaderBg';
import {useWallet} from 'context/Wallet';
const BankLinked = () => {
  const translation = useTranslation();
  const {walletInfo} = useWallet();
  const {listConnectBank, listDomesticBank, listInternationalBank} = walletInfo;
  const renderListBank = banks => {
    if (banks && banks.length !== 0) {
      return banks.map((value, index) => (
        <Pressable
          onPress={() => Navigator.navigate(SCREEN.BANK_DETAIL, value)}
          key={index}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.g6,
          }}>
          <Text bold style={{fontSize: Fonts.H6}}>
            {value?.BankName}
          </Text>
          <Text style={{marginTop: 10}}>{value?.BinNumbers}</Text>
        </Pressable>
      ));
    } else {
      return <Text>Chưa có</Text>;
    }
  };
  return (
    <>
      <ScrollView style={[styles.container]}>
        <HeaderBg>
          <Header back title={translation.connect_bank} />
        </HeaderBg>

        <View style={styles.wrap}>
          <View>
            <Text bold style={{textTransform: 'uppercase', marginBottom: 16}}>
              Ngân hàng liên kết
            </Text>
            {renderListBank(listConnectBank)}
          </View>
          <View>
            <Text bold style={{textTransform: 'uppercase', marginBottom: 16}}>
              Ngân hàng nội địa
            </Text>
            {renderListBank(listDomesticBank)}
          </View>
          <View>
            <Text bold style={{textTransform: 'uppercase', marginBottom: 16}}>
              Thẻ thanh toán quốc tế
            </Text>
            {renderListBank(listInternationalBank)}
          </View>
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button
          label={translation.connect_bank}
          onPress={() => Navigator.navigate(SCREEN.BANK_LIST)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
});

export default BankLinked;
