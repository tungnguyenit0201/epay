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
    <ImageBackground
      source={Images.Profile.BgStandard}
      resizeMode="stretch"
      style={[base.shadow, styles.flex1, styles.pxy1]}
    >
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
            style={[base.leftAuto, {width: 88, height: 32,tintColor: Colors.white}]}
            source={require('images/profile/epay.png')}
          />
        </View> */}

      <View style={[base.row, styles.mb1]}>
        <Image
          style={[
            base.rightAuto,
            {width: 88, height: 32, tintColor: Colors.white},
          ]}
          source={require('images/profile/epay.png')}
        />
        <Text ml={10} bold color={Colors.white} fs="h6">
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
          onPress={() => setShowMoney(!showMoney)}
        >
          <Icon
            icon={showMoney ? Images.Eye2 : Images.EyeGray2}
            size={20}
            tintColor={Colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.line} />

      <TouchableOpacity
        style={[base.row, {marginBottom: 10}]}
        onPress={goToBankLinked}
      >
        <Text semibold mr={5} color={Colors.white}>
          {translation.bank_linking}
          <Text color={Colors.white} semibold>
            ({listConnectBank?.length})
          </Text>
        </Text>
        <Image
          style={[styles.iconPlus, styles.topMinus1]}
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
            <Text semibold ml={10} color={Colors.white}>
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
          <Text semibold ml={10} color={Colors.white}>
            Liên kết ngân hàng ngay
          </Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  wrap: {paddingHorizontal: 15},
  //------------
  topMinus1: {top: -1},
  //------------
  flex1: {flex: 1},
  //------------
  mb1: {marginBottom: 32},
  //------------
  pxy1: {padding: 16},
  //------------
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
    color: Colors.cl2,
    fontSize: scale(30),
  },
  line: {
    height: 1,
    backgroundColor: Colors.white,
    marginTop: 10,
    marginBottom: 15,
    opacity: 0.5,
  },
  //------------
  iconPlus: {width: 20, height: 20},
});
export default Account;
