import React from 'react';
import {Text, Icon} from 'components';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

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
import Navigator from 'navigations/Navigator';

import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import {useCheckInfo} from 'context/Home/utils';

const Account = () => {
  const translation = useTranslation();
  const {userInfo} = useUser();
  const {onGetConnectedBank} = useUserInfo();
  const {onGetAllBank, onContinue} = useBankInfo();
  const {listConnectBank} = useWallet();
  const {showMoney, setShowMoney} = useMoney();
  const {onCheckKYCExpired} = useCheckInfo();

  const mapBank = () => {
    onCheckKYCExpired() &&
      onContinue(SCREEN.MAP_BANK_FLOW, {
        screen: MapBankRoutes.BankPickerScreen,
      });
  };
  const goToBankLinked = () => {
    onCheckKYCExpired() &&
      onContinue(SCREEN.MAP_BANK_FLOW, {
        screen: MapBankRoutes.BankLinked,
      });
  };
  return (
    <ImageBackground
      source={Images.Profile.BgStandard}
      resizeMode="stretch"
      style={[base.shadow, styles.flex1, styles.pxy1]}>
      {/* <View style={styles.wbg}>
          <Image style={styles.bg} source={require('images/profile/wave.png')} />
        </View> */}

      {/* delete when no use
        <View style={[base.row, styles.row]}>
          <Image style={[{width: 32, height: 32}]} source={Images.Profile.SoDu} />
          <Text ml={10} semibold>
            Số dư
          </Text>
          <Image
            style={[base.leftAuto, {width: 88, height: 32,tintColor: Colors.bs4}]}
            source={require('images/profile/epay.png')}
          />
        </View> */}

      <View style={[base.row, styles.mb1]}>
        <Image
          style={[
            base.rightAuto,
            {width: 88, height: 32, tintColor: Colors.bs4},
          ]}
          source={require('images/profile/epay.png')}
        />
        <Text ml={10} bold color={Colors.bs4} fs="h6">
          Standard
        </Text>
      </View>

      <View style={base.row}>
        {!showMoney ? (
          <Text style={[styles.number, {paddingTop: 10}]}>******</Text>
        ) : (
          <TouchableOpacity onPress={onGetConnectedBank} style={styles.item}>
            <Text style={styles.number} bold>
              {`${formatMoney(userInfo?.myWallet)} đ`}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={base.leftAuto}
          onPress={() => setShowMoney(!showMoney)}>
          <Icon
            icon={showMoney ? Images.Eye2 : Images.EyeGray2}
            size={20}
            tintColor={Colors.bs4}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.line} />

      <View style={[base.row, styles.justifyBetween, styles.mb2]}>
        <TouchableOpacity
          style={base.row}
          // onPress={goToBankLinked}
          onPress={mapBank}>
          <Text semibold mr={8} color={Colors.bs4}>
            {translation.bank_linking}{' '}
            <Text color={Colors.bs4} semibold>
              ({listConnectBank?.length})
            </Text>
          </Text>
          <Image
            style={styles.iconPlus}
            source={require('images/profile/plus.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Navigator.navigate(SCREEN.LINKED_BANK)}>
          <Text fs="sm" color={Colors.bs4}>
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </View>

      {listConnectBank?.length ? (
        <View style={[base.row, styles.fWrap]}>
          {listConnectBank.map(({BankName, BankLogoUrl}, index) => (
            <View
              key={index}
              style={[styles.boxCircle1, styles.mr1, styles.mb3]}>
              <Image
                style={{width: 25, aspectRatio: 1}}
                source={{uri: BankLogoUrl}}
                resizeMode="contain"
              />
            </View>
            // <Text semibold ml={10} color={Colors.bs4}>
            //   {BankName}
            // </Text>
          ))}
        </View>
      ) : (
        <TouchableOpacity style={[base.row]} onPress={mapBank}>
          <Image
            style={{width: 40, height: 40}}
            source={require('images/profile/plus2.png')}
          />
          <Text semibold ml={10} color={Colors.bs4}>
            {translation.link_your_bank}
          </Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  wrap: {paddingHorizontal: 15},
  //--------------
  fWrap: {flexWrap: 'wrap'},
  //--------------
  flex1: {flex: 1},
  justifyBetween: {justifyContent: 'space-between'},
  //--------------
  mr1: {marginRight: 16},
  //--------------
  mb1: {marginBottom: 32},
  mb2: {marginBottom: 10},
  mb3: {marginBottom: 5},
  //--------------
  pxy1: {padding: 16},
  //--------------
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
  // row: {
  //   marginBottom: 10,
  // },
  number: {
    height: 40,
    lineHeight: 40,
    color: Colors.brd2,
    fontSize: scale(30),
  },
  line: {
    height: 1,
    backgroundColor: Colors.bs4,
    marginTop: 10,
    marginBottom: 15,
    opacity: 0.5,
  },
  //--------------
  iconPlus: {width: 20, height: 20},
  //--------------
  boxCircle1: {
    width: 36,
    height: 36,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.g2,
  },
});
export default Account;
