import React, {useState, useRef, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {HeaderBg, Header, InputBlock, TextInput} from 'components';
import {Colors, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';
import {debounce, isEmpty} from 'lodash';
import BankList from 'containers/Wallet/Bank/components/BankList';
import {BANK_TYPE} from 'context/Wallet/utils/bankInfo';
import {useBankInfo} from 'context/Wallet/utils';
import {useWallet} from 'context/Wallet';

const BankPickerScreen = props => {
  const translation = useTranslation();
  const {walletInfo} = useWallet();
  const {listConnectBank} = walletInfo; //have
  const [keysearch, setKeySearch] = useState('');
  const bankLinkRef = useRef();
  const napasRef = useRef();
  const visaRef = useRef();

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
          navigation={props?.navigation}
        />
        <BankList
          ref={visaRef}
          title={'Ngân hàng thanh toán Quốc tế'}
          key={'InternationalBank'}
          type={BANK_TYPE.LIST_INTERNATIONAL_BANK}
          navigation={props?.navigation}
        />
        <BankList
          ref={napasRef}
          title={'Ngân hàng nội địa '}
          key={'NapasBank'}
          type={BANK_TYPE.LIST_NAPAS_BANK}
          navigation={props?.navigation}
        />
      </View>
    );
  };
  return (
    <View flex={1} backgroundColor={Colors.WHITETEXT}>
      <HeaderBg>
        <Header
          back
          title="Chọn ngân hàng" //TODO: Translate
        />
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
