import React from 'react';
import {Text, Icon} from 'components';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {Colors, Fonts, Images, base} from 'themes';
import {scale, formatMoney} from 'utils/Functions';
import {useTranslation} from 'context/Language';

import MonneySimple from 'components/Home/MonneySimple';

import {useUserInfo} from 'context/User/utils';
import {useBankInfo} from 'context/Wallet/utils';
import {useUser} from 'context/User';
import {useWallet} from 'context/Wallet';
import {useMoney} from 'context/Wallet/utils';
import {SCREEN} from 'configs/Constants';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';

const Account = () => {
  const translation = useTranslation();
  const {userInfo} = useUser();
  const {onGetConnectedBank} = useUserInfo();
  const {onGetAllBank, onContinue} = useBankInfo();
  const {listConnectBank} = useWallet();
  const {showMoney, setShowMoney} = useMoney();

  const mapBank = () => {
    onContinue(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BankPickerScreen,
    });
  };
  const goToBankLinked = () => {
    onContinue(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BankLinked,
    });
  };
  // TODO: translate
  return (
    <View style={base.boxShadow}>
      <View style={styles.wbg}>
        <Image style={styles.bg} source={require('images/profile/wave.png')} />
      </View>

      <View style={[base.row, styles.row]}>
        <Image style={[{width: 32, height: 32}]} source={Images.Profile.SoDu} />
        <Text ml={10} semibold>
          Số dư
        </Text>
        <Image
          style={[base.leftAuto, {width: 88, height: 32}]}
          source={require('images/profile/epay.png')}
        />
      </View>

      <View style={base.row}>
        {!showMoney ? (
          <Text style={[styles.number, {paddingTop: 5}]}>******</Text>
        ) : (
          <TouchableOpacity onPress={onGetConnectedBank} style={styles.item}>
            <Text style={styles.number} bold>
              {formatMoney(userInfo?.myWallet, true)}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={base.leftAuto}
          onPress={() => setShowMoney(!showMoney)}>
          <Icon icon={showMoney ? Images.Eye : Images.EyeGray} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.line} />

      <TouchableOpacity
        style={[base.row, {marginBottom: 10}]}
        onPress={goToBankLinked}>
        <Text semibold mr={5}>
          {translation.bank_linking}
          <Text>({listConnectBank?.length})</Text>
        </Text>
        <Image
          style={{width: 20, height: 20}}
          source={require('images/profile/plus.png')}
        />
      </TouchableOpacity>

      {listConnectBank?.length ? (
        listConnectBank.map(({BankName, BankLogoUrl}) => (
          <View style={base.row}>
            <Image
              style={{width: 40, height: 40}}
              source={{uri: BankLogoUrl}}
              resizeMode="contain"
            />
            <Text semibold ml={10}>
              {BankName}
            </Text>
          </View>
        ))
      ) : (
        <TouchableOpacity style={[base.row]} onPress={mapBank}>
          <Image
            style={{width: 40, height: 40}}
            source={require('images/profile/plus2.png')}
          />
          <Text semibold ml={10}>
            Liên kết ngân hàng ngay
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  wbg: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
  bg: {
    width: scale(233),
    height: scale(233),
    position: 'absolute',
    right: 0,
    top: 32,
  },
  row: {
    marginBottom: 10,
  },
  number: {
    height: 40,
    lineHeight: 40,
    color: Colors.cl1,
    fontSize: scale(30),
  },
  line: {
    height: 1,
    backgroundColor: Colors.l2,
    marginTop: 5,
    marginBottom: 15,
  },
});
export default Account;
