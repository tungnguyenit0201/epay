import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {HeaderBg, Header, TextInput, Text} from 'components';
import {Colors, Spacing, Images, Fonts, base} from 'themes';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';
import {debounce, isEmpty} from 'lodash';
import BankList from 'containers/Wallet/Bank/components/BankList';
import {BANK_TYPE} from 'context/Wallet/utils/bankInfo';
import {useBankInfo} from 'context/Wallet/utils';
import {useWallet} from 'context/Wallet';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';

const LinkedBank = props => {
  const translation = useTranslation();
  const {walletInfo} = useWallet();
  const {listConnectBank} = walletInfo; //have
  const [keysearch, setKeySearch] = useState('');
  const bankLinkRef = useRef();
  const napasRef = useRef();
  const visaRef = useRef();
  const {onGetAllBank, onContinue} = useBankInfo();

  useEffect(() => {
    return () => setKeySearch('');
  }, []);

  const onBlur = () => {
    onSearchDebounce(keysearch);
  };

  const onFocus = () => {};
  const onSearchDebounce = debounce(text => {
    const key = text?.trim()?.toLowerCase();
    visaRef.current?.search?.(key);
    bankLinkRef.current?.search?.(key);
    napasRef.current?.search?.(key);
  }, 0);

  const onChange = text => {
    setKeySearch(text);
    if (text === '') {
      visaRef.current?.search?.('');
      bankLinkRef.current?.search?.('');
      napasRef.current?.search?.('');
    } else {
      onSearchDebounce(text);
    }
  };

  const mapBank = () => {
    onContinue(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BankPickerScreen,
    });
  };

  const renderSearchView = () => {
    return (
      <View style={[{marginTop: 10}]}>
        {/* <View style={styles.icon}>
          <Image source={Images.TabBar.Search} style={styles.image} />
        </View>
        <InputBlock
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={translation.which_back_are_you_looking_for}
          style={styles.input_text}
          onChange={onChange}
        /> */}
        <TextInput
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={translation.which_back_are_you_looking_for}
          style={styles.input_text}
          onChange={onChange}
          leftIcon={Images.TabBar.Search}
        />
      </View>
    );
  };
  const renderContent = () => {
    if (isEmpty(listConnectBank)) {
      return (
        <View>
          <BankList
            navigation={props?.navigation}
            ref={bankLinkRef}
            title={translation.bank_linking}
            key={'DomesticBank'}
            type={BANK_TYPE.LIST_DOMESTIC_BANK}
            style={styles.mb1}
          />
        </View>
      );
    }
    return (
      <>
        <BankList
          ref={bankLinkRef}
          title={translation.bank_linking}
          key={'DomesticBank'}
          type={BANK_TYPE.LIST_DOMESTIC_BANK}
          navigation={props?.navigation}
          style={styles.mb1}
        />
        <BankList
          ref={visaRef}
          title={'Ngân hàng thanh toán Quốc tế'}
          key={'InternationalBank'}
          type={BANK_TYPE.LIST_INTERNATIONAL_BANK}
          navigation={props?.navigation}
          style={styles.mb1}
        />
        <BankList
          ref={napasRef}
          title={'Ngân hàng nội địa '}
          key={'NapasBank'}
          type={BANK_TYPE.LIST_NAPAS_BANK}
          navigation={props?.navigation}
          style={styles.mb1}
        />
      </>
    );
  };
  return (
    <View flex={1} backgroundColor={Colors.bs4}>
      <HeaderBg>
        <Header back title={translation.bank_linking} />
        {renderSearchView()}
      </HeaderBg>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
};
export default LinkedBank;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  //---------------
  mb1: {marginBottom: 16},
  mb2: {marginBottom: 32},
  //---------------
  px1: {paddingHorizontal: Spacing.PADDING},
  //---------------
  container: {
    backgroundColor: Colors.bs4,
    paddingBottom: 40,
    marginTop: Spacing.PADDING,
  },
  image: {
    width: 20,
    height: 20,
  },
  icon: {
    position: 'absolute',
    top: 52,
    left: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.bs1,
    zIndex: 1,
  },
  input_text: {
    paddingLeft: 50,
    borderWidth: 0,
    borderRadius: 8,
  },
  item: {alignItems: 'center'},
  //----------------
  lineGray1: {
    height: 12,
    backgroundColor: Colors.bs2,
  },
  //----------------
  iconPlus: {
    width: scale(24),
    height: scale(24),
  },
  //----------------
  btnAddBank: {
    marginBottom: Spacing.PADDING,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.bs1,
    borderRadius: 8,
  },
});

