import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';

import {
  HeaderBg,
  Header,
  Text,
  FooterContainer,
  Button,
  Switch,
} from 'components';

import {SCREEN} from 'configs/Constants';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'context/Language';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale} from 'utils/Functions';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import {useUser} from 'context/User';
import {useBankInfo} from 'context/Wallet/utils';
import {censorCardNumber} from 'context/Wallet/utils/bankInfo';
import {bankCardRegex} from 'utils/ValidationSchemas';
import {useWallet} from 'context/Wallet';

const DEFAULT_BANK = {
  BankId: 1,
  BankCode: 'VCB',
  BankName: 'Vietcombank',
  ConnectTime: '21-02-2020 16:20:57',
  BankLogoUrl:
    'https://gateway.epayservices.com.vn/epay-images/bank/icon-Vietcombank.png',
};

export default function (props) {
  const translation = useTranslation();
  const {params} = useRoute() || {};
  const {userInfo} = useUser();
  const {onChange, onContinue, getICLabel} = useBankInfo(params);
  const {walletInfo, limit, icInfo} = useWallet();
  const {listNapasBank, icInfo: ICBankInfor} = walletInfo; //have
  const {item, optionKyc} = params || {};
  const [bankAccount, setBankAccount] = useState('');
  const {bank, kycInfo} = item || {};
  const {personalIC} = userInfo || {};
  const errorMessage = 'Vui lòng nhập thông tin số thẻ/tài khoản';
  const [err, setShowErr] = useState('');
  const [selectedIc, setSelectedIc] = useState({ICInfo: optionKyc?.data});

  useEffect(() => {
    return Keyboard?.dismiss?.();
  }, []);
  // const renderBankInfo = () => {
  //   return (
  //     <View style={[styles.shadow, styles.row]}>
  //       <Image
  //         source={{uri: bank?.BankLogoUrl || DEFAULT_BANK.BankLogoUrl}}
  //         style={styles.bankIcon}
  //         resizeMode={'contain'}
  //       />
  //       <Text bold={true} size={Fonts.H6}>
  //         {bank?.BankName || DEFAULT_BANK.BankName}
  //       </Text>
  //     </View>
  //   );
  // };

  const onChangeBankNumber = text => {
    let trimText = text?.trim();
    const regexValid = new RegExp(bankCardRegex).test(trimText);
    if (regexValid) {
      console.log(regexValid);
      setBankAccount(trimText);
    }
  };

  const validateInfo = () => {
    if (!bankAccount) {
      setShowErr(errorMessage);
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    const isValid = validateInfo?.();
    onChange('BankAccount', bankAccount);
    if (isValid) {
      if (selectedIc?.ICInfo) {
        props?.navigation?.push?.(SCREEN.MAP_BANK_FLOW, {
          screen: MapBankRoutes.BankLinkKYCInfo,
          params: {
            ...params,
            optionKyc: selectedIc?.ICInfo,
          },
        });
      } else {
        props?.navigation?.navigate?.(SCREEN.CHOOSE_IDENTITY_CARD);
      }
    }
  };
  const onFocus = () => {
    if (err) {
      setShowErr('');
    }
  };

  // const renderBankInput = () => (
  //   <InputBlock
  //     placeholder={'Nhập số tài khoản/Số thẻ'}
  //     value={bankAccount}
  //     onChangeText={onChangeBankNumber}
  //     // keyboardType={'numeric'}
  //     error={err}
  //     showErrorLabel={true}
  //     onBlur={validateInfo}
  //     onFocus={onFocus}
  //     onSubmitEditing={validateInfo}
  //   />
  // );

  // const renderKYCCard = ({
  //   title,
  //   number,
  //   isSelected,
  //   callback,
  //   keyExtractor,
  //   icLabel,
  // }) => {
  //   const idText = icLabel,
  //     nameText = 'Họ và tên ';
  //   return (
  //     <TouchableOpacity
  //       key={keyExtractor}
  //       disabled={typeof callback !== 'function'}
  //       onPress={() => callback?.()}
  //       style={[
  //         styles.shadow,
  //         {backgroundColor: isSelected ? Colors.bg1 : Colors.bs4},
  //       ]}
  //     >
  //       <View style={{flexDirection: 'row'}}>
  //         <View flex={1}>
  //           <Text style={styles.subTitle}>{nameText}</Text>
  //           <Text style={styles.title}>{title}</Text>
  //         </View>
  //         {isSelected ? (
  //           <Image
  //             resizeMode="cover"
  //             source={Images.Check}
  //             style={{
  //               width: 20,
  //               height: 20,
  //               borderRadius: 16,
  //             }}
  //           />
  //         ) : (
  //           <View
  //             style={{
  //               width: 20,
  //               height: 20,
  //               borderRadius: 16,
  //               backgroundColor: Colors.bs4,
  //               borderWidth: 1,
  //               borderColor: Colors.tp3,
  //             }}
  //           />
  //         )}
  //       </View>

  //       <View height={16} />
  //       <Text style={styles.subTitle}>{idText}</Text>
  //       <Text style={styles.title}>{censorCardNumber(number, '*', 3, 2)}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  // const renderListKYCOptions = ICBankInfor => {
  //   if (!Array.isArray(ICBankInfor) && typeof ICBankInfor === 'object') {
  //     const info = {
  //       title: optionKyc?.data?.Name || personalIC.ICFullName,
  //       number: optionKyc?.data?.Number,
  //       // type:
  //       isSelected: true,
  //     };

  //     return renderKYCCard(info);
  //   } else {
  //     return ICBankInfor?.map?.((item, index) => {
  //       const {ICInfo} = item;

  //       const info = {
  //         title: ICInfo?.Name,
  //         number: ICInfo?.Number,
  //         isSelected: selectedIc?.ICInfo?.Number === ICInfo?.Number,
  //         icLabel: getICLabel(ICInfo.Type),
  //         callback: () => setSelectedIc(item),
  //         keyExtractor: 'ic' + index,
  //       };
  //       return renderKYCCard(info);
  //     });
  //   }
  // };
  // const renderPolicy = () => {
  //   const policy =
  //     '\u2022 Đã đăng ký dịch vụ SMS Banking tại ngân hàng\n\u2022 Số điện thoại ${sdt} đã đăng ký tại VCB\n\u2022 Số GTTT trùng khớp với thông tin đăng ký tại ngân hàng';

  //   return (
  //     <View>
  //       <Text style={styles.title} bold={true}>
  //         Điều kiện liên kết
  //       </Text>
  //       <Text>{policy?.replace('${sdt}', '0967828333')}</Text>
  //     </View>
  //   );
  // };
  // const onAddIc = () => {
  //   props?.navigation?.push(SCREEN.VERIFY_USER_INFO, {
  //     params: {isMapBank: true},
  //   });
  // };

  const renderButton = () => {
    return (
      <FooterContainer>
        <Button
          // label={translation.continue}
          label="Hủy liên kết"
          // size="lg"
          style={styles.button}
          onPress={onSubmit}
        />
      </FooterContainer>
    );
  };

  return (
    <View flex={1} style={base.bgWhite}>
      <HeaderBg>
        <Header back title={translation.connect_bank} />
      </HeaderBg>

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* {renderBankInfo()}
        {renderBankInput()}
        {renderListKYCOptions(icInfo)}
        <Text style={{fontSize: Fonts.SM}}>
          Thông tin GTTT phải trùng khớp với thông tin đăng ký tại ngân hàng
        </Text>
        {renderAddIc()}
        {renderPolicy()} */}

        <ImageBackground
          source={Images.ConnectBank.BgBlue}
          resizeMode="stretch"
          style={styles.boxBlue1}
        >
          <View style={[base.row, styles.mb1]}>
            <View style={styles.boxImg1}>
              <Image
                source={Images.ConnectBank.logoAgribank} //test img
                style={{
                  width: scale(20),
                  height: scale(20),
                }}
                resizeMode="contain"
              />
            </View>
            <View style={[styles.flex1, styles.pl1]}>
              <Text fs="md" color={Colors.bs4} mb={4}>
                Vietcombank
              </Text>
              <Text fs="md" color={Colors.bs4}>
                NGUYEN VAN A
              </Text>
            </View>
          </View>
          <Text size={Fonts.LG} color={Colors.bs4}>
            9704 36*******036
          </Text>
        </ImageBackground>

        <View style={[styles.px1, styles.mb2]}>
          <View style={[base.shadow, base.bgWhite, styles.boxInfo1]}>
            <View style={styles.flexRow}>
              <View style={styles.wPercent1}>
                <Text fs="h6" mr={10}>
                  CMND
                </Text>
              </View>

              <View style={styles.wPercent2}>
                <Text fs="md" color={Colors.tp3} right>
                  12*****456
                </Text>
              </View>
            </View>

            <View style={styles.flexRow}>
              <View style={styles.wPercent1}>
                <Text fs="h6" mr={10}>
                  Địa chỉ
                </Text>
              </View>

              <View style={styles.wPercent2}>
                <Text fs="md" color={Colors.tp3} right>
                  145 D1, P.Tân Hưng,Quận 7, TP.Hồ Chí Minh
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.flexRow, styles.mb3]}>
          <View style={styles.widthHaft}>
            <Text fs="h6" mr={10}>
              Thời gian liên kết
            </Text>
          </View>

          <View style={styles.widthHaft}>
            <Text fs="h6" color={Colors.tp3} right>
              28/05/2021 12:09:09
            </Text>
          </View>
        </View>

        <View style={[styles.flexRow, styles.mb2]}>
          <View style={styles.widthHaft}>
            <Text fs="h6" mr={10}>
              Trạng thái
            </Text>
          </View>

          <View style={styles.widthHaft}>
            <Text fs="h6" color={Colors.tp3} right>
              Đang liên kết
            </Text>
          </View>
        </View>

        <View style={[styles.flexRow, styles.alignCenter, styles.mb3]}>
          <View style={styles.flex1}>
            <Text size={Fonts.LG} bold>
              Thanh toán mặc định
            </Text>
          </View>
          <Switch onColor={Colors.brd2} />
        </View>

        <Text fs="h6" style={styles.maxWidth1} mb={40}>
          Tại 1 thời điểm chỉ duy nhất 1 ngân hàng được chọn thanh toán mặc định
        </Text>

        <View style={[base.shadow, base.bgWhite, styles.boxInfo2]}>
          <Text fs="h6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </View>
      </ScrollView>
      {renderButton()}

      {/* notify success
      <FooterContainer style={[styles.boxNotify1,styles.pos1,{
        transform: [{translateY: '0'}],
      }]}>
        <View style={styles.flexRow}>
          <Image
            source={Images.TransactionHistory.Success}
            style={styles.iconAdd}
            resizeMode={'contain'}
          />
          <Text ml={16} fs="h6" style={styles.flex1} color={Colors.tp1}>
            Cài đặt mặc định thành công</Text>
        </View>
      </FooterContainer> */}
    </View>
  );
}
const styles = StyleSheet.create({
  flex1: {flex: 1},
  //-------------
  flexRow: {flexDirection: 'row'},
  alignCenter: {alignItems: 'center'},
  //---------------
  widthHaft: {width: '50%'},
  //---------------
  wPercent1: {width: '40%'},
  wPercent2: {width: '60%'},
  //---------------
  maxWidth1: {maxWidth: 350},
  //---------------
  mb1: {marginBottom: 48},
  mb2: {marginBottom: 24},
  mb3: {marginBottom: 16},
  //---------------
  px1: {paddingHorizontal: Spacing.PADDING},
  //---------------
  pl1: {paddingLeft: 10},
  //---------------
  container: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: 24,
    paddingBottom: 40,
  },
  //---------------
  iconAdd: {width: 22, aspectRatio: 1},
  //---------------
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  //---------------
  pos1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  //---------------
  boxNotify1: {
    width: '100%',
    paddingBottom: Spacing.PADDING * 3,
    backgroundColor: Colors.bg1,
  },
  //---------------
  boxImg1: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: Colors.bs2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //---------------
  boxBlue1: {
    padding: 16,
    minHeight: 153,
    flex: 1,
  },
  //---------------
  boxInfo1: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  //---------------
  boxInfo2: {
    padding: 16,
    borderRadius: 8,
  },

  //css of functions was hidden,if no use, please delete it!
  // bankIc: {
  //   borderRadius: 8,
  //   borderColor: Colors.bs2,
  //   borderWidth: 1,
  //   paddingHorizontal: 18,
  //   paddingVertical: 8,
  //   marginVertical: 16,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // row: {flexDirection: 'row', alignItems: 'center'},
  // bankIcon: {
  //   height: scale(32),
  //   aspectRatio: 2,
  //   marginRight: 12,
  // },
  // shadowButton: {
  //   paddingHorizontal: 12,
  //   paddingVertical: 16,
  //   backgroundColor: Colors.bs4,
  //   shadowColor: 'rgba(0, 0, 0, 0.16)',
  //   shadowOpacity: 1,
  //   shadowOffset: {width: 1, height: 0},
  //   borderRadius: 8,
  //   paddingBottom: 24,
  //   borderTopLeftRadius: 16,
  //   borderTopRightRadius: 16,
  // },
  // shadow: {
  //   paddingHorizontal: 12,
  //   paddingVertical: 16,
  //   backgroundColor: Colors.bg1,
  //   shadowColor: 'rgba(0, 0, 0, 0.16)',
  //   shadowOpacity: 1,
  //   shadowOffset: {width: 0, height: 0},
  //   borderRadius: 8,
  //   marginVertical: 16,
  // },
  // subTitle: {color: '#666666', fontSize: Fonts.MD},
  // title: {fontSize: Fonts.H6, marginTop: 8},
});
