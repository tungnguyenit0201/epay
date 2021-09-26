import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {HeaderBg, Header, Icon, Text, InputBlock, Row, Col} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';
import {debounce, isEmpty} from 'lodash';
import BankList from 'containers/Wallet/Bank/components/BankList';
import {BANK_TYPE} from 'context/Wallet/utils/bankInfo';
import {useBankInfo} from 'context/Wallet/utils';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import PopUpBankLink from './components/PopUpBankLink';
import {DISPLAY_POPUP} from 'containers/Modal/PopupModal';
import {useWallet} from 'context/Wallet';

const BankPickerScreen = props => {
  const {navigation} = props;
  const translation = useTranslation();
  const {onGetAllBank, onPressBankLink: onPressBankLinkUtils} = useBankInfo();
  const {walletInfo} = useWallet();
  const {listConnectBank} = walletInfo; //have
  const [keysearch, setKeySearch] = useState('');
  const bankLinkRef = useRef();
  const napasRef = useRef();
  const visaRef = useRef();

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
  const onContinueMap = item => {
    if (item) {
      navigation.push(SCREEN.MAP_BANK_FLOW, {
        screen: MapBankRoutes.BankLinkInfo,
        params: {item: item},
      });
    }
  };

  const renderSearchView = () => {
    return (
      <View style={[{marginTop: -20}]}>
        <View style={styles.icon}>
          <Image source={Images.TabBar.Search} style={styles.image} />
        </View>
        <InputBlock
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={translation.which_back_are_you_looking_for}
          style={styles.input_text}
          onChange={onChange}
        />
      </View>
    );
  };
  const renderContent = () => {
    if (isEmpty(listConnectBank)) {
      return (
        <View>
          <BankList
            ref={bankLinkRef}
            title={translation.bank_linking}
            key={'DomesticBank'}
            type={BANK_TYPE.LIST_DOMESTIC_BANK}
          />
        </View>
      );
    }
    return (
      <View>
        <BankList
          ref={bankLinkRef}
          title={translation.bank_linking}
          key={'DomesticBank'}
          type={BANK_TYPE.LIST_DOMESTIC_BANK}
        />
        <BankList
          ref={visaRef}
          title={'Ngân hàng thanh toán Quốc tế'}
          key={'InternationalBank'}
          type={BANK_TYPE.LIST_INTERNATIONAL_BANK}
        />
        <BankList
          ref={napasRef}
          title={'Ngân hàng nội địa '}
          key={'NapasBank'}
          type={BANK_TYPE.LIST_NAPAS_BANK}
        />
      </View>
    );
  };
  return (
    <View flex={1} backgroundColor={Colors.WHITETEXT}>
      <HeaderBg>
        <Header back title={translation.connect_bank} />
        {renderSearchView()}
      </HeaderBg>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};
export default BankPickerScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUNDCOLOR,
    paddingBottom: 40,
    marginTop: 16,
    // padding: 16,
  },
  image: {
    width: 20,
    height: 20,
  },
  icon: {
    position: 'absolute',
    top: 48,
    left: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.cl4,
    zIndex: 1,
  },
  input_text: {
    paddingLeft: 50,
    // borderRightWidth: 1,
    // borderStyle: 'solid',
    // borderColor: Colors.l4,
    borderWidth: 0,
    borderRadius: 8,
  },
  item: {alignItems: 'center'},
});