// import React, {
//   forwardRef,
//   useEffect,
//   useImperativeHandle,
//   useRef,
//   useState,
// } from 'react';
// import {
//   ActivityIndicator,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {Colors, Fonts, Images, Spacing} from 'themes';
// import {Col, Radio, Row, Text} from 'components';
// import {useTranslation} from 'context/Language';
// import Navigator from 'navigations/Navigator';
// import {SCREEN} from 'configs/Constants';
// import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
// import {scale} from 'utils/Functions';
// import {useWallet} from 'context/Wallet';
// import {useBankInfo} from 'context/Wallet/utils';
// import {BANK_TYPE, censorCardNumber} from 'context/Wallet/utils/bankInfo';
// import {useLoading} from 'context/Common/utils';
// import RadioICInfo from 'containers/Wallet/Bank/components/RadioICInfo';

// const BankItem = ({title, icon, item, callback}) => (
//   <TouchableOpacity
//     style={[styles.item, styles.blockShadowGray]}
//     onPress={() => {
//       callback?.(item);
//     }}
//   >
//     {/* <View
//       style={{
//         width: 48,
//         height: 48,
//         marginRight: 10,
//         borderRadius: 100,
//         backgroundColor: Colors.bs2,
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <Image
//         source={icon}
//         style={{
//           width: scale(32),
//           aspectRatio: 2,
//         }}
//         resizeMode={'contain'}
//       />
//     </View> */}
//     <Image
//       source={icon}
//       style={{
//         width: scale(52),
//         marginRight: 10,
//         aspectRatio: 2,
//       }}
//       resizeMode={'contain'}
//     />
//     <View styles={styles.flex1}>
//       <Text fs="h6" bold size={Fonts.SM}>
//         {title}
//       </Text>
//       <Text color={Colors.tp3}>**********1234</Text>
//     </View>
//   </TouchableOpacity>
// );

// const BankList = forwardRef((props, ref) => {
//   const translation = useTranslation();
//   const {title, type = '', bankInfo = '', callback, style} = props || {};
//   const [bankData, setBankData] = useState([]);
//   const [loaded, setLoaded] = useState(false);
//   const allBank = useRef([]);
//   const isSearch = useRef(false);
//   const radioButtonRef = useRef(null);
//   const timeoutRef = useRef(null);
//   const {
//     onGetDomesticBanks,
//     onGetInternationalBanks,
//     onGetNapasBanks,
//     onGetConnectedBank,
//     onChange,
//     onContinue,
//     onGetIcInfor,
//     getICLabel,
//   } = useBankInfo();
//   const {walletInfo} = useWallet();
//   const {
//     listConnectBank,
//     listDomesticBank,
//     listNapasBank,
//     listInternationalBank,
//   } = walletInfo; //have
//   const {setLoading} = useLoading();
//   useImperativeHandle(ref, () => ({search}));
//   const BANK_MAP_KEY = {
//     [BANK_TYPE.LIST_DOMESTIC_BANK]: {
//       getData: onGetDomesticBanks,
//       data: listDomesticBank,
//     },
//     [BANK_TYPE.LIST_NAPAS_BANK]: {
//       getData: onGetNapasBanks,
//       data: listNapasBank,
//     },
//     [BANK_TYPE.LIST_INTERNATIONAL_BANK]: {
//       getData: onGetInternationalBanks,
//       data: listInternationalBank,
//     },
//     [BANK_TYPE.LIST_BANK_CONNECT]: {
//       getData: onGetConnectedBank,
//       data: listConnectBank,
//     },
//   };
//   useEffect(() => {
//     const checkData = async () => {
//       if (
//         !Array.isArray(BANK_MAP_KEY?.[type]?.data) ||
//         BANK_MAP_KEY?.[type]?.data?.length === 0
//       ) {
//         setLoading(true);

//         try {
//           const data = await BANK_MAP_KEY?.[type]?.getData?.();
//           if (data?.result) {
//             allBank.current = data?.result;
//             setBankData(data?.result);
//           }

