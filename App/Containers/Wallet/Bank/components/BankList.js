import React, {
  useEffect,
  useState,
  memo,
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from 'themes';
import {Col, Row, Text} from 'components';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import MapBankFlow, {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import {scale} from 'utils/Functions';
import {useWallet} from 'context/Wallet';
import {useBankInfo} from 'context/Wallet/utils';
import {BANK_TYPE} from 'context/Wallet/utils/bankInfo';
import {useLoading} from 'context/Common/utils';
const BankItem = ({title, icon, item, callback}) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      callback?.(item);
    }}>
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: 100,
        backgroundColor: Colors.BORDER,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={icon}
        style={{
          width: scale(32),
          aspectRatio: 2,
        }}
        resizeMode={'contain'}
      />
    </View>
    <Text centered style={{marginTop: 10}}>
      {title}
    </Text>
  </TouchableOpacity>
);

const BankList = forwardRef((props, ref) => {
  const translation = useTranslation();
  const {title, type = '', bankInfo = '', callback} = props || {};
  const [bankData, setBankData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const allBank = useRef([]);
  const isSearch = useRef(false);
  const {
    onGetAllBank,
    onGetDomesticBanks,
    onGetInternationalBanks,
    onGetNapasBanks,
  } = useBankInfo();
  const {walletInfo} = useWallet();
  const {
    listConnectBank,
    listDomesticBank,
    listNapasBank,
    listInternationalBank,
  } = walletInfo; //have
  const {setLoading} = useLoading();
  useImperativeHandle(ref, () => ({search}));

  useEffect(() => {
    const BANK_MAP_KEY = {
      [BANK_TYPE.LIST_DOMESTIC_BANK]: {
        getData: onGetDomesticBanks,
        data: listDomesticBank,
      },
      [BANK_TYPE.LIST_NAPAS_BANK]: {
        getData: onGetNapasBanks,
        data: listNapasBank,
      },
      [BANK_TYPE.LIST_INTERNATIONAL_BANK]: {
        getData: onGetInternationalBanks,
        data: listInternationalBank,
      },
    };

    const checkData = async () => {
      if (
        !Array.isArray(BANK_MAP_KEY?.[type]?.data) ||
        BANK_MAP_KEY?.[type]?.data?.length === 0
      ) {
        setLoading(true);

        try {
          const data = await BANK_MAP_KEY?.[type]?.getData?.();
          if (data?.result) {
            allBank.current = data?.result;
            setBankData(data?.result);
          }

          setLoading(false);
          setLoaded(true);
        } catch (e) {
          console.log(e);
        }
      } else {
        allBank.current = BANK_MAP_KEY?.[type]?.data;
        setBankData(BANK_MAP_KEY?.[type]?.data);
        setLoaded(true);
      }
    };
    checkData();
  }, []);

  const search = _keysearch => {
    if (_keysearch && !isSearch.current) {
      isSearch.current = true;
      const filterdata = allBank.current?.filter?.(
        item => item.BankName?.toLowerCase()?.indexOf?.(_keysearch) !== -1,
      );
      setBankData(filterdata);
      isSearch.current = false;
    }
  };

  const renderBankBlock = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.WHITETEXT,
          shadowColor: 'rgba(0, 0, 0, 0.16)',
          shadowOpacity: 1,
          shadowOffset: {width: 0, height: 0},
          elevation: 1,
          marginHorizontal: 16,
          borderRadius: 16,
          padding: 16,
          marginVertical: 8,
        }}>
        <Text
          size={18}
          style={{
            fontWeight: 'bold',
            marginBottom: 16,
            fontSize: 18,
            marginTop: 8,
          }}>
          {title || translation.bank_linking}
        </Text>
        <Row>
          {bankData.map((item, index) => {
            return (
              <Col
                width={'33.333%'}
                space={10}
                key={index}
                style={{marginBottom: 16}}>
                <BankItem
                  callback={callback}
                  bankInfo={bankInfo}
                  title={item.BankName}
                  icon={{uri: item.BankLogoUrl}}
                  item={item}
                />
              </Col>
            );
          })}
        </Row>
      </View>
    );
  };
  if (!loaded) {
    return <ActivityIndicator color={Colors.BORDER} />;
  }
  if (!Array.isArray(bankData) || bankData.length === 0) {
    return <View />;
  }
  return renderBankBlock();
});

export default BankList;

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
  item: {alignItems: 'center', flex: 1},
});