//           setLoading(false);
//           setLoaded(true);
//         } catch (e) {
//           console.log(e);
//         }
//       } else {
//         allBank.current = BANK_MAP_KEY?.[type]?.data;
//         setBankData(BANK_MAP_KEY?.[type]?.data);
//         setLoaded(true);
//       }
//     };
//     checkData();
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   const search = _keysearch => {
//     if (_keysearch === '') {
//       setBankData(allBank.current);
//       isSearch.current = false;
//     } else if (_keysearch && !isSearch.current) {
//       isSearch.current = true;
//       const filterdata = allBank.current?.filter?.(
//         item => item.BankName?.toLowerCase()?.indexOf?.(_keysearch) !== -1,
//       );
//       setBankData(filterdata);
//       isSearch.current = false;
//     }
//   };

//   const onPressBankNapas = item => {
//     if (item) {
//       onContinue(SCREEN.MAP_BANK_FLOW, {
//         screen: MapBankRoutes.BankCardInfo,
//         params: {item: item, type: BANK_TYPE.LIST_NAPAS_BANK},
//       });
//     }
//   };

//   const onPressInternationalBank = item => {
//     if (item) {
//       onContinue(SCREEN.MAP_BANK_FLOW, {
//         screen: MapBankRoutes.BankCardInfo,
//         params: {item: item, type: BANK_TYPE.LIST_INTERNATIONAL_BANK},
//       });
//     }
//   };

//   const onPressPrimary = item => {
//     const optionKyc = radioButtonRef.current?.getItem?.() || {};
//     Navigator.push(SCREEN.MAP_BANK_FLOW, {
//       screen: MapBankRoutes.BankLinkInfo,
//       params: {item: item, optionKyc},
//     });
//   };

//   const onPressSecondary = () => {
//     // timeoutRef.current =  setTimeout(() => {
//     Navigator.navigate?.(SCREEN.CHOOSE_IDENTITY_CARD, {
//       KYCFlow: 'bank',
//     });
//     // }, 200);
//   };
//   const onPressBankLink = async item => {
//     try {
//       const icInfor = await onGetIcInfor(item?.BankId);
//       if (Array.isArray(icInfor?.result) && icInfor?.result.length > 0) {
//         let formatIcInfo = [];

//         icInfor?.result?.forEach((item, index) => {
//           const {ICInfo} = item || {};
//           const {Number, Type} = ICInfo || {};
//           const IDNumber = censorCardNumber(Number);
//           const label = getICLabel(Type) + IDNumber;
//           const kycInfo = {label: label, value: index + 1, data: ICInfo};
//           formatIcInfo.push(kycInfo);
//         });

//         Navigator.showAlert({
//           icon: Images.ConnectBank.BankLink,
//           renderBody: () => (
//             <RadioICInfo
//               ref={radioButtonRef}
//               kycInfo={formatIcInfo}
//               selectedItem={formatIcInfo?.[0]}
//             />
//           ),
//           secondaryButton: {
//             title: 'Dùng giấy tờ tùy thân khác',
//             onPress: () => {
//               onPressSecondary();
//             },
//           },
//           positiveButton: {
//             title: translation.continue,
//             onPress: () => onPressPrimary(item),
//           },
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const onPressBankConnect = () => {};

//   const onPress = item => {
//     switch (type) {
//       case BANK_TYPE.LIST_BANK_CONNECT:
//         onPressBankConnect(item);
//         break;
//       case BANK_TYPE.LIST_INTERNATIONAL_BANK:
//         onPressInternationalBank(item);
//         break;
//       case BANK_TYPE.LIST_NAPAS_BANK:
//         onPressBankNapas(item);
//         break;
//       case BANK_TYPE.LIST_DOMESTIC_BANK:
//         onPressBankLink(item);
//         break;
//       default:
//         return;
//     }
//   };
//   const renderBankBlock = () => {
//     return (
//       <View style={[styles.px1, style]}>
//         <Text size={Fonts.LG} bold mb={16}>
//           {title || translation.bank_linking}
//         </Text>
//         <Row>
//           {bankData.map((item, index) => {
//             return (
//               <Col width={'100%'} key={index} style={{marginBottom: 16}}>
//                 <BankItem
//                   callback={onPress}
//                   bankInfo={bankInfo}
//                   title={item.BankName}
//                   icon={{uri: item.BankLogoUrl}}
//                   item={item}
//                 />
//               </Col>
//             );
//           })}
//         </Row>
//       </View>
//     );
//   };
//   if (!loaded) {
//     return <ActivityIndicator color={Colors.bs2} />;
//   }
//   if (!Array.isArray(bankData) || bankData.length === 0) {
//     return <View />;
//   }
//   return renderBankBlock();
// });

// export default BankList;

// const styles = StyleSheet.create({
//   flex1: {flex: 1},
//   //-----------------
//   px1: {paddingHorizontal: Spacing.PADDING},
//   //-----------------
//   container: {
//     backgroundColor: Colors.bs4,
//     paddingBottom: 40,
//     marginTop: 16,
//     // padding: 16,
//   },
//   image: {
//     width: 20,
//     height: 20,
//   },
//   icon: {
//     position: 'absolute',
//     top: 48,
//     left: 10,
//     paddingRight: 10,
//     borderRightWidth: 1,
//     borderStyle: 'solid',
//     borderColor: Colors.bs1,
//     zIndex: 1,
//   },
//   input_text: {
//     paddingLeft: 50,
//     // borderRightWidth: 1,
//     // borderStyle: 'solid',
//     // borderColor: Colors.bs1,
//     borderWidth: 0,
//     borderRadius: 8,
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   radio: {
//     marginRight: 0,
//     marginTop: 4,
//     justifyContent: 'center',
//     alignSelf: 'flex-start',
//     flexDirection: 'column',
//   },
//   //---------------
//   blockShadowGray: {
//     backgroundColor: Colors.bs4,
//     // shadowColor: 'rgba(0, 0, 0, 0.16)',
//     shadowOpacity: 0.2,
//     shadowOffset: {width: 0, height: 0},
//     elevation: 24,
//     shadowRadius: 8,
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//   },
// });
